import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import BaseController from './BaseController';
import promptService from '../services/PromptService';
import mongoose from 'mongoose';

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
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: 'Geçersiz ID formatı' });
        return;
      }

      const prompt = await promptService.findById(req.params.id);
      if (!prompt) {
        res.status(404).json({ message: 'Prompt bulunamadı' });
        return;
      }
      return prompt;
    });
  }

  async getByProjectId(req: Request, res: Response) {
    return this.handleRequest(req, res, async () => {
      const { projectId } = req.params;

      if (!projectId || projectId === 'undefined') {
        res.status(400).json({ message: 'Project ID gerekli' });
        return;
      }

      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Geçersiz Project ID formatı' });
        return;
      }

      const prompt = await promptService.findByProjectId(projectId);
      if (!prompt) {
        res.status(404).json({ message: 'Bu proje için prompt bulunamadı' });
        return;
      }
      return prompt;
    });
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