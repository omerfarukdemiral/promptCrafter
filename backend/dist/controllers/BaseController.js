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
const logger_1 = __importDefault(require("../utils/logger"));
class BaseController {
    handleRequest(req, res, action) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const result = yield action();
                return res.status(200).json(result);
            }
            catch (error) {
                logger_1.default.error(`Error in ${this.constructor.name}: ${error}`);
                return res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    success(res, data = null, status = 200) {
        return res.status(status).json({
            success: true,
            data
        });
    }
    error(res, error, status = 500) {
        return res.status(status).json({
            success: false,
            error: error.message || 'Bir hata oluştu'
        });
    }
    notFound(res, message = 'Kayıt bulunamadı') {
        return res.status(404).json({
            success: false,
            error: message
        });
    }
}
exports.default = BaseController;
