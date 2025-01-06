import { Router, Request, Response } from 'express';
import promptController from '../controllers/PromptController';

const router = Router();

// Validation middleware'i ayrı olarak tanımlayalım
const validatePrompt = [
  ...promptController.constructor.prototype.validate.create,
];

router.post('/', validatePrompt, (req: Request, res: Response) => promptController.create(req, res));
router.get('/', (req: Request, res: Response) => promptController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => promptController.getById(req, res));

export default router; 