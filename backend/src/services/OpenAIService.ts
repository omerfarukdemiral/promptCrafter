import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

class OpenAIService {
    private openai: OpenAI;

    constructor() {
        const apiKey = process.env.OPENAI_API_KEY;
        console.log('🚀 OpenAI servisi başlatılıyor...');

        if (!apiKey) {
            console.error('❌ OpenAI API anahtarı bulunamadı!');
            throw new Error('OpenAI API anahtarı gerekli');
        }

        try {
            this.openai = new OpenAI({
                apiKey: apiKey
            });
            console.log('✅ OpenAI servisi başarıyla başlatıldı');
        } catch (error) {
            console.error('❌ OpenAI servis başlatma hatası:', error);
            throw error;
        }
    }

    async generateInstructions(projectData: any): Promise<string> {
        console.log('\n=== OpenAI İstek Başlangıcı ===');
        
        // Veri kontrolü
        if (!projectData || !projectData.platform || !projectData.technologies || !projectData.projectDetails) {
            console.error('❌ Eksik proje verileri:', projectData);
            throw new Error('Geçersiz proje verileri');
        }

        try {
            console.log('📦 Proje Verileri:', JSON.stringify(projectData, null, 2));

            const systemPrompt = `Sen bir yazılım projesi için detaylı README ve kurulum talimatları oluşturan bir asistansın. 
Aşağıdaki formatta bir Markdown dosyası oluşturmalısın:

# [Proje Adı] - Proje Kurulum ve Kullanım Kılavuzu

## 🚀 Başlangıç
[Projenin kısa tanımı ve amacı]

### Gereksinimler
- [Gerekli teknolojiler ve sürümleri]
- [Bağımlılıklar]

### Kurulum
1. [Kurulum adımları]
2. [Gerekli komutlar]
3. [Ortam değişkenleri ayarları]

## 🗋 Proje Yapısı
[Proje dizin yapısı ve açıklamaları]

## 🔧 Kullanılan Teknolojiler
[Seçilen teknolojilerin listesi ve kullanım amaçları]

## 💡 Özellikler
[Projenin ana özellikleri ve modülleri]

## 🌐 API Endpoints (varsa)
[API endpoint'leri ve açıklamaları]

## 🔒 Güvenlik
[Güvenlik önlemleri ve best practice'ler]

## 📜 Lisans
[Lisans bilgisi]

Lütfen bu şablonu kullanarak, verilen proje detaylarına göre kapsamlı bir döküman oluştur.`;

            console.log('🤖 GPT-4 API çağrısı yapılıyor...');

            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: "system",
                        content: systemPrompt
                    },
                    {
                        role: "user",
                        content: `Aşağıdaki proje detayları için instructions.md dosyası oluştur:
Platform: ${projectData.platform}
Teknolojiler: ${JSON.stringify(projectData.technologies, null, 2)}
Proje Detayları: ${projectData.projectDetails}`
                    }
                ],
                temperature: 0.7,
                max_tokens: 2000
            });

            console.log('✅ GPT-4 yanıtı alındı');

            if (!response.choices[0].message.content) {
                console.error('❌ GPT-4 boş yanıt döndü!');
                throw new Error('OpenAI yanıtı boş');
            }

            const content = response.choices[0].message.content;
            console.log('📝 Oluşturulan metin (ilk 100 karakter):', content.substring(0, 100) + '...');
            console.log('=== OpenAI İstek Sonu ===\n');

            return content;
        } catch (error: any) {
            console.error('\n=== OpenAI Hata Raporu ===');
            console.error('❌ Hata Tipi:', error.name);
            console.error('❌ Hata Mesajı:', error.message);
            
            if (error.response) {
                console.error('📡 API Yanıt Detayları:', {
                    status: error.response.status,
                    statusText: error.response.statusText,
                    data: error.response.data
                });
            }

            console.error('🔍 Stack Trace:', error.stack);
            console.error('=== Hata Raporu Sonu ===\n');
            
            throw new Error(`OpenAI API Hatası: ${error.message}`);
        }
    }
}

export default new OpenAIService(); 