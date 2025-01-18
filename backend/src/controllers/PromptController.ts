import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import BaseController from './BaseController';
import promptService from '../services/PromptService';
import mongoose from 'mongoose';
import logger from '../utils/logger';

class PromptController extends BaseController {
  async create(req: Request, res: Response) {
    try {
      logger.info('Prompt oluşturma isteği alındı:', { 
        body: {
          projectId: req.body.projectId,
          platform: req.body.platform,
          technologiesCount: Object.keys(req.body.technologies || {}).length,
          projectDetails: req.body.projectDetails?.substring(0, 100) + '...'
        }
      });

      // Validasyon kontrolü
      if (!req.body.projectId || !req.body.platform || !req.body.technologies || !req.body.projectDetails) {
        const missingFields = {
          projectId: !req.body.projectId,
          platform: !req.body.platform,
          technologies: !req.body.technologies,
          projectDetails: !req.body.projectDetails
        };

        logger.warn('Eksik parametreler:', { 
          body: req.body,
          missingFields
        });

        return res.status(400).json({
          success: false,
          message: 'Gerekli alanlar eksik',
          details: {
            projectId: missingFields.projectId ? 'Project ID gerekli' : null,
            platform: missingFields.platform ? 'Platform gerekli' : null,
            technologies: missingFields.technologies ? 'Teknolojiler gerekli' : null,
            projectDetails: missingFields.projectDetails ? 'Proje detayları gerekli' : null
          }
        });
      }

      // Teknoloji validasyonu
      if (typeof req.body.technologies !== 'object' || Array.isArray(req.body.technologies)) {
        logger.warn('Geçersiz teknoloji formatı:', { technologies: req.body.technologies });
        return res.status(400).json({
          success: false,
          message: 'Teknolojiler obje formatında olmalıdır'
        });
      }

      // ObjectId kontrolü
      if (!mongoose.Types.ObjectId.isValid(req.body.projectId)) {
        logger.warn('Geçersiz Project ID formatı:', { projectId: req.body.projectId });
        return res.status(400).json({
          success: false,
          message: 'Geçersiz Project ID formatı'
        });
      }

      // Platform kontrolü
      if (!['web', 'mobile'].includes(req.body.platform)) {
        logger.warn('Geçersiz platform değeri:', { platform: req.body.platform });
        return res.status(400).json({
          success: false,
          message: 'Platform "web" veya "mobile" olmalıdır'
        });
      }

      logger.info('Validasyonlar başarılı, prompt oluşturuluyor...');

      const prompt = await promptService.create(req.body);
      logger.info('Prompt başarıyla oluşturuldu:', { 
        promptId: prompt._id,
        projectId: prompt.projectId,
        technologies: Object.keys(prompt.technologies)
      });

      return res.status(200).json({
        success: true,
        message: 'Prompt başarıyla oluşturuldu',
        data: prompt
      });
    } catch (error: any) {
      logger.error('Prompt oluşturulurken hata:', { 
        error: error.message,
        stack: error.stack,
        body: {
          projectId: req.body.projectId,
          platform: req.body.platform,
          technologiesCount: Object.keys(req.body.technologies || {}).length
        }
      });
      return res.status(500).json({
        success: false,
        message: 'Prompt oluşturulurken bir hata oluştu',
        error: error.message
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      logger.info('Tüm promptlar için istek alındı');
      const prompts = await promptService.findAll();
      logger.info('Promptlar başarıyla getirildi', { count: prompts.length });
      
      return res.status(200).json({
        success: true,
        data: prompts
      });
    } catch (error: any) {
      logger.error('Promptlar listelenirken hata:', error);
      return res.status(500).json({
        success: false,
        message: 'Promptlar listelenirken bir hata oluştu'
      });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      logger.info('ID ile prompt getirme isteği:', { promptId: id });

      if (!mongoose.Types.ObjectId.isValid(id)) {
        logger.warn('Geçersiz prompt ID formatı:', { promptId: id });
        return res.status(400).json({
          success: false,
          message: 'Geçersiz ID formatı'
        });
      }

      const prompt = await promptService.findById(id);
      if (!prompt) {
        logger.warn('Prompt bulunamadı:', { promptId: id });
        return res.status(404).json({
          success: false,
          message: 'Prompt bulunamadı'
        });
      }

      logger.info('Prompt başarıyla getirildi:', { promptId: id });
      return res.status(200).json({
        success: true,
        data: prompt
      });
    } catch (error: any) {
      logger.error('Prompt getirme hatası:', { 
        error: error.message,
        promptId: req.params.id 
      });
      return res.status(500).json({
        success: false,
        message: 'Prompt getirilirken bir hata oluştu'
      });
    }
  }

  async getByProjectId(req: Request, res: Response) {
    try {
      const { projectId } = req.params;
      logger.info('Proje ID ile prompt getirme isteği:', { projectId });

      if (!projectId || projectId === 'undefined') {
        logger.warn('Project ID eksik veya geçersiz:', { projectId });
        return res.status(400).json({
          success: false,
          message: 'Project ID gerekli'
        });
      }

      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        logger.warn('Geçersiz Project ID formatı:', { projectId });
        return res.status(400).json({
          success: false,
          message: 'Geçersiz Project ID formatı'
        });
      }

      const prompt = await promptService.findByProjectId(projectId);
      if (!prompt) {
        logger.warn('Proje için prompt bulunamadı:', { projectId });
        return res.status(404).json({
          success: false,
          message: 'Bu proje için prompt bulunamadı'
        });
      }

      logger.info('Proje promptu başarıyla getirildi:', { 
        projectId,
        promptId: prompt._id 
      });
      
      return res.status(200).json({
        success: true,
        data: prompt
      });
    } catch (error: any) {
      logger.error('Proje promptu getirme hatası:', { 
        error: error.message,
        projectId: req.params.projectId 
      });
      return res.status(500).json({
        success: false,
        message: 'Prompt getirilirken bir hata oluştu'
      });
    }
  }

  static validate = {
    create: [
      body('projectId')
        .notEmpty()
        .withMessage('Project ID gerekli')
        .custom((value) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Geçersiz Project ID formatı');
          }
          return true;
        }),
      body('platform')
        .isIn(['web', 'mobile'])
        .withMessage('Geçersiz platform'),
      body('technologies')
        .isObject()
        .withMessage('Geçersiz teknoloji seçimi'),
      body('projectDetails')
        .isString()
        .notEmpty()
        .withMessage('Proje detayları gerekli'),
    ],
    getByProjectId: [
      param('projectId')
        .isString()
        .notEmpty()
        .withMessage('Project ID gerekli')
        .custom((value) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Geçersiz Project ID formatı');
          }
          return true;
        }),
    ],
  };
}

export default PromptController; 