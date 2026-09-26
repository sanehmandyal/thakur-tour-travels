const mongoose = require('mongoose');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const isStaff = (u) => u && ['admin', 'staff'].includes(u.role);
module.exports = (Model, { searchFields = [], publicFilter = {}, populate = '', clean = [] } = {}) => ({
  list: async (req, res, next) => {
    try {
      const { page = 1, limit = 12, q, sort = '-createdAt', ...f } = req.query;
      const filter = isStaff(req.user) ? {} : { ...publicFilter };
      for (const k of Object.keys(f)) if (Model.schema.path(k) && typeof f[k] === 'string') filter[k] = f[k];
      if (q && searchFields.length) filter.$or = searchFields.map((s) => ({ [s]: new RegExp(esc(String(q)), 'i') }));
      const skip = (Math.max(+page, 1) - 1) * +limit;
      const [items, total] = await Promise.all([
        Model.find(filter).populate(populate).sort(String(sort)).skip(skip).limit(Math.min(+limit, 100)),
        Model.countDocuments(filter)]);
      res.json({ items, total, pages: Math.ceil(total / limit) });
    } catch (e) { next(e); }
  },
  get: async (req, res, next) => {
    try {
      const k = req.params.key;
      const q = mongoose.isValidObjectId(k) ? { _id: k } : { slug: k };
      const doc = await Model.findOne({ ...q, ...(isStaff(req.user) ? {} : publicFilter) }).populate(populate);
      if (!doc) { res.status(404); throw new Error('Not found'); }
      res.json(doc);
    } catch (e) { next(e); }
  },
  create: async (req, res, next) => {
    try {
      const body = { ...req.body }; delete body._id;
      if (!isStaff(req.user)) clean.forEach((c) => delete body[c]);
      res.status(201).json(await Model.create(body));
    } catch (e) { next(e); }
  },
  update: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!doc) { res.status(404); throw new Error('Not found'); }
      res.json(doc);
    } catch (e) { next(e); }
  },
  remove: async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id);
      if (!doc) { res.status(404); throw new Error('Not found'); }
      res.json({ message: 'Deleted' });
    } catch (e) { next(e); }
  }
});
