'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { webTechnologies, mobileTechnologies } from '@/data/technologies';

interface Technology {
  icon?: string;
  description?: string;
}

interface TechnologyGroup {
  description: string;
  technologies: {
    [key: string]: Technology | string[] | { [key: string]: Technology };
  };
}

interface Phase {
  description: string;
  technologies: TechnologyGroup['technologies'];
}

interface TechnologySelectionProps {
  platform: 'web' | 'mobile';
  onComplete: (selections: Record<string, string[]>) => void;
}

export default function TechnologySelection({
  platform,
  onComplete,
}: TechnologySelectionProps) {
  const [selections, setSelections] = useState<Record<string, string[]>>({});

  const handleSelection = (phase: string, tech: string) => {
    setSelections((prev) => ({
      ...prev,
      [phase]: prev[phase]
        ? prev[phase].includes(tech)
          ? prev[phase].filter((t) => t !== tech)
          : [...prev[phase], tech]
        : [tech],
    }));
  };

  const renderTechnologyGroup = (
    phase: string,
    group: TechnologyGroup['technologies']
  ) => {
    return Object.entries(group).map(([category, technologies]) => (
      <div key={category} className="mb-6">
        <h3 className="mb-3 font-mono text-lg font-semibold text-green-500">
          {category}
        </h3>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {Array.isArray(technologies)
            ? technologies.map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleSelection(phase, tech)}
                  className={`flex items-center justify-between rounded-lg border-2 p-4 transition-colors ${
                    selections[phase]?.includes(tech)
                      ? 'border-green-500 bg-green-600/20'
                      : 'border-gray-700 bg-gray-700/50 hover:border-green-500/50'
                  }`}
                >
                  <span className="font-mono text-white">{tech}</span>
                  {selections[phase]?.includes(tech) && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </button>
              ))
            : Object.entries(technologies).map(([name, details]) => (
                <button
                  key={name}
                  onClick={() => handleSelection(phase, name)}
                  className={`flex items-center justify-between rounded-lg border-2 p-4 transition-colors ${
                    selections[phase]?.includes(name)
                      ? 'border-green-500 bg-green-600/20'
                      : 'border-gray-700 bg-gray-700/50 hover:border-green-500/50'
                  }`}
                >
                  <div>
                    <span className="block font-mono text-white">{name}</span>
                    {typeof details === 'object' && 'description' in details && (
                      <span className="mt-1 block text-sm text-gray-400">
                        {details.description}
                      </span>
                    )}
                  </div>
                  {selections[phase]?.includes(name) && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </button>
              ))}
        </div>
      </div>
    ));
  };

  const phases = platform === 'web'
    ? webTechnologies.WebDevelopment.phases
    : mobileTechnologies.MobileDevelopment.phases;

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {Object.entries(phases).map(([phaseName, phase]) => (
          <div key={phaseName} className="rounded-lg bg-gray-700/50 p-6">
            <h2 className="mb-2 font-mono text-xl font-bold text-white">
              {phaseName}
            </h2>
            <p className="mb-4 font-mono text-sm text-gray-400">
              {phase.description}
            </p>
            {renderTechnologyGroup(phaseName, phase.technologies)}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => onComplete(selections)}
          className="rounded-lg bg-green-600 px-6 py-3 font-mono font-semibold text-white transition-colors hover:bg-green-700"
        >
          Devam Et
        </button>
      </div>
    </div>
  );
} 