'use client';

import { useState, useEffect } from 'react';
import { Terminal, Code2, Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { projectService } from '@/services/api';
import { toast } from 'react-hot-toast';
import Header from '@/components/Header';

interface Technology {
  _id: string;
  name: string;
  icon: string;
  category: string;
}

interface Project {
  _id: string;
  projectName: string;
  description: string;
  platform: 'web' | 'mobile';
  technologies: Technology[];
  createdAt: string;
}

export default function PromptsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getAll();
      if (response.data && Array.isArray(response.data.data)) {
        setProjects(response.data.data);
      } else {
        console.error('Beklenmeyen API yanıt formatı:', response.data);
        toast.error('Projeler yüklenirken bir hata oluştu');
      }
    } catch (error) {
      console.error('Projeler yüklenirken hata:', error);
      toast.error('Projeler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
            </div>
          ) : projects.length === 0 ? (
            <div className="col-span-3 flex justify-center items-center h-64">
              <p className="text-white text-xl">Henüz hiç proje oluşturulmamış</p>
            </div>
          ) : (
            projects.map((project) => (
              <Link
                key={project._id}
                href={`/result?id=${project._id}`}
                className="block group"
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6 transition-all duration-300 group-hover:border-purple-500/40 group-hover:transform group-hover:scale-[1.02]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">
                      {project.projectName}
                    </h2>
                    {project.platform === 'web' ? (
                      <Code2 className="h-5 w-5 text-blue-400" />
                    ) : (
                      <Smartphone className="h-5 w-5 text-green-400" />
                    )}
                  </div>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-500">Teknolojiler</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <div
                          key={tech._id}
                          className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-full"
                        >
                          <div className="relative w-4 h-4">
                            <Image
                              src={tech.icon}
                              alt={tech.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="text-xs text-gray-300">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="text-xs text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
} 