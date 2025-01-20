import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5678/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

export const projectService = {
  create: (data: any) => api.post('/projects', data),
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  getPromptByProjectId: (projectId: string) => api.get(`/prompts/project/${projectId}`),
  baseURL: API_URL
};

export const promptApi = {
  getByProjectId: (projectId: string) => api.get(`/prompts/${projectId}`),
  create: (data: any) => api.post('/prompts', data)
};

export default api; 