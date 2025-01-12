'use client';

import Link from 'next/link';
import { Terminal, Sparkles, Code2, Rocket, List } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCreating(true);
    // Animasyon için biraz bekle
    setTimeout(() => {
      router.push('/create');
    }, 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl"></div>
        <div className="absolute right-0 top-1/2 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
        {/* Logo & Badge */}
        <div className={`flex flex-col items-center mb-8 space-y-4 transition-all duration-700 ${
          isCreating ? 'transform -translate-x-1/2' : ''
        }`}>
          <div className="relative">
            <Terminal className="h-16 w-16 text-white" />
            <div className="absolute -right-2 -top-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Hero Text */}
        <div className={`text-center max-w-3xl mx-auto space-y-6 mb-12 transition-all duration-700 ${
          isCreating ? 'transform -translate-y-[60vh]' : ''
        }`}>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Prompt Crafter
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Web ve mobil geliştirme süreçlerinizi hızlandıran akıllı prompt asistanı.
          </p>
          <p className="text-gray-500">
            Teknoloji seçimlerinize özel, optimize edilmiş promptlar oluşturun.
          </p>
        </div>

        {/* Feature Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl transition-all duration-500 ${
          isCreating ? 'opacity-0 transform translate-y-10' : ''
        }`}>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
            <Code2 className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Akıllı Kod Üretimi</h3>
            <p className="text-gray-400 text-sm">Yapay zeka destekli kod önerileri ve optimizasyonlar.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all">
            <Terminal className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Özel Promptlar</h3>
            <p className="text-gray-400 text-sm">Projenize özel optimize edilmiş prompt şablonları.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-green-500/50 transition-all">
            <Rocket className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Hızlı Geliştirme</h3>
            <p className="text-gray-400 text-sm">Geliştirme sürecinizi hızlandıran araçlar.</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 items-center transition-all duration-500 ${
          isCreating ? 'opacity-0 transform translate-y-10' : ''
        }`}>
          <button
            onClick={handleCreateClick}
            className="group relative px-8 py-3 border-2 border-white rounded-full overflow-hidden"
          >
            <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full"></div>
            <span className="relative flex items-center text-white group-hover:text-black transition-colors">
              Prompt Oluştur
              <Terminal className="ml-2 h-5 w-5" />
            </span>
          </button>

          <Link
            href="/prompts"
            className="group relative px-8 py-3 border-2 border-white/50 rounded-full overflow-hidden hover:border-white transition-colors"
          >
            <span className="relative flex items-center text-white/80 hover:text-white transition-colors">
              Promptları Gör
              <List className="ml-2 h-5 w-5" />
            </span>
          </Link>
        </div>

        {/* Sürüm Bilgisi */}
        <div className={`text-center mt-8 transition-all duration-500 ${
          isCreating ? 'opacity-0' : ''
        }`}>
          <span className="px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium text-white/80 backdrop-blur-sm">
            v1.0.0 Beta
          </span>
        </div>
      </div>
    </main>
  );
} 