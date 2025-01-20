"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Project_1 = __importDefault(require("../models/Project"));
const ProjectTechnology_1 = __importDefault(require("../models/ProjectTechnology"));
const Technology_1 = __importDefault(require("../models/Technology"));
const BaseController_1 = __importDefault(require("./BaseController"));
const logger_1 = __importDefault(require("../utils/logger"));
class ProjectController extends BaseController_1.default {
    // Yeni proje oluştur
    async create(req, res) {
        try {
            logger_1.default.info('Yeni proje oluşturma isteği alındı:', { body: req.body });
            const { email, projectName, description, modules, platform, technologies } = req.body;
            // Gerekli alanların kontrolü
            if (!email || !projectName || !description || !platform) {
                logger_1.default.warn('Eksik alanlar var:', { body: req.body });
                return this.error(res, new Error('Gerekli alanlar eksik'), 400);
            }
            // Platform kontrolü
            if (!['web', 'mobile'].includes(platform)) {
                logger_1.default.warn('Geçersiz platform değeri:', { platform });
                return this.error(res, new Error('Geçersiz platform değeri'), 400);
            }
            // Teknoloji kontrolü
            if (!technologies || !Array.isArray(technologies) || technologies.length === 0) {
                logger_1.default.warn('Teknoloji seçimi eksik');
                return this.error(res, new Error('En az bir teknoloji seçilmelidir'), 400);
            }
            logger_1.default.info('Proje oluşturuluyor...', {
                email,
                projectName,
                platform,
                technologiesCount: technologies.length
            });
            // Önce projeyi oluştur
            const project = await Project_1.default.create({
                email,
                projectName,
                description,
                modules: modules || [],
                platform
            });
            logger_1.default.info('Proje başarıyla oluşturuldu:', { projectId: project._id });
            // Her bir teknoloji için kontrol ve kayıt işlemi
            const projectTechnologies = [];
            for (const tech of technologies) {
                // Teknoloji var mı kontrol et
                let technology = await Technology_1.default.findOne({
                    $or: [
                        { _id: tech.technologyId },
                        { name: tech.name }
                    ]
                });
                // Teknoloji yoksa oluştur
                if (!technology) {
                    technology = await Technology_1.default.create({
                        name: tech.name,
                        category: tech.category || 'Diğer',
                        icon: tech.icon || '/icons/default.svg',
                        description: tech.description || `${tech.name} teknolojisi`
                    });
                    logger_1.default.info('Yeni teknoloji oluşturuldu:', { technologyId: technology._id });
                }
                // Proje-Teknoloji ilişkisini oluştur
                const projectTechnology = await ProjectTechnology_1.default.create({
                    projectId: project._id,
                    technologyId: technology._id,
                    stepId: tech.stepId
                });
                projectTechnologies.push(projectTechnology);
            }
            logger_1.default.info('Proje-Teknoloji ilişkileri başarıyla oluşturuldu:', {
                projectId: project._id,
                technologiesCount: projectTechnologies.length
            });
            // Oluşturulan projeyi teknolojileriyle birlikte getir
            const completeProject = await Project_1.default.findById(project._id);
            const populatedTechnologies = await ProjectTechnology_1.default.find({ projectId: project._id })
                .populate('technologyId')
                .sort({ stepId: 1 });
            logger_1.default.info('Proje oluşturma işlemi tamamlandı');
            // Başarılı yanıt
            return res.status(200).json({
                success: true,
                message: 'Proje başarıyla oluşturuldu',
                data: {
                    project: completeProject,
                    technologies: populatedTechnologies
                }
            });
        }
        catch (error) {
            logger_1.default.error('Proje oluşturma hatası:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Proje oluşturulurken bir hata oluştu'
            });
        }
    }
    // Tüm projeleri listele
    async list(req, res) {
        try {
            const projects = await Project_1.default.find()
                .sort({ createdAt: -1 })
                .lean();
            // Her proje için teknolojileri getir
            const projectsWithTechnologies = await Promise.all(projects.map(async (project) => {
                const technologies = await ProjectTechnology_1.default.find({ projectId: project._id })
                    .populate('technologyId')
                    .lean();
                return {
                    ...project,
                    technologies: technologies.map(tech => tech.technologyId)
                };
            }));
            return res.status(200).json({
                success: true,
                data: projectsWithTechnologies
            });
        }
        catch (error) {
            logger_1.default.error('Projeler listelenirken hata:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Projeler listelenirken bir hata oluştu'
            });
        }
    }
    // Proje detaylarını getir
    async detail(req, res) {
        try {
            const { id } = req.params;
            logger_1.default.info('Proje detayı isteği alındı:', { projectId: id });
            // Projeyi bul
            const project = await Project_1.default.findById(id);
            if (!project) {
                logger_1.default.warn('Proje bulunamadı:', { projectId: id });
                return res.status(404).json({
                    success: false,
                    message: 'Proje bulunamadı'
                });
            }
            // Projenin teknolojilerini getir ve populate et
            const projectTechnologies = await ProjectTechnology_1.default.find({ projectId: id })
                .populate({
                path: 'technologyId',
                select: 'name icon category description'
            })
                .sort({ stepId: 1 });
            // Teknoloji verilerini düzenle
            const technologies = projectTechnologies.map(pt => ({
                _id: pt.technologyId._id,
                name: pt.technologyId.name,
                icon: pt.technologyId.icon,
                category: pt.technologyId.category,
                description: pt.technologyId.description,
                stepId: pt.stepId
            }));
            logger_1.default.info('Proje detayları başarıyla getirildi:', {
                projectId: id,
                technologiesCount: technologies.length
            });
            // Başarılı yanıt
            return res.status(200).json({
                success: true,
                data: {
                    _id: project._id,
                    projectName: project.projectName,
                    description: project.description,
                    email: project.email,
                    platform: project.platform,
                    modules: project.modules || [],
                    technologies,
                    createdAt: project.createdAt,
                    updatedAt: project.updatedAt
                }
            });
        }
        catch (error) {
            logger_1.default.error('Proje detayı getirilirken hata:', error);
            return res.status(500).json({
                success: false,
                message: error.message || 'Proje detayı getirilirken bir hata oluştu'
            });
        }
    }
    // Projeyi güncelle
    async update(req, res) {
        try {
            const { id } = req.params;
            const { email, projectName, description, modules, technologies } = req.body;
            const project = await Project_1.default.findByIdAndUpdate(id, {
                email,
                projectName,
                description,
                modules
            }, { new: true });
            if (!project) {
                return this.notFound(res);
            }
            // Mevcut teknoloji ilişkilerini sil
            await ProjectTechnology_1.default.deleteMany({ projectId: id });
            // Yeni teknoloji ilişkilerini ekle
            if (technologies && technologies.length > 0) {
                const projectTechnologies = technologies.map((tech) => ({
                    projectId: project._id,
                    technologyId: tech.technologyId,
                    stepId: tech.stepId
                }));
                await ProjectTechnology_1.default.insertMany(projectTechnologies);
            }
            return this.success(res, project);
        }
        catch (error) {
            return this.error(res, error);
        }
    }
    // Projeyi sil
    async delete(req, res) {
        try {
            const { id } = req.params;
            const project = await Project_1.default.findByIdAndDelete(id);
            if (!project) {
                return this.notFound(res);
            }
            // İlişkili teknolojileri de sil
            await ProjectTechnology_1.default.deleteMany({ projectId: id });
            return this.success(res, { message: 'Proje başarıyla silindi' });
        }
        catch (error) {
            return this.error(res, error);
        }
    }
}
exports.default = new ProjectController();
