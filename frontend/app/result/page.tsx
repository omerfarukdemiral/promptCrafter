'use client';

import { useState, useEffect } from 'react';
import { Copy, Download, CheckCircle2, FileText, Code2, Rocket, Sparkles } from 'lucide-react';
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
  const [promptLoading, setPromptLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [promptInstructions, setPromptInstructions] = useState<string>('');
  const [promptError, setPromptError] = useState<boolean>(false);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

  useEffect(() => {
    if (projectId && projectId !== 'undefined') {
      fetchProject();
      fetchPromptInstructions();
    }
  }, [projectId]);

  const fetchProject = async () => {
    try {
      if (!projectId || projectId === 'undefined') {
        console.error('Geçerli bir Project ID bulunamadı');
        toast.error('Proje ID bulunamadı');
        setLoading(false);
        return;
      }

      setLoading(true);
      const response = await projectService.getById(projectId);
      setProject(response.data);
    } catch (error: any) {
      console.error('Proje yüklenirken hata:', error.message);
      if (error.response?.status === 404) {
        toast.error('Proje bulunamadı');
      } else {
        toast.error('Proje yüklenirken bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchPromptInstructions = async () => {
    try {
      if (!projectId || projectId === 'undefined') {
        console.error('Geçerli bir Project ID bulunamadı');
        setPromptError(true);
        setPromptLoading(false);
        return;
      }

      setPromptLoading(true);
      setPromptError(false);
      
      const response = await projectService.getPromptByProjectId(projectId);
      console.log('Prompt Response:', response);

      if (response.data && response.data.instructions) {
        setPromptInstructions(response.data.instructions);
      } else {
        console.log('Prompt bulunamadı, varsayılan şablon kullanılacak');
        setPromptError(true);
      }
    } catch (error: any) {
      console.error('Prompt yüklenirken hata:', error);
      setPromptError(true);
      if (error.response?.status === 404) {
        toast.error('Bu proje için prompt bulunamadı');
      } else {
        toast.error('Prompt yüklenirken bir hata oluştu');
      }
    } finally {
      setPromptLoading(false);
    }
  };

  const generateInstructions = (project: Project | null) => {
    if (!project) {
      return '';
    }

    return `# ${project.projectName} - Proje Kurulum ve Kullanım Kılavuzu

## 🚀 Proje Fikri
**Proje Adı:** ${project.projectName}
**Açıklama:** ${project.description}

## 🛠️ Seçilen Teknolojiler
${project.technologies?.map(tech => `- ${tech.name}`).join('\n') || 'Teknoloji seçilmedi'}

## 📦 Temel Modüller
${project.modules?.map(module => `- ${module}`).join('\n') || 'Modül seçilmedi'}

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

  const handleGeneratePrompt = async () => {
    if (!project || isGeneratingPrompt) return;

    try {
      setIsGeneratingPrompt(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5678/api';

      const technologiesMap = project.technologies.reduce((acc: { [key: string]: string }, curr) => {
        if (curr.category && curr.name) {
          acc[curr.category] = curr.name;
        }
        return acc;
      }, {});

      const response = await fetch(`${API_URL}/prompts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: project._id,
          platform: project.platform,
          technologies: technologiesMap,
          projectDetails: project.description
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Prompt oluşturulurken bir hata oluştu');
      }

      toast.success('Prompt başarıyla oluşturuldu!');
      await fetchPromptInstructions(); // Yeni oluşturulan prompt'u getir
    } catch (error: any) {
      console.error('Prompt oluşturulurken hata:', error);
      toast.error(error.message);
    } finally {
      setIsGeneratingPrompt(false);
    }
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
                <div className="flex justify-end">
                  {!promptInstructions && !promptLoading && (
                    <button
                      onClick={handleGeneratePrompt}
                      disabled={isGeneratingPrompt}
                      className={`flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors ${
                        isGeneratingPrompt ? 'opacity-75 cursor-not-allowed' : ''
                      }`}
                    >
                      {isGeneratingPrompt ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                          <span>Prompt Oluşturuluyor...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Prompt Oluştur</span>
                        </>
                      )}
                    </button>
                  )}
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
                {promptLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
                  </div>
                ) : promptError ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <p className="text-lg mb-2">Prompt henüz oluşturulmamış</p>
                    <p className="text-sm">Varsayılan şablon kullanılıyor</p>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                    {promptInstructions || generateInstructions(project)}
                  </pre>
                )}
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