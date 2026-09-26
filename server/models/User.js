const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const schema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: String, password: { type: String, required: true, minlength: 8, select: false },
  role: { type: String, enum: ['admin', 'staff', 'customer'], default: 'customer' },
  profileImage: String, isActive: { type: Boolean, default: true }
}, { timestamps: true });
schema.pre('save', async function (n) { if (this.isModified('password')) this.password = await bcrypt.hash(this.password, 12); n(); });
schema.methods.matches = function (p) { return bcrypt.compare(p, this.password); };
module.exports = mongoose.models.User || mongoose.model('User', schema);
