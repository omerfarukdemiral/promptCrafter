import BaseService from './BaseService';
import Prompt, { IPrompt } from '../models/Prompt';
import openAIService from './OpenAIService';
import mongoose from 'mongoose';

class PromptService extends BaseService<IPrompt> {
  constructor() {
    super(Prompt);
  }

  async create(data: Partial<IPrompt>): Promise<IPrompt> {
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
        instructions = await openAIService.generateInstructions(promptData);
        console.log('✅ [PromptService] OpenAI\'den başarılı yanıt alındı');
        console.log('📝 [PromptService] Oluşturulan instructions:', instructions.substring(0, 100) + '...');
      } catch (error: any) {
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
    } catch (error: any) {
      console.error('❌ [PromptService] Genel hata:', error.message);
      console.error('🔍 [PromptService] Hata stack:', error.stack);
      throw error;
    }
  }

  async findByProjectId(projectId: string): Promise<IPrompt | null> {
    try {
      console.log('🔍 [PromptService] Project ID ile arama yapılıyor:', projectId);

      // ID kontrolü
      if (!projectId || projectId === 'undefined') {
        console.error('❌ [PromptService] Geçersiz Project ID:', projectId);
        throw new Error('Geçerli bir Project ID gerekli');
      }

      // ObjectId kontrolü
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        console.error('❌ [PromptService] Geçersiz ObjectId formatı:', projectId);
        throw new Error('Geçersiz ID formatı');
      }

      const prompt = await this.model.findOne({ projectId: new mongoose.Types.ObjectId(projectId) });
      
      if (!prompt) {
        console.log('ℹ️ [PromptService] Prompt bulunamadı:', projectId);
      } else {
        console.log('✅ [PromptService] Prompt bulundu, ID:', prompt._id);
      }

      return prompt;
    } catch (error: any) {
      console.error('❌ [PromptService] Arama hatası:', error.message);
      throw error;
    }
  }
}

export default new PromptService(); 