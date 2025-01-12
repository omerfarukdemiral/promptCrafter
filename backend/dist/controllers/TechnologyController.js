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
const Technology_1 = __importDefault(require("../models/Technology"));
const BaseController_1 = __importDefault(require("./BaseController"));
class TechnologyController extends BaseController_1.default {
    // Yeni teknoloji ekle
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category, name, icon, description } = req.body;
                const technology = yield Technology_1.default.create({
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
        });
    }
    // Tüm teknolojileri listele
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const technologies = yield Technology_1.default.find()
                    .sort({ category: 1, name: 1 });
                return this.success(res, technologies);
            }
            catch (error) {
                return this.error(res, error);
            }
        });
    }
    // Kategoriye göre teknolojileri listele
    listByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.params;
                const technologies = yield Technology_1.default.find({ category })
                    .sort({ name: 1 });
                return this.success(res, technologies);
            }
            catch (error) {
                return this.error(res, error);
            }
        });
    }
    // Teknoloji detayı
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const technology = yield Technology_1.default.findById(id);
                if (!technology) {
                    return this.notFound(res);
                }
                return this.success(res, technology);
            }
            catch (error) {
                return this.error(res, error);
            }
        });
    }
    // Teknoloji güncelle
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { category, name, icon, description } = req.body;
                const technology = yield Technology_1.default.findByIdAndUpdate(id, {
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
        });
    }
    // Teknoloji sil
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const technology = yield Technology_1.default.findByIdAndDelete(id);
                if (!technology) {
                    return this.notFound(res);
                }
                return this.success(res, { message: 'Teknoloji başarıyla silindi' });
            }
            catch (error) {
                return this.error(res, error);
            }
        });
    }
}
exports.default = new TechnologyController();
