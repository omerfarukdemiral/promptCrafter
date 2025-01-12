export interface TechnologyOption {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  options: TechnologyOption[];
}

// Web teknoloji adımları
export const webSteps: Step[] = [
  {
    id: 1,
    title: 'Frontend Framework',
    description: 'Kullanıcı arayüzü geliştirme için modern bir framework seçin',
    options: [
      {
        id: 'nextjs',
        name: 'Next.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        description: 'React tabanlı, SEO dostu, tam özellikli bir framework',
      },
      {
        id: 'vuejs',
        name: 'Nuxt.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
        description: 'Vue.js tabanlı, güçlü SSR yeteneklerine sahip framework',
      },
      {
        id: 'react',
        name: 'Remix',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: 'Modern web standartlarını kullanan yeni nesil framework',
      }
    ]
  },
  {
    id: 2,
    title: 'UI Kütüphanesi',
    description: 'Görsel bileşenler ve stillendirme için tercih edeceğiniz yaklaşımı seçin',
    options: [
      {
        id: 'tailwindcss',
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
        description: 'Utility-first CSS framework ile hızlı geliştirme',
      },
      {
        id: 'materialui',
        name: 'Material UI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',
        description: 'Google Material Design tabanlı hazır bileşen kütüphanesi',
      },
      {
        id: 'sass',
        name: 'Chakra UI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg',
        description: 'Erişilebilir ve özelleştirilebilir modern bileşen sistemi',
      }
    ]
  },
  {
    id: 3,
    title: 'State Yönetimi',
    description: 'Uygulama durumunu yönetmek için kullanılacak çözümü seçin',
    options: [
      {
        id: 'redux',
        name: 'Redux Toolkit',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
        description: 'Merkezi state yönetimi için güçlü ve popüler çözüm',
      },
      {
        id: 'typescript',
        name: 'Zustand',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        description: 'Basit ve hafif state yönetim kütüphanesi',
      },
      {
        id: 'react',
        name: 'Recoil',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: 'React için atomik state yönetimi',
      }
    ]
  },
  {
    id: 4,
    title: 'Backend Teknolojisi',
    description: 'Sunucu tarafı geliştirme için kullanılacak teknolojiyi seçin',
    options: [
      {
        id: 'nodejs',
        name: 'Node.js & Express',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        description: 'JavaScript runtime ile hızlı API geliştirme',
      },
      {
        id: 'nestjs',
        name: 'NestJS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg',
        description: 'TypeScript tabanlı, ölçeklenebilir backend framework',
      },
      {
        id: 'python',
        name: 'Django',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
        description: 'Python tabanlı, tam özellikli web framework',
      }
    ]
  },
  {
    id: 5,
    title: 'Veritabanı',
    description: 'Veri depolama için kullanılacak veritabanı sistemini seçin',
    options: [
      {
        id: 'postgresql',
        name: 'PostgreSQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
        description: 'Güçlü, açık kaynak ilişkisel veritabanı',
      },
      {
        id: 'mongodb',
        name: 'MongoDB',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        description: 'Esnek, döküman tabanlı NoSQL veritabanı',
      },
      {
        id: 'mysql',
        name: 'MySQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
        description: 'Popüler, güvenilir ilişkisel veritabanı',
      }
    ]
  },
  {
    id: 6,
    title: 'ORM / ODM',
    description: 'Veritabanı etkileşimleri için kullanılacak aracı seçin',
    options: [
      {
        id: 'typescript',
        name: 'Prisma',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        description: 'Modern veritabanı toolkit ve ORM',
      },
      {
        id: 'sequelize',
        name: 'Sequelize',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg',
        description: 'Node.js için güçlü ORM çözümü',
      },
      {
        id: 'mongodb',
        name: 'Mongoose',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        description: 'MongoDB için elegant ODM çözümü',
      }
    ]
  },
  {
    id: 7,
    title: 'Authentication',
    description: 'Kullanıcı kimlik doğrulama sistemi için çözüm seçin',
    options: [
      {
        id: 'firebase',
        name: 'Auth0',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
        description: 'Tam özellikli kimlik doğrulama platformu',
      },
      {
        id: 'nextjs',
        name: 'NextAuth.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
        description: 'Next.js için authentication çözümü',
      },
      {
        id: 'google',
        name: 'Firebase Auth',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        description: 'Google Firebase authentication servisi',
      }
    ]
  },
  {
    id: 8,
    title: 'Testing',
    description: 'Test yazımı için kullanılacak framework ve araçları seçin',
    options: [
      {
        id: 'jest',
        name: 'Jest & RTL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg',
        description: 'JavaScript testing ve React component testing',
      },
      {
        id: 'nodejs',
        name: 'Cypress',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        description: 'Modern E2E testing framework',
      },
      {
        id: 'typescript',
        name: 'Playwright',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        description: 'Güvenilir E2E testing çözümü',
      }
    ]
  },
  {
    id: 9,
    title: 'Deployment',
    description: 'Uygulama dağıtımı için platform seçin',
    options: [
      {
        id: 'vercel',
        name: 'Vercel',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        description: 'Frontend odaklı deployment platformu',
      },
      {
        id: 'amazonwebservices',
        name: 'AWS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
        description: 'Kapsamlı cloud computing platformu',
      },
      {
        id: 'digitalocean',
        name: 'DigitalOcean',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg',
        description: 'Kullanıcı dostu cloud platform',
      }
    ]
  }
];

