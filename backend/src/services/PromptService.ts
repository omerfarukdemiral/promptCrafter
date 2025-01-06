import BaseService from './BaseService';
import Prompt from '../models/Prompt';
import { Document } from 'mongoose';

interface IPrompt extends Document {
  platform: 'web' | 'mobile';
  technologies: Record<string, string[]>;
  projectDetails: string;
  createdAt: Date;
}

class PromptService extends BaseService<IPrompt> {
  constructor() {
    super(Prompt);
  }

  // Özel servis metodları buraya eklenebilir
}

export default new PromptService(); 