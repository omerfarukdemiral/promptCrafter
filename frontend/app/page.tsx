import Link from 'next/link';
import { Terminal, List } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="mb-8 flex justify-center">
          <Terminal className="h-16 w-16 text-green-500" />
        </div>
        
        <h1 className="mb-4 font-mono text-5xl font-bold text-white">
          Prompt Crafter
        </h1>
        
        <p className="mb-2 font-mono text-xl text-gray-400">
          Web ve mobil geliştirme süreçlerinizi hızlandıran akıllı prompt asistanı.
        </p>
        
        <p className="mb-8 font-mono text-lg text-gray-500">
          Teknoloji seçimlerinize özel, optimize edilmiş promptlar oluşturun.
        </p>
        
        <div className="mb-12">
          <h2 className="font-mono text-2xl font-semibold text-green-500">
            Kod. Düşün. Üret.
          </h2>
        </div>
        
        <div className="flex justify-center space-x-4">
          <Link
            href="/create"
            className="inline-flex items-center rounded-lg bg-green-600 px-6 py-3 font-mono text-lg font-semibold text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Prompt Oluştur
            <Terminal className="ml-2 h-5 w-5" />
          </Link>

          <Link
            href="/prompts"
            className="inline-flex items-center rounded-lg border-2 border-green-600 px-6 py-3 font-mono text-lg font-semibold text-white transition-colors hover:bg-green-600/20 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Promptları Gör
            <List className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  );
} 