// Mobil teknoloji adımları
export const mobileSteps: Step[] = [
  {
    id: 1,
    title: 'Geliştirme Yaklaşımı',
    description: 'Mobil uygulama geliştirme için temel yaklaşımınızı seçin',
    options: [
      {
        id: 'react',
        name: 'React Native',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: 'Cross-platform native uygulama geliştirme framework\'ü',
      },
      {
        id: 'flutter',
        name: 'Flutter',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
        description: 'Google\'ın modern UI toolkit\'i ile cross-platform geliştirme',
      },
      {
        id: 'swift',
        name: 'Native Development',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
        description: 'Platform spesifik native geliştirme (iOS & Android)',
      }
    ]
  },
  {
    id: 2,
    title: 'UI Kütüphanesi',
    description: 'Görsel bileşenler için kullanılacak kütüphaneyi seçin',
    options: [
      {
        id: 'rn-paper',
        name: 'React Native Paper',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: 'Material Design tabanlı UI kütüphanesi',
      },
      {
        id: 'nativebase',
        name: 'NativeBase',
        icon: 'https://nativebase.io/img/nativebase-logo-dark.svg',
        description: 'Özelleştirilebilir bileşen kütüphanesi',
      },
      {
        id: 'rn-elements',
        name: 'React Native Elements',
        icon: 'https://reactnativeelements.com/img/website/logo.png',
        description: 'Cross-platform UI toolkit',
      }
    ]
  },
  {
    id: 3,
    title: 'State Yönetimi',
    description: 'Uygulama durumunu yönetmek için kullanılacak çözümü seçin',
    options: [
      {
        id: 'redux',
        name: 'Redux Toolkit',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
        description: 'Merkezi state yönetimi için güçlü çözüm',
      },
      {
        id: 'mobx',
        name: 'MobX',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mobx/mobx-original.svg',
        description: 'Basit ve ölçeklenebilir state yönetimi',
      },
      {
        id: 'zustand',
        name: 'Zustand',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
        description: 'Minimal state yönetim kütüphanesi',
      }
    ]
  },
  {
    id: 4,
    title: 'Navigation',
    description: 'Uygulama içi gezinme için kullanılacak çözümü seçin',
    options: [
      {
        id: 'react-navigation',
        name: 'React Navigation',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactnavigation/reactnavigation-original.svg',
        description: 'React Native için popüler navigation çözümü',
      },
      {
        id: 'expo-router',
        name: 'Expo Router',
        icon: 'https://expo.github.io/router/img/logo.dark.svg',
        description: 'Expo için file-based routing',
      },
      {
        id: 'native-navigation',
        name: 'Native Navigation',
        icon: 'https://wix.github.io/react-native-navigation/img/logo.png',
        description: 'Platform spesifik navigation çözümü',
      }
    ]
  },
  {
    id: 5,
    title: 'Backend Servisi',
    description: 'Mobil uygulama backend servisi için çözüm seçin',
    options: [
      {
        id: 'firebase',
        name: 'Firebase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
        description: 'Google\'ın tam kapsamlı backend servisi',
      },
      {
        id: 'supabase',
        name: 'Supabase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
        description: 'Açık kaynak Firebase alternatifi',
      },
      {
        id: 'appwrite',
        name: 'Appwrite',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/appwrite/appwrite-original.svg',
        description: 'Self-hosted backend çözümü',
      }
    ]
  },
  {
    id: 6,
    title: 'Offline Storage',
    description: 'Yerel veri depolama için kullanılacak çözümü seçin',
    options: [
      {
        id: 'async-storage',
        name: 'Async Storage',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        description: 'Key-value tabanlı basit depolama',
      },
      {
        id: 'realm',
        name: 'Realm',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/realm/realm-original.svg',
        description: 'Mobil için object database',
      },
      {
        id: 'watermelon',
        name: 'WatermelonDB',
        icon: 'https://watermelondb.dev/img/logo.svg',
        description: 'Performanslı offline-first database',
      }
    ]
  },
  {
    id: 7,
    title: 'Analytics',
    description: 'Kullanıcı analizi için tercih edeceğiniz servisi seçin',
    options: [
      {
        id: 'firebase-analytics',
        name: 'Firebase Analytics',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
        description: 'Google\'ın analitik çözümü',
      },
      {
        id: 'mixpanel',
        name: 'Mixpanel',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
        description: 'Detaylı kullanıcı analizi platformu',
      },
      {
        id: 'amplitude',
        name: 'Amplitude',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Amplitude_logo.svg/1600px-Amplitude_logo.svg.png?20200115143618',
        description: 'Ürün analizi platformu',
      }
    ]
  },
  {
    id: 8,
    title: 'Testing',
    description: 'Test yazımı için kullanılacak araçları seçin',
    options: [
      {
        id: 'jest',
        name: 'Jest & Testing Library',
        icon: '/icons/jest.svg',
        description: 'JavaScript ve component testing',
      },
      {
        id: 'detox',
        name: 'Detox',
        icon: '/icons/detox.svg',
        description: 'E2E testing framework',
      },
      {
        id: 'appium',
        name: 'Appium',
        icon: '/icons/appium.svg',
        description: 'Cross-platform test otomasyonu',
      }
    ]
  },
  {
    id: 9,
    title: 'CI/CD',
    description: 'Sürekli entegrasyon ve dağıtım için platform seçin',
    options: [
      {
        id: 'fastlane',
        name: 'Fastlane',
        icon: 'https://fastlane.tools/assets/images/fastlane-logo-lockup.png',
        description: 'Mobil CI/CD otomasyon aracı',
      },
      {
        id: 'github-actions',
        name: 'GitHub Actions',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/githubactions/githubactions-plain.svg',
        description: 'GitHub\'ın CI/CD çözümü',
      },
      {
        id: 'bitrise',
        name: 'Bitrise',
        icon: 'https://cdn.prod.website-files.com/5db35de024bb983af1b4e151/64b5675fd986a4c35f6ac543_Logo.svg',
        description: 'Mobil odaklı CI/CD platformu',
      }
    ]
  }
]; 