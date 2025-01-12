import { Terminal, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-8 py-4 border-b border-white/10">
      <Link href="/" className="group flex items-center space-x-2 transition-transform hover:scale-105">
        <div className="relative">
          <Terminal className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          <div className="absolute -right-1 -top-1">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500" />
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Prompt Crafter</h1>
      </Link>
    </div>
  );
} 