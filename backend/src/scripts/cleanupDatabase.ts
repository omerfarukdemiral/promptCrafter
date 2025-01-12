import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { cleanupProjects } from '../utils/initData';
import logger from '../utils/logger';

// .env dosyasını yükle
dotenv.config();

const cleanup = async () => {
  try {
    // MongoDB bağlantısı
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MongoDB URI bulunamadı');
    }

    logger.info('MongoDB bağlantısı kuruluyor...');
    await mongoose.connect(mongoURI);
    logger.info('MongoDB bağlantısı başarılı');

    // Temizleme işlemini çalıştır
    await cleanupProjects();

    logger.info('Temizleme işlemi başarıyla tamamlandı');
    process.exit(0);
  } catch (error: any) {
    logger.error('Temizleme işlemi sırasında hata:', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
};

// Script'i çalıştır
cleanup(); 