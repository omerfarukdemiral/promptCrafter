import mongoose from 'mongoose';
import logger from '../utils/logger';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI bulunamadı. Lütfen .env dosyasını kontrol edin.');
    }

    logger.info('MongoDB bağlantısı başlatılıyor...');
    
    await mongoose.connect(mongoURI, {
      retryWrites: true,
      w: 'majority'
    });
    
    logger.info('MongoDB bağlantısı başarıyla kuruldu!');

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB bağlantı hatası: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB bağlantısı kesildi!');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB bağlantısı yeniden kuruldu!');
    });

  } catch (error) {
    logger.error(`MongoDB bağlantı hatası: ${error}`);
    throw error;
  }
};

export default connectDB; 