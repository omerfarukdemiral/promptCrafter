"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Technology_1 = __importDefault(require("../models/Technology"));
const BaseController_1 = __importDefault(require("./BaseController"));
class TechnologyController extends BaseController_1.default {
    // Yeni teknoloji ekle
    async create(req, res) {
        try {
            const { category, name, icon, description } = req.body;
            const technology = await Technology_1.default.create({
                category,
                name,
                icon,
                description
            });
            return this.success(res, technology);
        }
        catch (error) {
            return this.error(res, error);
        }
    }
    // Tüm teknolojileri listele
    async list(req, res) {
        try {
            const technologies = await Technology_1.default.find()
                .sort({ category: 1, name: 1 });
            return this.success(res, technologies);
        }
        catch (error) {
            return this.error(res, error);
        }
    }
    // Kategoriye göre teknolojileri listele
    async listByCategory(req, res) {
        try {
            const { category } = req.params;
            const technologies = await Technology_1.default.find({ category })
                .sort({ name: 1 });
            return this.success(res, technologies);
        }
        catch (error) {
            return this.error(res, error);
        }
    }
    // Teknoloji detayı
    async detail(req, res) {
        try {
            const { id } = req.params;
            const technology = await Technology_1.default.findById(id);
            if (!technology) {
                return this.notFound(res);
            }
            return this.success(res, technology);
        }
        catch (error) {
            return this.error(res, error);
        }
    }
    // Teknoloji güncelle
    async update(req, res) {
        try {
            const { id } = req.params;
            const { category, name, icon, description } = req.body;
            const technology = await Technology_1.default.findByIdAndUpdate(id, {
                category,
                name,
                icon,
                description
            }, { new: true });
            if (!technology) {
                return this.notFound(res);
            }
            return this.success(res, technology);
        }
        catch (error) {
            return this.error(res, error);
        }
    }
    // Teknoloji sil
    async delete(req, res) {
        try {
            const { id } = req.params;
            const technology = await Technology_1.default.findByIdAndDelete(id);
            if (!technology) {
                return this.notFound(res);
            }
            return this.success(res, { message: 'Teknoloji başarıyla silindi' });
        }
        catch (error) {
            return this.error(res, error);
        }
    }
}
exports.default = new TechnologyController();
