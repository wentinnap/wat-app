import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { logPageView } from './middlewares/analytics.js';
import { errorHandler } from './middlewares/error.js';
import authRoutes from './routes/auth.routes.js';
import newsRoutes from './routes/news.routes.js';
import eventsRoutes from './routes/events.routes.js';
import bookingsRoutes from './routes/bookings.routes.js';
import usersRoutes from './routes/users.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';

const app = express();

const allowOrigin = process.env.CORS_ORIGIN === 'true' ? true : (process.env.CORS_ORIGIN || true);
app.use(cors({ origin: allowOrigin, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// analytics logging (GET only inside middleware)
app.use(logPageView);

app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/analytics', analyticsRoutes);

// static serve client build
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// SPA fallback
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.use(errorHandler);

export default app;
