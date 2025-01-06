'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { ChevronRight, Code2, Smartphone } from 'lucide-react';
import { AppDispatch } from '@/store';
import { createPrompt } from '@/store/promptSlice';
import TechnologySelection from './TechnologySelection';

const steps = [
  {
    id: 'platform',
    title: 'Platform Seçimi',
    description: 'Geliştirme yapacağınız platformu seçin',
  },
  {
    id: 'technologies',
    title: 'Teknoloji Seçimi',
    description: 'Kullanmak istediğiniz teknolojileri seçin',
  },
  {
    id: 'project',
    title: 'Proje Detayları',
    description: 'Projenizin detaylarını girin',
  },
];

export default function PromptForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [currentStep, setCurrentStep] = useState(0);
  const [platform, setPlatform] = useState<'web' | 'mobile' | null>(null);
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [projectDetails, setProjectDetails] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 0:
        if (!platform) {
          newErrors.platform = 'Lütfen bir platform seçin';
        }
        break;
      case 1:
        if (Object.keys(selections).length === 0) {
          newErrors.technologies = 'En az bir teknoloji seçmelisiniz';
        }
        break;
      case 2:
        if (!projectDetails.trim()) {
          newErrors.projectDetails = 'Proje detaylarını girmelisiniz';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTechnologyComplete = (techSelections: Record<string, string[]>) => {
    setSelections(techSelections);
    if (Object.keys(techSelections).length > 0) {
      setCurrentStep(2);
    } else {
      setErrors({ technologies: 'En az bir teknoloji seçmelisiniz' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      await dispatch(
        createPrompt({
          platform: platform!,
          technologies: selections,
          projectDetails,
        })
      ).unwrap();

      router.push('/prompts');
    } catch (error) {
      setErrors({
        submit: 'Prompt oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.',
      });
    }
  };

  return (
    <div className="rounded-lg bg-gray-800 p-6 shadow-xl">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full font-mono ${
                  index <= currentStep
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <ChevronRight
                  className={`mx-4 h-5 w-5 ${
                    index < currentStep ? 'text-green-600' : 'text-gray-600'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h2 className="font-mono text-xl font-semibold text-white">
            {steps[currentStep].title}
          </h2>
          <p className="font-mono text-sm text-gray-400">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Platform Selection */}
      {currentStep === 0 && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                setPlatform('web');
                if (validateStep()) setCurrentStep(1);
              }}
              className={`flex flex-col items-center rounded-lg border-2 p-6 transition-colors ${
                platform === 'web'
                  ? 'border-green-500 bg-green-600/20'
                  : 'border-gray-700 bg-gray-700/50 hover:border-green-500/50'
              }`}
            >
              <Code2 className="mb-4 h-12 w-12 text-green-500" />
              <span className="font-mono text-lg font-semibold text-white">
                Web Geliştirme
              </span>
            </button>
            <button
              onClick={() => {
                setPlatform('mobile');
                if (validateStep()) setCurrentStep(1);
              }}
              className={`flex flex-col items-center rounded-lg border-2 p-6 transition-colors ${
                platform === 'mobile'
                  ? 'border-green-500 bg-green-600/20'
                  : 'border-gray-700 bg-gray-700/50 hover:border-green-500/50'
              }`}
            >
              <Smartphone className="mb-4 h-12 w-12 text-green-500" />
              <span className="font-mono text-lg font-semibold text-white">
                Mobil Geliştirme
              </span>
            </button>
          </div>
          {errors.platform && (
            <p className="mt-2 font-mono text-sm text-red-500">{errors.platform}</p>
          )}
        </>
      )}

      {/* Technology Selection */}
      {currentStep === 1 && platform && (
        <>
          <TechnologySelection
            platform={platform}
            onComplete={handleTechnologyComplete}
          />
          {errors.technologies && (
            <p className="mt-2 font-mono text-sm text-red-500">
              {errors.technologies}
            </p>
          )}
        </>
      )}

      {/* Project Details */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div>
            <label
              htmlFor="projectDetails"
              className="mb-2 block font-mono text-sm font-medium text-white"
            >
              Proje Fikriniz
            </label>
            <textarea
              id="projectDetails"
              rows={4}
              className={`w-full rounded-lg border ${
                errors.projectDetails
                  ? 'border-red-500'
                  : 'border-gray-700'
              } bg-gray-700/50 p-4 font-mono text-white placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500`}
              placeholder="Projenizi kısaca açıklayın..."
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
            />
            {errors.projectDetails && (
              <p className="mt-2 font-mono text-sm text-red-500">
                {errors.projectDetails}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-green-600 px-6 py-3 font-mono font-semibold text-white transition-colors hover:bg-green-700"
            >
              Prompt Oluştur
            </button>
          </div>
          {errors.submit && (
            <p className="mt-2 text-center font-mono text-sm text-red-500">
              {errors.submit}
            </p>
          )}
        </div>
      )}
    </div>
  );
} 