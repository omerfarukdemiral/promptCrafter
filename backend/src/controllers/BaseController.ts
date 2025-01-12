import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import logger from '../utils/logger';

export default abstract class BaseController {
  protected async handleRequest(req: Request, res: Response, action: () => Promise<any>) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const result = await action();
      return res.status(200).json(result);
    } catch (error) {
      logger.error(`Error in ${this.constructor.name}: ${error}`);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  protected success(res: Response, data: any = null, status: number = 200) {
    return res.status(status).json({
      success: true,
      data
    });
  }

  protected error(res: Response, error: any, status: number = 500) {
    return res.status(status).json({
      success: false,
      error: error.message || 'Bir hata oluştu'
    });
  }

  protected notFound(res: Response, message: string = 'Kayıt bulunamadı') {
    return res.status(404).json({
      success: false,
      error: message
    });
  }
} 