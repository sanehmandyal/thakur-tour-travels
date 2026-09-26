require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const sanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const M = require('./models');
const User = require('./models/User');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'https://thakur-tour-travels-eight.vercel.app',
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map((s) => s.trim()) : [])
];

app.use(
  helmet({ crossOriginResourcePolicy: false }),
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        origin.includes('localhost')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true
  }),
  express.json({ limit: '2mb' }),
  sanitize(),
  morgan('dev')
);

const forms = rateLimit({ windowMs: 60 * 60 * 1000, max: 30 });
app.get('/api/health', (_q, r) => r.json({ ok: true, timestamp: new Date().toISOString() }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 60 }), require('./routes/authRoutes'));
app.post('/api/bookings', forms);
app.post('/api/inquiries', forms);
Object.entries(require('./routes/resources')).forEach(([k, router]) => app.use(`/api/${k}`, router));
app.use('/api', require('./routes/adminRoutes')); // /settings /dashboard /users
app.use(notFound, errorHandler);

async function autoSeedIfEmpty() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@thakurtourandtravels.com';
    const adminExists = await User.findOne({ email: adminEmail });
    if (!adminExists) {
      await User.create({
        name: process.env.ADMIN_NAME || 'Sunil Thakur (Admin)',
        email: adminEmail,
        password: process.env.ADMIN_PASSWORD || 'Thakur@2026Admin',
        role: 'admin'
      });
      console.log('Default Admin Account Initialized');
    }

    const destCount = await M.Destination.countDocuments();
    if (destCount === 0) {
      console.log('Seeding initial destinations, vehicles, and tours...');
      const { INITIAL_DESTINATIONS, INITIAL_VEHICLES, INITIAL_TOURS, DEFAULT_SETTINGS } = require('../client/src/services/mockData');
      if (DEFAULT_SETTINGS) await M.Settings.create(DEFAULT_SETTINGS);
      if (INITIAL_DESTINATIONS) await M.Destination.insertMany(INITIAL_DESTINATIONS.map(({ _id, ...d }) => d));
      if (INITIAL_VEHICLES) await M.Vehicle.insertMany(INITIAL_VEHICLES.map(({ _id, ...v }) => v));
      if (INITIAL_TOURS) await M.Tour.insertMany(INITIAL_TOURS.map(({ _id, ...t }) => t));
      console.log('Auto-seed completed successfully!');
    }
  } catch (err) {
    console.warn('Auto-seed skipped or completed:', err.message);
  }
}

connectDB()
  .then(async () => {
    await autoSeedIfEmpty();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`API running on port ${port}`));
  })
  .catch((e) => {
    console.error('MongoDB connection error:', e.message);
    process.exit(1);
  });
