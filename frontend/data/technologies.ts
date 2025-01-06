export const webTechnologies = {
  WebDevelopment: {
    description: 'Technologies and concepts required for building web applications.',
    phases: {
      Frontend: {
        description: 'Technologies for building user interfaces.',
        technologies: {
          Frameworks: {
            React: {
              icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
              description: 'A component-based library for building user interfaces.',
            },
            'Vue.js': {
              icon: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg',
              description: 'A progressive JavaScript framework for building user interfaces.',
            },
            Angular: {
              icon: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg',
              description: 'A platform for building mobile and desktop web applications.',
            },
          },
          CSSFrameworks: ['Tailwind', 'Bootstrap', 'Bulma'],
          StateManagement: ['Redux', 'MobX', 'Context API', 'Recoil'],
          Routing: {
            'React Router': {
              icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
              description: 'Routing library for React applications.',
            },
            'Next.js': {
              icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
              description: 'React framework with built-in routing capabilities.',
            },
          },
        },
      },
      Backend: {
        description: 'Technologies for server-side development.',
        technologies: {
          'Node.js': {
            icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
            description: 'A JavaScript runtime for building scalable backend services.',
          },
          Django: {
            icon: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg',
            description: 'A Python framework for rapid backend development.',
          },
          'Spring Boot': {
            icon: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Spring_Framework_Logo_2018.svg',
            description: 'A Java-based framework for building robust backend systems.',
          },
        },
      },
      Database: {
        description: 'Technologies for data storage and management.',
        technologies: {
          Relational: ['PostgreSQL', 'MySQL', 'SQLite'],
          NoSQL: ['MongoDB', 'Firebase Realtime Database', 'CouchDB'],
          InMemory: ['Redis', 'Memcached'],
        },
      },
    },
  },
};

export const mobileTechnologies = {
  MobileDevelopment: {
    description: 'Technologies and concepts required for building mobile applications.',
    phases: {
      Frontend: {
        description: 'Technologies for building mobile user interfaces.',
        technologies: {
          Frameworks: {
            'React Native': {
              icon: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
              description: 'A framework for building cross-platform mobile applications using JavaScript.',
            },
            Flutter: {
              icon: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png',
              description: "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop.",
            },
            SwiftUI: {
              icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Swift_logo.svg',
              description: "Apple's framework for building user interfaces across all Apple platforms.",
            },
          },
          UIKits: ['Material Design', 'Native Base', 'Cupertino'],
        },
      },
      Backend: {
        description: 'Backend technologies for mobile applications.',
        technologies: {
          Firebase: {
            icon: 'https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg',
            description: 'A platform developed by Google for creating mobile and web applications.',
          },
          'Node.js': {
            icon: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg',
            description: 'A JavaScript runtime for server-side programming.',
          },
          Django: {
            icon: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg',
            description: 'A Python framework for backend development.',
          },
        },
      },
      Database: {
        description: 'Databases commonly used in mobile applications.',
        technologies: {
          Relational: ['SQLite'],
          NoSQL: ['Firebase Realtime Database', 'Realm'],
          InMemory: ['Redis'],
        },
      },
      Other: {
        description: 'Other tools and services for mobile development.',
        technologies: {
          PushNotifications: ['Firebase Cloud Messaging', 'OneSignal'],
          Analytics: ['Google Analytics', 'Firebase Analytics'],
        },
      },
    },
  },
}; 