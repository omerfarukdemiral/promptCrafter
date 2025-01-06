'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { getPrompts } from '@/store/promptSlice';
import { Terminal, Code2, Smartphone } from 'lucide-react';
import { Prompt } from '@/types/prompt';

export default function PromptsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { prompts, loading, error } = useSelector((state: RootState) => state.prompt);

  useEffect(() => {
    dispatch(getPrompts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Terminal className="mx-auto mb-4 h-12 w-12 animate-spin text-green-500" />
          <p className="font-mono text-white">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="font-mono text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="mb-8 font-mono text-3xl font-bold text-white">
          Oluşturulan Promptlar
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt: Prompt) => (
            <div
              key={prompt._id}
              className="rounded-lg bg-gray-800 p-6 shadow-xl transition-transform hover:scale-105"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {prompt.platform === 'web' ? (
                    <Code2 className="h-6 w-6 text-green-500" />
                  ) : (
                    <Smartphone className="h-6 w-6 text-green-500" />
                  )}
                  <span className="font-mono text-lg font-semibold text-white">
                    {prompt.platform === 'web' ? 'Web Projesi' : 'Mobil Proje'}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {new Date(prompt.createdAt).toLocaleDateString('tr-TR')}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 font-mono text-sm font-medium text-gray-400">
                  Seçilen Teknolojiler
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(prompt.technologies).map(([category, techs]) => (
                    <div key={category}>
                      {techs.map((tech: string) => (
                        <span
                          key={tech}
                          className="mr-2 mb-2 inline-block rounded-full bg-green-600/20 px-3 py-1 text-sm font-mono text-green-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-mono text-sm font-medium text-gray-400">
                  Proje Detayları
                </h3>
                <p className="font-mono text-sm text-white">{prompt.projectDetails}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 