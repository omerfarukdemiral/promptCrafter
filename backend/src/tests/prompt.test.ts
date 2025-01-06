import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Prompt from '../models/Prompt';

describe('Prompt API Tests', () => {
  beforeAll(async () => {
    // Test veritabanına bağlan
    await mongoose.connect(process.env.MONGODB_URI as string);
  });

  afterAll(async () => {
    // Test veritabanını temizle ve bağlantıyı kapat
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Her testten önce koleksiyonu temizle
    await Prompt.deleteMany({});
  });

  describe('POST /api/prompts', () => {
    it('geçerli veri ile prompt oluşturabilmeli', async () => {
      const promptData = {
        platform: 'web',
        technologies: {
          frontend: ['React', 'TypeScript'],
          backend: ['Node.js', 'Express'],
        },
        projectDetails: 'Test projesi',
      };

      const response = await request(app)
        .post('/api/prompts')
        .send(promptData)
        .expect(200);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.platform).toBe(promptData.platform);
      expect(response.body.projectDetails).toBe(promptData.projectDetails);
    });

    it('geçersiz veri ile prompt oluşturmamalı', async () => {
      const invalidData = {
        platform: 'invalid',
        technologies: {},
        projectDetails: '',
      };

      const response = await request(app)
        .post('/api/prompts')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('GET /api/prompts', () => {
    it('tüm promptları listeleyebilmeli', async () => {
      // Test verisi oluştur
      const promptData = {
        platform: 'web',
        technologies: {
          frontend: ['React'],
        },
        projectDetails: 'Test projesi',
      };

      await Prompt.create(promptData);

      const response = await request(app)
        .get('/api/prompts')
        .expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(1);
      expect(response.body[0].platform).toBe(promptData.platform);
    });
  });

  describe('GET /api/prompts/:id', () => {
    it('var olan prompt\'u ID ile getirebilmeli', async () => {
      const prompt = await Prompt.create({
        platform: 'mobile',
        technologies: {
          mobile: ['React Native'],
        },
        projectDetails: 'Mobile test projesi',
      });

      const response = await request(app)
        .get(`/api/prompts/${prompt._id}`)
        .expect(200);

      expect(response.body._id).toBe(prompt._id.toString());
      expect(response.body.platform).toBe(prompt.platform);
    });

    it('var olmayan prompt için 404 dönmeli', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .get(`/api/prompts/${fakeId}`)
        .expect(404);
    });
  });
}); 