import { webSteps, mobileSteps } from '../data/technologies';
import Technology from '../models/Technology';
import logger from './logger';

export const updateTechnologyIcons = async () => {
  try {
    logger.info('Teknoloji verilerini güncelleme işlemi başlatılıyor...');
    
    // Tüm adımları birleştir
    const allSteps = [...webSteps, ...mobileSteps];
    let updatedCount = 0;
    let errorCount = 0;
    
    // Her adımdaki teknolojileri düzenle
    for (const step of allSteps) {
      for (const option of step.options) {
        try {
          const updateData = {
            category: step.title,
            name: option.name,
            icon: option.icon,
            description: option.description
          };

          const result = await Technology.findOneAndUpdate(
            { name: option.name },
            { $set: updateData },
            { 
              new: true,
              upsert: true // Eğer teknoloji yoksa oluştur
            }
          );

          if (result) {
            updatedCount++;
            logger.info(`Teknoloji güncellendi: ${option.name}`, {
              category: step.title,
              icon: option.icon
            });
          }
        } catch (error: any) {
          errorCount++;
          logger.error(`Teknoloji güncellenirken hata: ${option.name}`, {
            error: error.message,
            stack: error.stack
          });
        }
      }
    }

    logger.info('Teknoloji güncelleme işlemi tamamlandı', {
      totalProcessed: allSteps.reduce((acc, step) => acc + step.options.length, 0),
      updatedCount,
      errorCount
    });

  } catch (error: any) {
    logger.error('Teknoloji ikonları güncellenirken hata oluştu:', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}; 