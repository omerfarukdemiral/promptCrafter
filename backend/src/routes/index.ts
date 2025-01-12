import express from 'express';
import ProjectController from '../controllers/ProjectController';
import TechnologyController from '../controllers/TechnologyController';

const router = express.Router();

// Proje route'ları
router.post('/projects', ProjectController.create);
router.get('/projects', ProjectController.list);
router.get('/projects/:id', ProjectController.detail);
router.put('/projects/:id', ProjectController.update);
router.delete('/projects/:id', ProjectController.delete);

// Teknoloji route'ları
router.post('/technologies', TechnologyController.create);
router.get('/technologies', TechnologyController.list);
router.get('/technologies/category/:category', TechnologyController.listByCategory);
router.get('/technologies/:id', TechnologyController.detail);
router.put('/technologies/:id', TechnologyController.update);
router.delete('/technologies/:id', TechnologyController.delete);

export default router; 