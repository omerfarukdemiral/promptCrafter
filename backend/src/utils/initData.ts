import mongoose from 'mongoose';
import Project from '../models/Project';
import Technology from '../models/Technology';
import ProjectTechnology from '../models/ProjectTechnology';
import logger from './logger';
import { updateTechnologyIcons } from './updateTechnologyIcons';

// Korunacak proje ID'leri
const PROTECTED_PROJECT_IDS = [
  '6783a3411b04ccc999e569b2',
  '678389cbbb7c3c0e08f9f703'
];

// Temizleme fonksiyonu
export const cleanupProjects = async () => {
  try {
    logger.info('Proje temizleme işlemi başlatılıyor...');
    
    // Silinecek projeleri bul
    const projectsToDelete = await Project.find({
      _id: { $nin: PROTECTED_PROJECT_IDS }
    });

    logger.info(`${projectsToDelete.length} adet proje silinecek.`);

    // Her bir proje için ilişkili teknolojileri sil
    for (const project of projectsToDelete) {
      await ProjectTechnology.deleteMany({ projectId: project._id });
      logger.info(`Proje ID: ${project._id} için teknoloji ilişkileri silindi.`);
    }

    // Projeleri sil
    const deleteResult = await Project.deleteMany({
      _id: { $nin: PROTECTED_PROJECT_IDS }
    });

    logger.info('Temizleme işlemi tamamlandı:', {
      deletedProjects: deleteResult.deletedCount,
      protectedProjects: PROTECTED_PROJECT_IDS.length
    });

  } catch (error: any) {
    logger.error('Proje temizleme işlemi sırasında hata oluştu:', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
};

const initialTechnologies = [
  {
    category: "Frontend Framework",
    name: "Next.js",
    icon: "/icons/nextjs.svg",
    description: "React tabanlı, SEO dostu ve yüksek performanslı web uygulamaları için modern framework"
  },
  {
    category: "UI Kütüphanesi",
    name: "Tailwind CSS",
    icon: "/icons/tailwind.svg",
    description: "Utility-first CSS framework ile hızlı ve özelleştirilebilir UI geliştirme"
  },
  {
    category: "Backend Teknolojisi",
    name: "Node.js",
    icon: "/icons/nodejs.svg",
    description: "Ölçeklenebilir ve yüksek performanslı backend uygulamaları için JavaScript runtime"
  }
];

const initialProject = {
  email: "ornek@mail.com",
  projectName: "E-Ticaret Platformu",
  description: "Modern ve ölçeklenebilir bir e-ticaret platformu. Kullanıcılar ürünleri listeleyebilir, satın alabilir ve satabilir. Gelişmiş arama ve filtreleme özellikleri ile kullanıcı dostu bir deneyim sunar.",
  modules: ["Kullanıcı Yönetimi", "Ürün Yönetimi", "Sipariş Takibi", "Ödeme Sistemi", "Stok Yönetimi"],
  platform: "web"
};

export const initializeData = async () => {
  try {
    // Önce teknoloji ikonlarını güncelle (her durumda)
    //await updateTechnologyIcons();

    // Veritabanında proje var mı kontrol et
    const existingProject = await Project.findOne();
    if (existingProject) {
      logger.info('Veritabanında zaten proje var, yeni başlangıç verileri yüklenmeyecek.');
      return;
    }

    logger.info('Başlangıç verileri yükleniyor...');

    // Teknolojileri ekle
    const technologies = await Technology.insertMany(initialTechnologies);
    logger.info(`${technologies.length} teknoloji başarıyla eklendi.`);

    // Projeyi ekle
    const project = await Project.create(initialProject);
    logger.info('Örnek proje başarıyla eklendi:', { projectId: project._id });

    // Proje-Teknoloji ilişkilerini ekle
    const projectTechnologies = technologies.map((tech, index) => ({
      projectId: project._id,
      technologyId: tech._id,
      stepId: index + 1
    }));

    await ProjectTechnology.insertMany(projectTechnologies);
    logger.info('Proje-Teknoloji ilişkileri başarıyla eklendi.');

    logger.info('Tüm başlangıç verileri başarıyla yüklendi!');
  } catch (error: any) {
    logger.error('Başlangıç verileri yüklenirken hata oluştu:', {
      error: error.message,
      stack: error.stack
    });
    throw error;
  }
}; 