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
const Project_1 = __importDefault(require("../models/Project"));
const ProjectTechnology_1 = __importDefault(require("../models/ProjectTechnology"));
const BaseController_1 = __importDefault(require("./BaseController"));
class ProjectController extends BaseController_1.default {
    // Yeni proje oluştur
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, projectName, description, modules, platform, technologies } = req.body;
                // Önce projeyi oluştur
                const project = yield Project_1.default.create({
                    email,
                    projectName,
                    description,
                    modules,
                    platform
                });
                // Seçilen teknolojileri kaydet
                if (technologies && technologies.length > 0) {
                    const projectTechnologies = technologies.map((tech) => ({
                        projectId: project._id,
                        technologyId: tech.technologyId,
                        stepId: tech.stepId
                    }));
                    yield ProjectTechnology_1.default.insertMany(projectTechnologies);
                }
                return this.success(res, project);
            }
            catch (error) {
                return this.error(res, error);
            }
        });
    }
    // Tüm projeleri listele
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projects = yield Project_1.default.find()
                    .sort({ createdAt: -1 });
                return this.success(res, projects);
            }
            catch (error) {
                return this.error(res, error);
            }
        });
    }
    // Proje detaylarını getir
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield Project_1.default.findById(id);
                if (!project) {
                    return this.notFound(res);
                }
                // Projenin teknolojilerini getir
                const projectTechnologies = yield ProjectTechnology_1.default.find({ projectId: id })
                    .populate('technologyId')
                    .sort({ stepId: 1 });
                return this.success(res, Object.assign(Object.assign({}, project.toObject()), { technologies: projectTechnologies }));
            }
            catch (error) {
                return this.error(res, error);
            }
        });
    }
    // Projeyi güncelle
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { email, projectName, description, modules, technologies } = req.body;
                const project = yield Project_1.default.findByIdAndUpdate(id, {
                    email,
                    projectName,
                    description,
                    modules
                }, { new: true });
                if (!project) {
                    return this.notFound(res);
                }
                // Mevcut teknoloji ilişkilerini sil
                yield ProjectTechnology_1.default.deleteMany({ projectId: id });
                // Yeni teknoloji ilişkilerini ekle
                if (technologies && technologies.length > 0) {
                    const projectTechnologies = technologies.map((tech) => ({
                        projectId: project._id,
                        technologyId: tech.technologyId,
                        stepId: tech.stepId
                    }));
                    yield ProjectTechnology_1.default.insertMany(projectTechnologies);
                }
                return this.success(res, project);
            }
            catch (error) {
                return this.error(res, error);
            }
        });
    }
    // Projeyi sil
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const project = yield Project_1.default.findByIdAndDelete(id);
                if (!project) {
                    return this.notFound(res);
                }
                // İlişkili teknolojileri de sil
                yield ProjectTechnology_1.default.deleteMany({ projectId: id });
                return this.success(res, { message: 'Proje başarıyla silindi' });
            }
            catch (error) {
                return this.error(res, error);
            }
        });
    }
}
exports.default = new ProjectController();
