'use client';

import { useState, useEffect } from 'react';
import { Copy, Download, CheckCircle2, FileText, Code2, Rocket } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
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
  email: string;
  platform: 'web' | 'mobile';
  technologies: Technology[];
  modules: string[];
  createdAt: string;
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await projectService.getById(projectId as string);
      setProject(response.data);
    } catch (error) {
      console.error('Proje yüklenirken hata:', error);
      toast.error('Proje yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const generateInstructions = (project: Project) => {
    return `# ${project.projectName} - Proje Kurulum ve Kullanım Kılavuzu

## 🚀 Proje Fikri
**Proje Adı:** ${project.projectName}
**Açıklama:** ${project.description}

## 🛠️ Seçilen Teknolojiler
${project.technologies.map(tech => `- ${tech.name}`).join('\n')}

## 📦 Temel Modüller
${project.modules.map(module => `- ${module}`).join('\n')}

## 🔧 Kurulum Adımları
1. Projeyi klonlayın
2. Bağımlılıkları yükleyin
3. Ortam değişkenlerini ayarlayın
4. Geliştirme sunucusunu başlatın`;
  };

  const handleCopy = () => {
    if (!project) return;
    navigator.clipboard.writeText(generateInstructions(project));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!project) return;
    const instructions = generateInstructions(project);
    const blob = new Blob([instructions], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.projectName.toLowerCase().replace(/\s+/g, '-')}-instructions.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const steps = [
    {
      icon: FileText,
      title: 'Dökümanı İncele',
      description: 'Oluşturulan prompt ve kurulum talimatlarını detaylıca inceleyin'
    },
    {
      icon: Code2,
      title: 'Projeyi Başlat',
      description: 'Verilen komutları kullanarak geliştirme ortamını hazırlayın'
    },
    {
      icon: Rocket,
      title: 'Geliştirmeye Başla',
      description: 'Belirlenen teknolojiler ile projenizi geliştirmeye başlayın'
    }
  ];

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <Header />
        <div className="flex justify-center items-center h-[calc(100vh-80px)]">
          <div className="text-white text-xl">Proje bulunamadı</div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <Header />
      <div className="flex-1 flex items-start justify-center px-4 py-6">
        <div className="w-full max-w-5xl">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-blue-500/20 overflow-hidden">
            {/* Üst Bilgi */}
            <div className="border-b border-white/10 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{project.projectName}</h2>
                  <p className="text-gray-400">{project.email}</p>
                </div>
              </div>
            </div>

            {/* Prompt Metni */}
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Proje Talimatları</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 rounded-md transition-colors text-white"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Kopyala</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 rounded-md transition-colors text-white"
                  >
                    <Download className="w-4 h-4" />
                    <span>İndir</span>
                  </button>
                </div>
              </div>
              <div className="h-[50vh] overflow-auto rounded-lg bg-black p-4">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                  {generateInstructions(project)}
                </pre>
              </div>
            </div>

            {/* Adımlar */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Cursor'da Nasıl Kullanılır?</h3>
              <div className="space-y-6 bg-black/20 rounded-xl p-6">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{step.title}</h4>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 