"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = __importDefault(require("./BaseService"));
const Prompt_1 = __importDefault(require("../models/Prompt"));
const OpenAIService_1 = __importDefault(require("./OpenAIService"));
const mongoose_1 = __importDefault(require("mongoose"));
class PromptService extends BaseService_1.default {
    constructor() {
        super(Prompt_1.default);
    }
    async create(data) {
        try {
            console.log('🚀 [PromptService] Create işlemi başlatıldı');
            console.log('📦 [PromptService] Gelen data:', JSON.stringify(data, null, 2));
            if (!data.projectId || data.projectId.toString() === 'undefined') {
                console.error('❌ [PromptService] Geçersiz Project ID:', data.projectId);
                throw new Error('Geçerli bir Project ID gerekli');
            }
            // OpenAI verilerini hazırla
            const promptData = {
                platform: data.platform,
                technologies: data.technologies,
                projectDetails: data.projectDetails
            };
            console.log('📤 [PromptService] OpenAI\'ye gönderilecek data:', JSON.stringify(promptData, null, 2));
            // OpenAI ile instructions oluştur
            let instructions;
            try {
                console.log('🤖 [PromptService] OpenAI servisi çağrılıyor...');
                instructions = await OpenAIService_1.default.generateInstructions(promptData);
                console.log('✅ [PromptService] OpenAI\'den başarılı yanıt alındı');
                console.log('📝 [PromptService] Oluşturulan instructions:', instructions.substring(0, 100) + '...');
            }
            catch (error) {
                console.error('❌ [PromptService] OpenAI hatası:', error.message);
                console.error('🔍 [PromptService] Hata detayı:', error);
                throw new Error(`OpenAI ile iletişim hatası: ${error.message}`);
            }
            if (!instructions) {
                console.error('❌ [PromptService] OpenAI boş instructions döndü!');
                throw new Error('Instructions oluşturulamadı');
            }
            // Veritabanına kaydet
            console.log('💾 [PromptService] Veritabanına kayıt başlıyor...');
            const prompt = await super.create({
                ...data,
                instructions
            });
            console.log('✅ [PromptService] Prompt başarıyla oluşturuldu, ID:', prompt._id);
            return prompt;
        }
        catch (error) {
            console.error('❌ [PromptService] Genel hata:', error.message);
            console.error('🔍 [PromptService] Hata stack:', error.stack);
            throw error;
        }
    }
    async findByProjectId(projectId) {
        try {
            console.log('🔍 [PromptService] Project ID ile arama yapılıyor:', projectId);
            // ID kontrolü
            if (!projectId || projectId === 'undefined') {
                console.error('❌ [PromptService] Geçersiz Project ID:', projectId);
                throw new Error('Geçerli bir Project ID gerekli');
            }
            // ObjectId kontrolü
            if (!mongoose_1.default.Types.ObjectId.isValid(projectId)) {
                console.error('❌ [PromptService] Geçersiz ObjectId formatı:', projectId);
                throw new Error('Geçersiz ID formatı');
            }
            const prompt = await this.model.findOne({ projectId: new mongoose_1.default.Types.ObjectId(projectId) });
            if (!prompt) {
                console.log('ℹ️ [PromptService] Prompt bulunamadı:', projectId);
            }
            else {
                console.log('✅ [PromptService] Prompt bulundu, ID:', prompt._id);
            }
            return prompt;
        }
        catch (error) {
            console.error('❌ [PromptService] Arama hatası:', error.message);
            throw error;
        }
    }
}
exports.default = new PromptService();
