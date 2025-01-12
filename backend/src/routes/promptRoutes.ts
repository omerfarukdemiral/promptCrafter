import express from 'express';
import PromptController from '../controllers/PromptController';

const router = express.Router();
const promptController = new PromptController();

router.post('/', promptController.create.bind(promptController));
router.get('/', promptController.getAll.bind(promptController));
router.get('/:id', promptController.getById.bind(promptController));

export default router; 