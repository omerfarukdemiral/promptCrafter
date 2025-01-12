import type { Metadata } from 'next';
import { Fira_Code } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import ErrorBoundary from '@/components/ErrorBoundary';
import defaultMetadata from './metadata';
import { Toaster } from 'react-hot-toast';

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});

export const metadata = {
  title: 'PromptCrafter - AI Prompt Assistant',
  description: 'Web ve mobil geliştirme süreçlerinizi hızlandıran akıllı prompt asistanı.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${firaCode.variable} antialiased`}>
        <Toaster position="top-right" />
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
} 