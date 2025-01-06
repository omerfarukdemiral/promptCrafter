'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

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

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Progress Steps */}
      <div className="flex justify-between mb-8">
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
                  className={`h-full ${index + 1 < currentStep ? 'bg-blue-600' : ''}`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step Title */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {steps[currentStep - 1].title}
        </h2>
        <p className="text-gray-600">
          {steps[currentStep - 1].description}
        </p>
      </div>

      {/* Form Content */}
      <div className="min-h-[300px]">
        {/* Form içeriği buraya gelecek */}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          className={`
            px-6 py-2 rounded-lg font-medium
            ${currentStep === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
          `}
          disabled={currentStep === 1}
        >
          Geri
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium 
                   hover:bg-blue-700 flex items-center"
        >
          {currentStep === 4 ? 'Tamamla' : 'İleri'}
          {currentStep < 4 && <ChevronRight className="ml-2 w-4 h-4" />}
        </button>
      </div>
    </div>
  );
} 