import { Router } from 'express';
import PromptController from '../controllers/PromptController';
import { validateRequest } from '../middleware/validateRequest';

const router = Router();
const promptController = new PromptController();

// Proje ID'sine göre prompt getirme (en spesifik route en üstte)
router.get(
  '/project/:projectId',
  validateRequest(PromptController.validate.getByProjectId),
  promptController.getByProjectId.bind(promptController)
);

// ID'ye göre prompt getirme
router.get('/:id', promptController.getById.bind(promptController));

// Tüm promptları getirme
router.get('/', promptController.getAll.bind(promptController));

// Prompt oluşturma
router.post(
  '/',
  validateRequest(PromptController.validate.create),
  promptController.create.bind(promptController)
);

export default router; 