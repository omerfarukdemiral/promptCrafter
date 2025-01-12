"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PromptController_1 = __importDefault(require("../controllers/PromptController"));
const router = express_1.default.Router();
const promptController = new PromptController_1.default();
router.post('/', promptController.create.bind(promptController));
router.get('/', promptController.getAll.bind(promptController));
router.get('/:id', promptController.getById.bind(promptController));
exports.default = router;
