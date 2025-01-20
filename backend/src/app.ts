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
import technologiesRouter from './routes/technologies';
import projectsRouter from './routes/projects';

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
  'http://localhost:3000'  // Geliştirme ortamı için
];

app.use(cors({
  origin: (origin, callback) => {
    // origin undefined olabilir (örn: Postman istekleri)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy violation'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(apiLimiter);

// Routes
app.use('/api', routes);
app.use('/api/prompts', promptRoutes);
app.use('/api/technologies', technologiesRouter);
app.use('/api/projects', projectsRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Global hata yakalama
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5678;

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app; 