import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/database';
import routes from './routes';
import logger from './utils/logger';
import { initializeData } from './utils/initData';
import { errorHandler } from './middleware/errorHandler';
import { apiLimiter } from './middleware/rateLimiter';
import promptRoutes from './routes/prompt.routes';

// Load env vars
dotenv.config();

const app = express();

// Connect to MongoDB and initialize data
connectDB()
  .then(async () => {
    try {
      await initializeData();
    } catch (error) {
      logger.error('Başlangıç verileri yüklenirken hata oluştu:', error);
    }
  })
  .catch(err => {
    logger.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
  });

// CORS ayarları
const allowedOrigins = [
  'https://prompt-crafter.vercel.app',
  'https://promptcrafter.vercel.app',
  'http://localhost:3000',
  'http://localhost:5678'
];

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(null, false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(apiLimiter);

// Routes
app.use('/api', routes);
app.use('/api/prompts', promptRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Error handler
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Vercel için export
export default app;

// Local development için
if (require.main === module) {
  const port = process.env.PORT || 5678;
  app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
  });
} 