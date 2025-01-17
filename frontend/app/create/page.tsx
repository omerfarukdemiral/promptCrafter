'use client';

import React from 'react';
import {
  Terminal, Sparkles, Globe, Smartphone, ArrowLeft, Check,
  Code2, Palette, Database, Box, Lock, TestTube, Cloud, Layers, 
  Navigation, BarChart, GitBranch, Smartphone as PhoneIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { webSteps, mobileSteps } from './steps';
import { toast } from 'react-hot-toast';
import Header from '@/components/Header';

interface Selection {
  stepId: number;
  optionId: string;
  optionName: string;
}

interface ProjectDetails {
  title: string;
  description: string;
  modules: string[];
  features: string[];
  targetAudience: string;
}

// Adım başlıkları için ikonları eşleştirme
const stepIcons: { [key: string]: any } = {
  'Frontend Framework': Code2,
  'UI Kütüphanesi': Palette,
  'State Yönetimi': Box,
  'Backend Teknolojisi': Database,
  'Veritabanı': Database,
  'ORM / ODM': Layers,
  'Authentication': Lock,
  'Testing': TestTube,
  'Deployment': Cloud,
  'Geliştirme Yaklaşımı': Code2,
  'Navigation': Navigation,
  'Backend Servisi': Database,
  'Offline Storage': Database,
  'Analytics': BarChart,
  'CI/CD': GitBranch
};

export default function CreatePrompt() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [platform, setPlatform] = useState<'web' | 'mobile' | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selections, setSelections] = useState<Selection[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [newModule, setNewModule] = useState('');
  const [modules, setModules] = useState<string[]>(['Kullanıcı Yönetimi', 'Ürün Yönetimi', 'Sipariş Takibi']);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  
  const router = useRouter();

  const handleAddModule = () => {
    if (newModule.trim()) {
      setModules([...modules, newModule.trim()]);
      setNewModule('');
    }
  };

  const handleRemoveModule = (index: number) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    if (currentStep === 1 && !platform) {
      router.push('/');
    } else if (currentStep === 1 && platform) {
      setPlatform(null);
      setSelections([]);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePlatformSelect = (selected: 'web' | 'mobile') => {
    setPlatform(selected);
    setCurrentStep(1);
  };

  const handleOptionSelect = (stepId: number, optionId: string, optionName: string) => {
    setSelections(prev => {
      const newSelections = prev.filter(s => s.stepId !== stepId);
      const updatedSelections = [...newSelections, { stepId, optionId, optionName }];
      
      // Seçim yapıldıktan sonra sadece bir adım ilerle
      if (currentStep < steps.length) {
        setTimeout(() => setCurrentStep(currentStep + 1), 300);
      } else if (currentStep === steps.length) {
        setTimeout(() => setShowSummary(true), 300);
      }
      
      return updatedSelections;
    });
  };

  const handleProjectDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Form validasyonu
      if (!email.trim() || !projectName.trim() || !description.trim()) {
        throw new Error('Lütfen tüm gerekli alanları doldurun');
      }

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5678/api';

      // Teknolojileri doğru formatta hazırla
      const technologiesMap = selections.reduce((acc: { [key: string]: string }, curr) => {
        acc[curr.stepId.toString()] = curr.optionName;
        return acc;
      }, {});

      // Önce proje oluştur
      const projectResponse = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          projectName,
          description,
          modules,
          platform,
          technologies: selections.map(selection => ({
            stepId: selection.stepId,
            name: selection.optionName
          }))
        }),
      });

      const projectData = await projectResponse.json();

      if (!projectResponse.ok) {
        throw new Error(projectData.error || 'Proje oluşturulurken bir hata oluştu');
      }

      console.log('✅ Proje başarıyla oluşturuldu:', projectData);

      // Prompt oluştur
      const promptResponse = await fetch(`${API_URL}/prompts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: projectData._id,
          platform,
          technologies: technologiesMap, // Hazırladığımız map'i kullan
          projectDetails: description
        }),
      });

      const promptData = await promptResponse.json();

      if (!promptResponse.ok) {
        throw new Error(promptData.error || 'Prompt oluşturulurken bir hata oluştu');
      }

      console.log('✅ Prompt başarıyla oluşturuldu:', promptData);
      toast.success('Proje başarıyla oluşturuldu!');
      router.push(`/result?id=${projectData._id}`);

    } catch (error: any) {
      console.error('❌ Hata:', error);
      toast.error(error.message || 'Beklenmeyen bir hata oluştu');
      setError(error.message || 'Beklenmeyen bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = platform === 'web' ? webSteps : mobileSteps;
  const currentStepData = platform ? steps[currentStep - 1] : null;
  const isLastStep = platform && currentStep === steps.length;

  // Progress bar hesaplaması
  const progress = platform ? ((currentStep - 1) / steps.length) * 100 : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex flex-col">
      <Header />
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl mx-auto">

          {/* Selected Options Summary */}
          {selections.length > 0 && !showSummary && (
            <div className="mb-6 flex flex-wrap gap-3">
              {selections.map((selection, index) => (
                <div key={selection.stepId} className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-white">{selection.optionName}</span>
                </div>
              ))}
            </div>
          )}

          <div className={`bg-white/5 backdrop-blur-lg rounded-xl border border-blue-500/20 transition-all duration-700 ${
            isAnimated ? 'transform translate-y-0 opacity-100' : 'transform translate-y-10 opacity-0'
          }`}>
            {/* Progress Bar */}
            {platform && !showSummary && (
              <div className="h-2 w-full bg-gray-800 rounded-t-xl overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            <div className="p-8">
              {showSummary ? (
                // Özet ve Form Ekranı
                <div className="space-y-12">
                  {!showProjectForm ? (
                    <>
                      <div>
                        <h2 className="text-3xl font-semibold text-white text-center mb-8">Teknoloji Özeti</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {steps.map((step, index) => {
                            const selection = selections.find(s => s.stepId === step.id);
                            const StepIcon = stepIcons[step.title] || Box;
                            
                            return (
                              <div key={step.id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                                <div className="flex items-center space-x-3 mb-4">
                                  <StepIcon className="h-6 w-6 text-blue-400" />
                                  <h3 className="text-lg font-medium text-white">{step.title}</h3>
                                </div>
                                <p className="text-green-400 font-medium">{selection?.optionName}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <button
                          onClick={() => setShowProjectForm(true)}
                          className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                          <span className="flex items-center space-x-2">
                            <span>Proje Detaylarına Geç</span>
                            <ArrowLeft className="h-5 w-5 rotate-180 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </button>
                      </div>
                    </>
                  ) : (
                    <div>
                      <h2 className="text-3xl font-semibold text-white text-center mb-8">Proje Detayları</h2>
                      <form onSubmit={handleProjectDetailsSubmit} className="space-y-8">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-white mb-2">Email Adresi</label>
                            <input 
                              type="email"
                              className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white"
                              placeholder="Email adresinizi girin"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="block text-white mb-2">Proje İsmi</label>
                            <input 
                              type="text"
                              className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white"
                              placeholder="Projenizin ismini girin"
                              value={projectName}
                              onChange={(e) => setProjectName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="h-[400px]">
                            <label className="block text-white mb-2">Proje Açıklaması</label>
                            <textarea 
                              className="w-full h-[calc(100%-2rem)] bg-white/5 border border-white/10 rounded-lg p-4 text-white resize-none"
                              placeholder="Projenizi detaylı bir şekilde açıklayın..."
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="h-[400px]">
                            <label className="block text-white mb-2">Temel Modüller</label>
                            <div className="h-[calc(100%-2rem)] flex flex-col">
                              <div className="flex gap-2 mb-2">
                                <input 
                                  type="text"
                                  className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-white"
                                  placeholder="Yeni modül ekle"
                                  value={newModule}
                                  onChange={(e) => setNewModule(e.target.value)}
                                />
                                <button
                                  type="button"
                                  onClick={handleAddModule}
                                  className="px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                              <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-2 overflow-y-auto">
                                {modules.map((module, index) => (
                                  <div key={index} className="flex justify-between items-center p-2 hover:bg-white/5 rounded">
                                    <span className="text-white">{module}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveModule(index)}
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      ×
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {error && (
                          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                            <p className="text-red-500">{error}</p>
                          </div>
                        )}

                        <div className="flex justify-center pt-6">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white font-semibold text-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl ${
                              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                            }`}
                          >
                            <span className="flex items-center space-x-2">
                              {isSubmitting ? (
                                <>
                                  <span>Oluşturuluyor...</span>
                                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                </>
                              ) : (
                                <>
                                  <span>Prompt Oluştur</span>
                                  <Sparkles className="h-5 w-5 animate-pulse" />
                                </>
                              )}
                            </span>
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              ) : !platform ? (
                // Platform Seçim Ekranı
                <>
                  <h2 className="text-3xl font-semibold text-white text-center mb-12">Platform Seçimi</h2>
                  <div className="flex justify-center gap-16 px-8">
                    <button 
                      onClick={() => handlePlatformSelect('web')}
                      className="group relative w-[300px] h-[200px] rounded-2xl border-2 border-white/20 text-white overflow-hidden"
                    >
                      <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></div>
                      <div className="relative flex flex-col items-center justify-center h-full space-y-6">
                        <Globe className="h-20 w-20 group-hover:text-black transition-colors" />
                        <span className="text-xl font-medium group-hover:text-black transition-colors">Web Uygulaması</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => handlePlatformSelect('mobile')}
                      className="group relative w-[300px] h-[200px] rounded-2xl border-2 border-white/20 text-white overflow-hidden"
                    >
                      <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></div>
                      <div className="relative flex flex-col items-center justify-center h-full space-y-6">
                        <PhoneIcon className="h-20 w-20 group-hover:text-black transition-colors" />
                        <span className="text-xl font-medium group-hover:text-black transition-colors">Mobil Uygulama</span>
                      </div>
                    </button>
                  </div>
                </>
              ) : currentStepData ? (
                // Teknoloji Seçim Ekranı
                <>
                  <div className="relative w-full">
                    {/* Geri Dön Butonu - Absolute pozisyonla */}
                    <button 
                      onClick={handleBack}
                      className="absolute left-8 top-1/2 -translate-y-1/2 group flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
                    >
                      <ArrowLeft className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
                      <span>Geri Dön</span>
                    </button>

                    {/* Başlık - Merkeze hizalı */}
                    <div className="flex flex-col items-center justify-center mb-6">
                      <div className="flex items-center justify-center space-x-3">
                        {stepIcons[currentStepData.title] && (
                          <div className="text-blue-400">
                            {React.createElement(stepIcons[currentStepData.title], { size: 28 })}
                          </div>
                        )}
                        <h2 className="text-3xl font-semibold text-white">
                          {currentStepData.title}
                        </h2>
                      </div>
                      <p className="text-gray-400 text-center mt-4">{currentStepData.description}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    {currentStepData.options.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleOptionSelect(currentStepData.id, option.id, option.name)}
                        className={`group relative h-[200px] rounded-2xl border-2 ${
                          selections.find(s => s.stepId === currentStepData.id && s.optionId === option.id)
                            ? 'border-blue-500/50 bg-blue-500/10'
                            : 'border-white/20'
                        } text-white overflow-hidden hover:border-white/90 hover:bg-white/10 p-6 transition-all duration-300`}
                      >
                        <div className={`absolute inset-0 w-0 bg-white transition-all duration-300 ease-out ${
                          selections.find(s => s.stepId === currentStepData.id && s.optionId === option.id)
                            ? 'w-full opacity-5'
                            : 'group-hover:w-full opacity-0'
                        }`}></div>
                        <div className="relative flex flex-col items-center justify-center h-full space-y-4">
                          <div className="h-16 w-16 relative">
                            <Image
                              src={option.icon}
                              alt={option.name}
                              width={64}
                              height={64}
                              className="w-full h-full object-contain group-hover:filter-none transition-all"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="text-lg font-medium group-hover:text-white transition-colors mb-2">
                              {option.name}
                            </h3>
                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Step Progress */}
                  <div className="mt-8 flex justify-center">
                    <div className="flex items-center space-x-2">
                      {steps.map((step, index) => {
                        const isSelected = selections.some(s => s.stepId === step.id);
                        return (
                          <div
                            key={step.id}
                            className={`w-2 h-2 rounded-full transition-all ${
                              isSelected ? 'bg-green-500' : 
                              index === currentStep - 1 ? 'bg-blue-500' : 
                              'bg-white/20'
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 