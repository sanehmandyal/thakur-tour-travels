const r = require('express').Router();
const User = require('../models/User');
const gen = require('../utils/generateToken');
const { protect } = require('../middleware/authMiddleware');
const out = (u) => ({ _id: u._id, name: u.name, email: u.email, phone: u.phone, role: u.role });
r.post('/register', async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    if (await User.findOne({ email: String(email).toLowerCase() })) { res.status(409); throw new Error('Email already registered'); }
    const u = await User.create({ name, email, phone, password, role: 'customer' });
    res.status(201).json({ token: gen(u._id), user: out(u) });
  } catch (e) { next(e); }
});
r.post('/login', async (req, res, next) => {
  try {
    const u = await User.findOne({ email: String(req.body.email || '').toLowerCase() }).select('+password');
    if (!u || !(await u.matches(String(req.body.password || '')))) { res.status(401); throw new Error('Invalid email or password'); }
    if (!u.isActive) { res.status(403); throw new Error('Account is deactivated'); }
    res.json({ token: gen(u._id), user: out(u) });
  } catch (e) { next(e); }
});
r.get('/me', protect, (req, res) => res.json(out(req.user)));
module.exports = r;
