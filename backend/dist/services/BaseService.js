"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger"));
class BaseService {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        try {
            const item = new this.model(data);
            return await item.save();
        }
        catch (error) {
            logger_1.default.error(`Error creating ${this.model.modelName}: ${error}`);
            throw error;
        }
    }
    async findAll() {
        try {
            return await this.model.find();
        }
        catch (error) {
            logger_1.default.error(`Error finding all ${this.model.modelName}s: ${error}`);
            throw error;
        }
    }
    async findById(id) {
        try {
            return await this.model.findById(id);
        }
        catch (error) {
            logger_1.default.error(`Error finding ${this.model.modelName} by id: ${error}`);
            throw error;
        }
    }
    async update(id, data) {
        try {
            return await this.model.findByIdAndUpdate(id, data, { new: true });
        }
        catch (error) {
            logger_1.default.error(`Error updating ${this.model.modelName}: ${error}`);
            throw error;
        }
    }
    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id);
        }
        catch (error) {
            logger_1.default.error(`Error deleting ${this.model.modelName}: ${error}`);
            throw error;
        }
    }
}
exports.default = BaseService;
