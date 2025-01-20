"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = __importDefault(require("../utils/logger"));
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MongoDB URI bulunamadı. Lütfen .env dosyasını kontrol edin.');
        }
        logger_1.default.info('MongoDB bağlantısı başlatılıyor...');
        await mongoose_1.default.connect(mongoURI, {
            retryWrites: true,
            w: 'majority'
        });
        logger_1.default.info('MongoDB bağlantısı başarıyla kuruldu!');
        mongoose_1.default.connection.on('error', (err) => {
            logger_1.default.error(`MongoDB bağlantı hatası: ${err}`);
        });
        mongoose_1.default.connection.on('disconnected', () => {
            logger_1.default.warn('MongoDB bağlantısı kesildi!');
        });
        mongoose_1.default.connection.on('reconnected', () => {
            logger_1.default.info('MongoDB bağlantısı yeniden kuruldu!');
        });
    }
    catch (error) {
        logger_1.default.error(`MongoDB bağlantı hatası: ${error}`);
        throw error;
    }
};
exports.default = connectDB;
