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
  getById: async (id: string) => {
    const response = await axios.get(`${API_URL}/projects/${id}`);
    return response;
  },
  update: (id: string, data: any) => api.put(`/projects/${id}`, data),
  delete: (id: string) => api.delete(`/projects/${id}`),
  getPromptByProjectId: (projectId: string) => api.get(`/prompts/project/${projectId}`)
};

export const promptApi = {
  getByProjectId: async (projectId: string) => {
    const response = await axios.get(`${API_URL}/prompts/${projectId}`);
    return response;
  },
  create: async (data: any) => {
    const response = await axios.post(`${API_URL}/prompts`, data);
    return response;
  }
};

export default api; 