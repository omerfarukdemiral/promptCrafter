"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.AppError = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
class AppError extends Error {
    constructor(statusCode, message, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, AppError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        logger_1.default.error(`Operational error: ${err.message}`);
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    // Programmatik hatalar için
    logger_1.default.error(`Unexpected error: ${err.message}`);
    logger_1.default.error(err.stack);
    return res.status(500).json({
        status: 'error',
        message: 'Beklenmeyen bir hata oluştu.',
    });
};
exports.errorHandler = errorHandler;
