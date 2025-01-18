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
      console.log('Proje detayları:', response.data);
      
      if (response.data && response.data.data) {
        setProject(response.data.data);
      } else {
        console.error('Geçersiz API yanıtı:', response.data);
        toast.error('Proje verisi alınamadı');
      }
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
        console.error('Geçerli bir Project ID bulunamadı:', projectId);
        setPromptError(true);
        setPromptLoading(false);
        return;
      }

      setPromptLoading(true);
      setPromptError(false);
      
      console.log('Prompt talimatları getiriliyor:', { projectId });
      const response = await projectService.getPromptByProjectId(projectId);
      console.log('Prompt yanıtı:', response.data);

      if (response.data && response.data.data && response.data.data.instructions) {
        console.log('Prompt talimatları başarıyla alındı');
        setPromptInstructions(response.data.data.instructions);
      } else {
        console.warn('Prompt bulunamadı veya talimatlar eksik:', response.data);
        setPromptError(true);
      }
    } catch (error: any) {
      console.error('Prompt getirme hatası:', {
        error: error.message,
        projectId,
        status: error.response?.status
      });
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
      console.log('Prompt oluşturma başlatıldı:', {
        projectId: project._id,
        platform: project.platform,
        description: project.description
      });

      // Teknoloji haritasını oluştur
      const technologiesMap = project.technologies.reduce((acc: { [key: string]: string }, tech) => {
        if (tech.category && tech.name) {
          console.log('Teknoloji ekleniyor:', { category: tech.category, name: tech.name });
          acc[tech.category.replace(/\s+/g, '')] = tech.name;
        }
        return acc;
      }, {});

      console.log('Oluşturulan teknoloji haritası:', technologiesMap);

      const promptData = {
        projectId: project._id,
        platform: project.platform,
        technologies: technologiesMap,
        projectDetails: project.description
      };

      console.log('Prompt isteği gönderiliyor:', promptData);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5678/api';
      const response = await fetch(`${API_URL}/prompts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(promptData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Hata Yanıtı:', errorData);
        throw new Error(errorData.message || 'Prompt oluşturulurken bir hata oluştu');
      }

      const data = await response.json();
      console.log('API başarılı yanıt:', data);

      toast.success('Prompt başarıyla oluşturuldu!');
      await fetchPromptInstructions(); // Yeni oluşturulan prompt'u getir
    } catch (error: any) {
      console.error('Prompt oluşturma hatası:', {
        error: error.message,
        project: {
          id: project._id,
          platform: project.platform
        }
      });
      toast.error(error.message || 'Prompt oluşturulurken bir hata oluştu');
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
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sol Sütun - Proje Detayları */}
          <div className="space-y-6">
            {/* Proje Başlığı ve Temel Bilgiler */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-blue-500/20 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">{project?.projectName}</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="text-gray-400">
                    <span className="text-blue-400 block">Platform</span>
                    {project?.platform === 'web' ? 'Web Uygulaması' : 'Mobil Uygulama'}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-blue-400 block">Oluşturulma</span>
                    {project?.createdAt ? new Date(project.createdAt).toLocaleDateString('tr-TR') : '-'}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-400">
                    <span className="text-blue-400 block">E-posta</span>
                    {project?.email}
                  </p>
                  <p className="text-gray-400">
                    <span className="text-blue-400 block">Durum</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Aktif
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Proje Detayları ve Modüller */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-blue-500/20 p-6">
              {/* Proje Açıklaması */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Proje Detayları</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{project?.description}</p>
              </div>

              {/* Ayırıcı Çizgi */}
              <div className="border-t border-white/10 my-6"></div>

              {/* Modüller */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Proje Modülleri</h3>
                <div className="grid grid-cols-2 gap-3">
                  {project?.modules && project.modules.length > 0 ? (
                    project.modules.map((module, index) => (
                      <div 
                        key={index}
                        className="bg-white/5 p-2.5 rounded-lg text-gray-300 text-sm"
                      >
                        {module}
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center text-gray-400 text-sm">
                      Henüz modül seçilmemiş
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Teknolojiler */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-blue-500/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Kullanılan Teknolojiler</h3>
              <div className="grid grid-cols-2 gap-3">
                {project?.technologies && project.technologies.length > 0 ? (
                  project.technologies.map((tech) => (
                    <div 
                      key={tech._id} 
                      className="flex items-center gap-3 bg-white/5 p-2.5 rounded-lg"
                    >
                      <img 
                        src={tech.icon} 
                        alt={tech.name} 
                        className="w-7 h-7 object-contain"
                      />
                      <div>
                        <p className="text-white text-sm font-medium">{tech.name}</p>
                        <p className="text-gray-400 text-xs">{tech.category}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400 text-sm">
                    Henüz teknoloji seçilmemiş
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sağ Sütun - Prompt */}
          <div className="relative">
            {/* Prompt Bölümü */}
            <div className="sticky top-6 bg-white/5 backdrop-blur-lg rounded-xl border border-blue-500/20">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Proje Talimatları</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-md transition-colors text-white"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                          <span>Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Kopyala</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs bg-white/5 hover:bg-white/10 rounded-md transition-colors text-white"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>İndir</span>
                    </button>
                  </div>
                </div>

                {!promptInstructions && !promptLoading && (
                  <div className="mb-4">
                    <button
                      onClick={handleGeneratePrompt}
                      disabled={isGeneratingPrompt}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors ${
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
                  </div>
                )}

                <div className="h-[calc(100vh-200px)] overflow-auto rounded-lg bg-black p-4">
                  {promptLoading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500" />
                    </div>
                  ) : promptError ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                      <p className="text-sm mb-2">Prompt henüz oluşturulmamış</p>
                      <p className="text-xs">Lütfen "Prompt Oluştur" butonunu kullanın</p>
                    </div>
                  ) : (
                    <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                      {promptInstructions || generateInstructions(project)}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 