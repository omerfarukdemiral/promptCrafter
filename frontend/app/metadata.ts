import { Metadata } from 'next';

const defaultMetadata: Metadata = {
  title: 'Prompt Crafter - Web ve Mobil Geliştirme Prompt Asistanı',
  description:
    'Web ve mobil geliştirme süreçlerinizi hızlandıran akıllı prompt asistanı. Teknoloji seçimlerinize özel, optimize edilmiş promptlar oluşturun.',
  keywords: [
    'prompt',
    'web geliştirme',
    'mobil geliştirme',
    'yazılım geliştirme',
    'teknoloji seçimi',
    'prompt asistanı',
  ],
  authors: [{ name: 'Prompt Crafter Team' }],
  creator: 'Prompt Crafter',
  publisher: 'Prompt Crafter',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://promptcrafter.com',
    siteName: 'Prompt Crafter',
    title: 'Prompt Crafter - Web ve Mobil Geliştirme Prompt Asistanı',
    description:
      'Web ve mobil geliştirme süreçlerinizi hızlandıran akıllı prompt asistanı.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prompt Crafter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Crafter - Web ve Mobil Geliştirme Prompt Asistanı',
    description:
      'Web ve mobil geliştirme süreçlerinizi hızlandıran akıllı prompt asistanı.',
    images: ['/twitter-image.png'],
    creator: '@promptcrafter',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#111827',
};

export default defaultMetadata; 