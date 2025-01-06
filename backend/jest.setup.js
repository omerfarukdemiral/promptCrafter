// MongoDB Memory Server için gerekli ayarlar
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
process.env.NODE_ENV = 'test';

// Global test timeout'ı ayarla
jest.setTimeout(10000);

// Console.log mockla
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
}; 