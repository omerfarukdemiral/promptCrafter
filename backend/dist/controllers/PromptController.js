"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const BaseController_1 = __importDefault(require("./BaseController"));
const PromptService_1 = __importDefault(require("../services/PromptService"));
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
class PromptController extends BaseController_1.default {
    async create(req, res) {
        try {
            logger_1.default.info('Prompt oluşturma isteği alındı:', {
                body: {
                    projectId: req.body.projectId,
                    platform: req.body.platform,
                    technologiesCount: Object.keys(req.body.technologies || {}).length,
                    projectDetails: req.body.projectDetails?.substring(0, 100) + '...'
                }
            });
            // Validasyon kontrolü
            if (!req.body.projectId || !req.body.platform || !req.body.technologies || !req.body.projectDetails) {
                const missingFields = {
                    projectId: !req.body.projectId,
                    platform: !req.body.platform,
                    technologies: !req.body.technologies,
                    projectDetails: !req.body.projectDetails
                };
                logger_1.default.warn('Eksik parametreler:', {
                    body: req.body,
                    missingFields
                });
                return res.status(400).json({
                    success: false,
                    message: 'Gerekli alanlar eksik',
                    details: {
                        projectId: missingFields.projectId ? 'Project ID gerekli' : null,
                        platform: missingFields.platform ? 'Platform gerekli' : null,
                        technologies: missingFields.technologies ? 'Teknolojiler gerekli' : null,
                        projectDetails: missingFields.projectDetails ? 'Proje detayları gerekli' : null
                    }
                });
            }
            // Teknoloji validasyonu
            if (typeof req.body.technologies !== 'object' || Array.isArray(req.body.technologies)) {
                logger_1.default.warn('Geçersiz teknoloji formatı:', { technologies: req.body.technologies });
                return res.status(400).json({
                    success: false,
                    message: 'Teknolojiler obje formatında olmalıdır'
                });
            }
            // ObjectId kontrolü
            if (!mongoose_1.default.Types.ObjectId.isValid(req.body.projectId)) {
                logger_1.default.warn('Geçersiz Project ID formatı:', { projectId: req.body.projectId });
                return res.status(400).json({
                    success: false,
                    message: 'Geçersiz Project ID formatı'
                });
            }
            // Platform kontrolü
            if (!['web', 'mobile'].includes(req.body.platform)) {
                logger_1.default.warn('Geçersiz platform değeri:', { platform: req.body.platform });
                return res.status(400).json({
                    success: false,
                    message: 'Platform "web" veya "mobile" olmalıdır'
                });
            }
            logger_1.default.info('Validasyonlar başarılı, prompt oluşturuluyor...');
            const prompt = await PromptService_1.default.create(req.body);
            logger_1.default.info('Prompt başarıyla oluşturuldu:', {
                promptId: prompt._id,
                projectId: prompt.projectId,
                technologies: Object.keys(prompt.technologies)
            });
            return res.status(200).json({
                success: true,
                message: 'Prompt başarıyla oluşturuldu',
                data: prompt
            });
        }
        catch (error) {
            logger_1.default.error('Prompt oluşturulurken hata:', {
                error: error.message,
                stack: error.stack,
                body: {
                    projectId: req.body.projectId,
                    platform: req.body.platform,
                    technologiesCount: Object.keys(req.body.technologies || {}).length
                }
            });
            return res.status(500).json({
                success: false,
                message: 'Prompt oluşturulurken bir hata oluştu',
                error: error.message
            });
        }
    }
    async getAll(req, res) {
        try {
            logger_1.default.info('Tüm promptlar için istek alındı');
            const prompts = await PromptService_1.default.findAll();
            logger_1.default.info('Promptlar başarıyla getirildi', { count: prompts.length });
            return res.status(200).json({
                success: true,
                data: prompts
            });
        }
        catch (error) {
            logger_1.default.error('Promptlar listelenirken hata:', error);
            return res.status(500).json({
                success: false,
                message: 'Promptlar listelenirken bir hata oluştu'
            });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            logger_1.default.info('ID ile prompt getirme isteği:', { promptId: id });
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                logger_1.default.warn('Geçersiz prompt ID formatı:', { promptId: id });
                return res.status(400).json({
                    success: false,
                    message: 'Geçersiz ID formatı'
                });
            }
            const prompt = await PromptService_1.default.findById(id);
            if (!prompt) {
                logger_1.default.warn('Prompt bulunamadı:', { promptId: id });
                return res.status(404).json({
                    success: false,
                    message: 'Prompt bulunamadı'
                });
            }
            logger_1.default.info('Prompt başarıyla getirildi:', { promptId: id });
            return res.status(200).json({
                success: true,
                data: prompt
            });
        }
        catch (error) {
            logger_1.default.error('Prompt getirme hatası:', {
                error: error.message,
                promptId: req.params.id
            });
            return res.status(500).json({
                success: false,
                message: 'Prompt getirilirken bir hata oluştu'
            });
        }
    }
    async getByProjectId(req, res) {
        try {
            const { projectId } = req.params;
            logger_1.default.info('Proje ID ile prompt getirme isteği:', { projectId });
            if (!projectId || projectId === 'undefined') {
                logger_1.default.warn('Project ID eksik veya geçersiz:', { projectId });
                return res.status(400).json({
                    success: false,
                    message: 'Project ID gerekli'
                });
            }
            if (!mongoose_1.default.Types.ObjectId.isValid(projectId)) {
                logger_1.default.warn('Geçersiz Project ID formatı:', { projectId });
                return res.status(400).json({
                    success: false,
                    message: 'Geçersiz Project ID formatı'
                });
            }
            const prompt = await PromptService_1.default.findByProjectId(projectId);
            if (!prompt) {
                logger_1.default.warn('Proje için prompt bulunamadı:', { projectId });
                return res.status(404).json({
                    success: false,
                    message: 'Bu proje için prompt bulunamadı'
                });
            }
            logger_1.default.info('Proje promptu başarıyla getirildi:', {
                projectId,
                promptId: prompt._id
            });
            return res.status(200).json({
                success: true,
                data: prompt
            });
        }
        catch (error) {
            logger_1.default.error('Proje promptu getirme hatası:', {
                error: error.message,
                projectId: req.params.projectId
            });
            return res.status(500).json({
                success: false,
                message: 'Prompt getirilirken bir hata oluştu'
            });
        }
    }
}
PromptController.validate = {
    create: [
        (0, express_validator_1.body)('projectId')
            .notEmpty()
            .withMessage('Project ID gerekli')
            .custom((value) => {
            if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                throw new Error('Geçersiz Project ID formatı');
            }
            return true;
        }),
        (0, express_validator_1.body)('platform')
            .isIn(['web', 'mobile'])
            .withMessage('Geçersiz platform'),
        (0, express_validator_1.body)('technologies')
            .isObject()
            .withMessage('Geçersiz teknoloji seçimi'),
        (0, express_validator_1.body)('projectDetails')
            .isString()
            .notEmpty()
            .withMessage('Proje detayları gerekli'),
    ],
    getByProjectId: [
        (0, express_validator_1.param)('projectId')
            .isString()
            .notEmpty()
            .withMessage('Project ID gerekli')
            .custom((value) => {
            if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                throw new Error('Geçersiz Project ID formatı');
            }
            return true;
        }),
    ],
};
exports.default = PromptController;
