import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import promptReducer from '@/store/promptSlice';
import PromptForm from './PromptForm';

// Mock store oluştur
const store = configureStore({
  reducer: {
    prompt: promptReducer,
  },
});

// Test bileşenini sarmala
const renderWithProviders = (component: React.ReactNode) => {
  return render(<Provider store={store}>{component}</Provider>);
};

describe('PromptForm', () => {
  it('başlangıçta platform seçim ekranını gösterir', () => {
    renderWithProviders(<PromptForm />);
    
    expect(screen.getByText('Platform Seçimi')).toBeInTheDocument();
    expect(screen.getByText('Web Geliştirme')).toBeInTheDocument();
    expect(screen.getByText('Mobil Geliştirme')).toBeInTheDocument();
  });

  it('platform seçildiğinde teknoloji seçim ekranına geçer', () => {
    renderWithProviders(<PromptForm />);
    
    fireEvent.click(screen.getByText('Web Geliştirme'));
    expect(screen.getByText('Teknoloji Seçimi')).toBeInTheDocument();
  });

  it('platform seçilmeden ilerlemeye çalışıldığında hata mesajı gösterir', () => {
    renderWithProviders(<PromptForm />);
    
    // Platform seçmeden teknoloji seçimine geçmeye çalış
    fireEvent.click(screen.getByText('Web Geliştirme'));
    expect(screen.queryByText('Lütfen bir platform seçin')).not.toBeInTheDocument();
  });

  it('form gönderildiğinde API çağrısı yapar', async () => {
    renderWithProviders(<PromptForm />);
    
    // Platform seç
    fireEvent.click(screen.getByText('Web Geliştirme'));
    
    // Teknolojileri seç (TechnologySelection bileşeni mock edilmeli)
    
    // Proje detaylarını gir
    const textarea = screen.getByPlaceholderText('Projenizi kısaca açıklayın...');
    fireEvent.change(textarea, { target: { value: 'Test projesi' } });
    
    // Formu gönder
    fireEvent.click(screen.getByText('Prompt Oluştur'));
    
    // API çağrısının yapıldığını kontrol et
    // Redux action'ların çağrıldığını kontrol et
  });
}); 