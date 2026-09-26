const jwt = require('jsonwebtoken');
const User = require('../models/User');
const load = async (req) => {
  const h = req.headers.authorization;
  if (!h?.startsWith('Bearer ')) return null;
  try {
    const { id } = jwt.verify(h.split(' ')[1], process.env.JWT_SECRET);
    const u = await User.findById(id);
    return u && u.isActive ? u : null;
  } catch { return null; }
};
exports.protect = async (req, res, next) => {
  req.user = await load(req);
  if (!req.user) { res.status(401); return next(new Error('Not authorized, please log in')); }
  next();
};
exports.optionalAuth = async (req, _res, next) => { req.user = await load(req); next(); };
