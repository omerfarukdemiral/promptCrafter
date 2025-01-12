'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Step {
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    title: 'Hizmet Seçimi',
    description: 'İhtiyacınız olan hizmeti seçin'
  },
  {
    title: 'Detaylar',
    description: 'Proje detaylarını belirtin'
  },
  {
    title: 'Teknolojiler',
    description: 'Kullanılacak teknolojileri seçin'
  },
  {
    title: 'Onay',
    description: 'Seçimlerinizi gözden geçirin'
  }
];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleBack = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const handleSelection = () => {
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
    }, 300);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      {/* Progress Steps */}
      <div className="flex justify-between p-8">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-full 
              ${index + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-300'}
              text-white font-bold
            `}>
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 bg-gray-300">
                <div 
                  className={`h-full ${index + 1 < currentStep ? 'bg-blue-200' : ''}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="px-8 pb-8">
        {/* Header with Back Button and Title */}
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className={`
              group flex items-center space-x-2 px-4
              ${currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:text-gray-900'}
            `}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Geri</span>
          </button>
          <div className="flex-1 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="min-h-[300px]">
          {/* Örnek seçim kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <button
                key={item}
                onClick={handleSelection}
                className="group relative h-[200px] rounded-2xl border-10 border-red-100 text-gray-800 overflow-hidden hover:border-white hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute inset-0 w-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="relative flex flex-col items-center justify-center h-full space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-medium group-hover:text-blue-600 transition-colors mb-2">
                      Seçenek {item}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                      Açıklama metni
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 