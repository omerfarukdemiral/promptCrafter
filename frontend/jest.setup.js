import '@testing-library/jest-dom';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '';
  },
}));

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Terminal: () => 'Terminal Icon',
  Code2: () => 'Code2 Icon',
  Smartphone: () => 'Smartphone Icon',
  ChevronRight: () => 'ChevronRight Icon',
  AlertTriangle: () => 'AlertTriangle Icon',
  List: () => 'List Icon',
})); 