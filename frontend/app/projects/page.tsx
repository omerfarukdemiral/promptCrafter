'use client';

import React, { useEffect, useState } from 'react';
import { Terminal, Sparkles, Globe, Smartphone, ArrowRight, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';
import { toast } from 'react-hot-toast';

interface Project {
  _id: string;
  email: string;
  projectName: string;
  description: string;
  modules: string[];
  platform: 'web' | 'mobile';
  createdAt: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/projects');
      setProjects(response.data.data);
    } catch (error) {
      console.error('Projeler yüklenirken hata:', error);
      toast.error('Projeler yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Proje silinirken bir hata oluştu');
      }

      // Projeyi listeden kaldır
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Hata:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Terminal className="h-10 w-10 text-white" />
            <div className="absolute -right-1 -top-1">
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">Prompt Crafter</h1>
        </div>
        <button
          onClick={() => router.push('/create')}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Yeni Proje Oluştur
        </button>
      </div>

      {/* Projects List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-semibold text-white mb-8">Projelerim</h2>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">Henüz hiç proje oluşturmadınız.</p>
            <button
              onClick={() => router.push('/create')}
              className="mt-4 px-6 py-3 bg-white/5 rounded-full text-white hover:bg-white/10 transition-all duration-300"
            >
              İlk Projenizi Oluşturun
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white/5 rounded-xl border border-white/10 p-6 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    {project.platform === 'web' ? (
                      <Globe className="h-5 w-5 text-blue-400" />
                    ) : (
                      <Smartphone className="h-5 w-5 text-purple-400" />
                    )}
                    <h3 className="text-xl font-semibold text-white">{project.projectName}</h3>
                  </div>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                
                <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.modules.slice(0, 3).map((module, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300"
                    >
                      {module}
                    </span>
                  ))}
                  {project.modules.length > 3 && (
                    <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300">
                      +{project.modules.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-sm text-gray-400">
                    {new Date(project.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                  <button
                    onClick={() => router.push(`/result?id=${project._id}`)}
                    className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Detaylar</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 