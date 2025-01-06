import { Metadata } from 'next';
import MultiStepForm from '@/components/MultiStepForm';

export const metadata: Metadata = {
  title: 'Prompt Oluştur | Prompt Crafter',
  description: 'Teknoloji seçimlerinize özel promptlar oluşturun.',
};

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="mb-8 font-mono text-3xl font-bold text-white">
          Prompt Oluştur
        </h1>
        <MultiStepForm />
      </div>
    </main>
  );
} 