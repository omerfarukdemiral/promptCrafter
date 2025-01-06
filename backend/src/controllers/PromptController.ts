import { Request, Response } from 'express';
import { body } from 'express-validator';
import BaseController from './BaseController';
import promptService from '../services/PromptService';

class PromptController extends BaseController {
  async create(req: Request, res: Response) {
    return this.handleRequest(req, res, async () => {
      const prompt = await promptService.create(req.body);
      return prompt;
    });
  }

  async getAll(req: Request, res: Response) {
    return this.handleRequest(req, res, async () => {
      const prompts = await promptService.findAll();
      return prompts;
    });
  }

  async getById(req: Request, res: Response) {
    return this.handleRequest(req, res, async () => {
      const prompt = await promptService.findById(req.params.id);
      if (!prompt) {
        res.status(404).json({ message: 'Prompt bulunamadı' });
        return;
      }
      return prompt;
    });
  }

  static validate = {
    create: [
      body('platform').isIn(['web', 'mobile']).withMessage('Geçersiz platform'),
      body('technologies').isObject().withMessage('Geçersiz teknoloji seçimi'),
      body('projectDetails').isString().notEmpty().withMessage('Proje detayları gerekli'),
    ],
  };
}

export default new PromptController(); 