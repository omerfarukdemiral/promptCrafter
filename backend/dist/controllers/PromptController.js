"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const BaseController_1 = __importDefault(require("./BaseController"));
const PromptService_1 = __importDefault(require("../services/PromptService"));
class PromptController extends BaseController_1.default {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(req, res, () => __awaiter(this, void 0, void 0, function* () {
                const prompt = yield PromptService_1.default.create(req.body);
                return prompt;
            }));
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(req, res, () => __awaiter(this, void 0, void 0, function* () {
                const prompts = yield PromptService_1.default.findAll();
                return prompts;
            }));
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.handleRequest(req, res, () => __awaiter(this, void 0, void 0, function* () {
                const prompt = yield PromptService_1.default.findById(req.params.id);
                if (!prompt) {
                    res.status(404).json({ message: 'Prompt bulunamadı' });
                    return;
                }
                return prompt;
            }));
        });
    }
}
PromptController.validate = {
    create: [
        (0, express_validator_1.body)('platform').isIn(['web', 'mobile']).withMessage('Geçersiz platform'),
        (0, express_validator_1.body)('technologies').isObject().withMessage('Geçersiz teknoloji seçimi'),
        (0, express_validator_1.body)('projectDetails').isString().notEmpty().withMessage('Proje detayları gerekli'),
    ],
};
exports.default = PromptController;
