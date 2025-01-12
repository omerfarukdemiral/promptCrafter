"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProjectController_1 = __importDefault(require("../controllers/ProjectController"));
const TechnologyController_1 = __importDefault(require("../controllers/TechnologyController"));
const router = express_1.default.Router();
// Proje route'ları
router.post('/projects', ProjectController_1.default.create);
router.get('/projects', ProjectController_1.default.list);
router.get('/projects/:id', ProjectController_1.default.detail);
router.put('/projects/:id', ProjectController_1.default.update);
router.delete('/projects/:id', ProjectController_1.default.delete);
// Teknoloji route'ları
router.post('/technologies', TechnologyController_1.default.create);
router.get('/technologies', TechnologyController_1.default.list);
router.get('/technologies/category/:category', TechnologyController_1.default.listByCategory);
router.get('/technologies/:id', TechnologyController_1.default.detail);
router.put('/technologies/:id', TechnologyController_1.default.update);
router.delete('/technologies/:id', TechnologyController_1.default.delete);
exports.default = router;
