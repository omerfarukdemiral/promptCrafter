import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
});

export interface CreatePromptData {
  platform: 'web' | 'mobile';
  technologies: Record<string, string[]>;
  projectDetails: string;
}

export interface Prompt extends CreatePromptData {
  _id: string;
  createdAt: string;
}

export const promptApi = {
  create: async (data: CreatePromptData) => {
    const response = await api.post<Prompt>('/prompts', data);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get<Prompt[]>('/prompts');
    return response.data;
  },

  getById: async (id: string) => {
    const response = await api.get<Prompt>(`/prompts/${id}`);
    return response.data;
  },
}; 