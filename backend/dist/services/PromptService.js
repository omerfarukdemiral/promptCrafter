"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
const Prompt_1 = __importDefault(require("../models/Prompt"));
class PromptService extends BaseService_1.default {
    constructor() {
        super(Prompt_1.default);
    }
}
exports.default = new PromptService();
