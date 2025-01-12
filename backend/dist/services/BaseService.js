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
const logger_1 = __importDefault(require("../utils/logger"));
class BaseService {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = new this.model(data);
                return yield item.save();
            }
            catch (error) {
                logger_1.default.error(`Error creating ${this.model.modelName}: ${error}`);
                throw error;
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find();
            }
            catch (error) {
                logger_1.default.error(`Error finding all ${this.model.modelName}s: ${error}`);
                throw error;
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findById(id);
            }
            catch (error) {
                logger_1.default.error(`Error finding ${this.model.modelName} by id: ${error}`);
                throw error;
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByIdAndUpdate(id, data, { new: true });
            }
            catch (error) {
                logger_1.default.error(`Error updating ${this.model.modelName}: ${error}`);
                throw error;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByIdAndDelete(id);
            }
            catch (error) {
                logger_1.default.error(`Error deleting ${this.model.modelName}: ${error}`);
                throw error;
            }
        });
    }
}
exports.default = BaseService;
