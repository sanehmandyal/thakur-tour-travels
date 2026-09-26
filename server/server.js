require('dotenv').config();
const express = require('express'), cors = require('cors'), helmet = require('helmet'), morgan = require('morgan');
const rateLimit = require('express-rate-limit'), sanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const app = express();
app.use(helmet(), cors({ origin: process.env.CLIENT_URL?.split(','), credentials: true }), express.json({ limit: '1mb' }), sanitize(), morgan('dev'));
const forms = rateLimit({ windowMs: 60 * 60 * 1000, max: 30 });
app.get('/api/health', (_q, r) => r.json({ ok: true }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, max: 60 }), require('./routes/authRoutes'));
app.post('/api/bookings', forms); app.post('/api/inquiries', forms);
Object.entries(require('./routes/resources')).forEach(([k, router]) => app.use(`/api/${k}`, router));
app.use('/api', require('./routes/adminRoutes')); // /settings /dashboard /users
app.use(notFound, errorHandler);
connectDB().then(() => app.listen(process.env.PORT || 5000, () => console.log('API running'))).catch((e) => { console.error(e.message); process.exit(1); });
