import rateLimit from 'express-rate-limit';
import logger from '../utils/logger';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100, // Her IP için maksimum istek sayısı
  message: {
    status: 429,
    message: 'Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin.',
  },
  handler: (req, res, next, options) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(options.statusCode).send(options.message);
  },
  standardHeaders: true,
  legacyHeaders: false,
}); 