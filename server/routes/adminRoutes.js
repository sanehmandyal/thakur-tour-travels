const r = require('express').Router();
const M = require('../models');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const wrap = (fn) => (req, res, n) => fn(req, res).catch(n);
r.get('/settings', wrap(async (_q, res) => res.json((await M.Settings.findOne()) || {})));
r.put('/settings', protect, role('admin'), wrap(async (req, res) => res.json(await M.Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true, runValidators: true }))));
r.get('/dashboard', protect, role('admin', 'staff'), wrap(async (_q, res) => {
  const [totalBookings, byStatus, customers, tours, destinations, newInquiries, revenue, recent, monthly, unreadBookings, unreadInquiries] = await Promise.all([
    M.Booking.countDocuments(), M.Booking.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    User.countDocuments({ role: 'customer' }), M.Tour.countDocuments(), M.Destination.countDocuments(), M.Inquiry.countDocuments({ status: 'New' }),
    M.Booking.aggregate([{ $match: { status: { $in: ['Confirmed', 'Completed'] } } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }]),
    M.Booking.find().sort('-createdAt').limit(8).populate('tour', 'title'),
    M.Booking.aggregate([{ $group: { _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } }, bookings: { $sum: 1 }, revenue: { $sum: '$totalAmount' } } }, { $sort: { _id: 1 } }, { $limit: 12 }]),
    M.Booking.countDocuments({ isRead: false }), M.Inquiry.countDocuments({ isRead: false })]);
  res.json({ totalBookings, byStatus, customers, tours, destinations, newInquiries, revenue: revenue[0]?.total || 0, recent, monthly, unreadBookings, unreadInquiries });
}));
r.get('/users', protect, role('admin'), wrap(async (req, res) => res.json(await User.find(req.query.role ? { role: String(req.query.role) } : {}).sort('-createdAt'))));
r.put('/users/:id', protect, role('admin'), wrap(async (req, res) => {
  const { isActive, role: rl } = req.body; res.json(await User.findByIdAndUpdate(req.params.id, { isActive, role: rl }, { new: true }));
}));
r.delete('/users/:id', protect, role('admin'), wrap(async (req, res) => { await User.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }));
module.exports = r;
