"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("./utils/logger"));
const initData_1 = require("./utils/initData");
const errorHandler_1 = require("./middleware/errorHandler");
const rateLimiter_1 = require("./middleware/rateLimiter");
const prompt_routes_1 = __importDefault(require("./routes/prompt.routes"));
// Load env vars
dotenv_1.default.config();
const app = (0, express_1.default)();
// Connect to MongoDB and initialize data
(0, database_1.default)()
    .then(async () => {
    try {
        await (0, initData_1.initializeData)();
    }
    catch (error) {
        logger_1.default.error('Başlangıç verileri yüklenirken hata oluştu:', error);
    }
})
    .catch(err => {
    logger_1.default.error('MongoDB bağlantı hatası:', err);
    process.exit(1);
});
// CORS ayarları
const allowedOrigins = [
    'https://prompt-crafter.vercel.app',
    'https://promptcrafter.vercel.app',
    'http://localhost:3000' // Geliştirme ortamı için
];
app.use((0, cors_1.default)({
    origin: '*', // Geliştirme aşamasında tüm originlere izin ver
    credentials: true
}));
// Middleware
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(rateLimiter_1.apiLimiter);
// Routes
app.use('/api', routes_1.default);
app.use('/api/prompts', prompt_routes_1.default);
app.use('/api/technologies', routes_1.default);
app.use('/api/projects', routes_1.default);
// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        mongodb: mongoose_1.default.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});
// Health check
app.get('/api/health', (_, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Test route
app.get('/', (_, res) => {
    res.json({ message: 'Backend is running!' });
});
// Global hata yakalama
app.use(errorHandler_1.errorHandler);
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
const PORT = process.env.PORT || 5678;
app.listen(PORT, () => {
    logger_1.default.info(`Server is running on port ${PORT}`);
});
exports.default = app;
