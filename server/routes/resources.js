const express = require('express');
const M = require('../models');
const crud = require('../controllers/crud');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const staff = [protect, role('admin', 'staff')];

const bookingCrud = crud(M.Booking, { searchFields: ['customerName', 'phone', 'reference'], populate: 'tour vehicle' });
const createBooking = async (req, res, next) => {
  try {
    const body = { ...req.body };
    ['status', 'paymentStatus', 'totalAmount', 'reference', 'isRead', '_id'].forEach((k) => delete body[k]);
    if (req.user) body.user = req.user._id; else delete body.user;
    if (body.tour) { const t = await M.Tour.findById(body.tour); if (t) body.totalAmount = (t.discountPrice || t.price) * (body.numberOfTravelers || 1); }
    const n = (await M.Booking.countDocuments()) + 1;
    body.reference = `TTT-${new Date().getFullYear()}-${String(n).padStart(5, '0')}`;
    res.status(201).json(await M.Booking.create(body));
  } catch (e) { next(e); }
};
const mine = async (req, res, next) => {
  try { res.json(await M.Booking.find({ user: req.user._id }).populate('tour vehicle').sort('-createdAt')); } catch (e) { next(e); }
};
const build = ({ model, publicRead, publicCreate, ...opts }) => {
  const c = crud(model, opts), r = express.Router();
  r.get('/', ...(publicRead ? [optionalAuth] : staff), c.list);
  r.get('/:key', ...(publicRead ? [optionalAuth] : staff), c.get);
  r.post('/', ...(publicCreate ? [optionalAuth] : staff), c.create);
  r.put('/:id', ...staff, c.update);
  r.delete('/:id', ...staff, c.remove);
  return r;
};
const bookings = express.Router();
bookings.get('/mine', protect, mine);
bookings.post('/', optionalAuth, createBooking);
bookings.get('/', ...staff, bookingCrud.list);
bookings.get('/:key', ...staff, bookingCrud.get);
bookings.put('/:id', ...staff, bookingCrud.update);
bookings.delete('/:id', ...staff, bookingCrud.remove);

module.exports = {
  tours: build({ model: M.Tour, publicRead: true, searchFields: ['title', 'shortDescription'], publicFilter: { isActive: true }, populate: 'destination' }),
  destinations: build({ model: M.Destination, publicRead: true, searchFields: ['name', 'state', 'location'], publicFilter: { isActive: true } }),
  vehicles: build({ model: M.Vehicle, publicRead: true, searchFields: ['name', 'brand'], publicFilter: { isActive: true } }),
  testimonials: build({ model: M.Testimonial, publicRead: true, publicFilter: { isPublished: true } }),
  gallery: build({ model: M.Gallery, publicRead: true }),
  blog: build({ model: M.Blog, publicRead: true, searchFields: ['title', 'tags'], publicFilter: { published: true } }),
  inquiries: build({ model: M.Inquiry, publicRead: false, publicCreate: true, searchFields: ['name', 'phone', 'email'], clean: ['status', 'adminNotes', 'isRead'] }),
  bookings
};
