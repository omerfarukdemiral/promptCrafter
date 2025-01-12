import { Request, Response } from 'express';
import Technology from '../models/Technology';
import BaseController from './BaseController';

class TechnologyController extends BaseController {
  // Yeni teknoloji ekle
  async create(req: Request, res: Response) {
    try {
      const { category, name, icon, description } = req.body;
      const technology = await Technology.create({
        category,
        name,
        icon,
        description
      });

      return this.success(res, technology);
    } catch (error) {
      return this.error(res, error);
    }
  }

  // Tüm teknolojileri listele
  async list(req: Request, res: Response) {
    try {
      const technologies = await Technology.find()
        .sort({ category: 1, name: 1 });

      return this.success(res, technologies);
    } catch (error) {
      return this.error(res, error);
    }
  }

  // Kategoriye göre teknolojileri listele
  async listByCategory(req: Request, res: Response) {
    try {
      const { category } = req.params;
      const technologies = await Technology.find({ category })
        .sort({ name: 1 });

      return this.success(res, technologies);
    } catch (error) {
      return this.error(res, error);
    }
  }

  // Teknoloji detayı
  async detail(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const technology = await Technology.findById(id);

      if (!technology) {
        return this.notFound(res);
      }

      return this.success(res, technology);
    } catch (error) {
      return this.error(res, error);
    }
  }

  // Teknoloji güncelle
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { category, name, icon, description } = req.body;

      const technology = await Technology.findByIdAndUpdate(id, {
        category,
        name,
        icon,
        description
      }, { new: true });

      if (!technology) {
        return this.notFound(res);
      }

      return this.success(res, technology);
    } catch (error) {
      return this.error(res, error);
    }
  }

  // Teknoloji sil
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const technology = await Technology.findByIdAndDelete(id);

      if (!technology) {
        return this.notFound(res);
      }

      return this.success(res, { message: 'Teknoloji başarıyla silindi' });
    } catch (error) {
      return this.error(res, error);
    }
  }
}

export default new TechnologyController(); 