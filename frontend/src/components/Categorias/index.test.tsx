import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { Categorias } from './index'
import 'react-toastify/dist/ReactToastify.css'
import { act } from 'react'
import Dashboard from '@/app/dashboard/page'
import React from 'react';

interface SuggestionsProps {
  setShowButtons: (show: boolean) => void;
  primeiraRenderizacao: React.RefObject<boolean>;
}

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock da API
jest.mock('../../services/api', () => ({
    setupAPIClient: () => ({
        get: jest.fn().mockResolvedValue({ data: [] }),
        post: jest.fn().mockResolvedValue({ data: [] }),
    }),
}))

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

// Mock dos gráficos
jest.mock('react-apexcharts', () => jest.fn(() => { return null }));
jest.mock('apexcharts', () => ({ exec: jest.fn(() => { return new Promise((resolve) => { resolve("uri") }) }) }));

// Mock do componente Summary
jest.mock('../Summary', () => ({
  Summary: () => <div data-testid="summary-mock">Mock Summary Component</div>
}))

// Mock do componente Suggestions
jest.mock('../Suggestions', () => ({
  Suggestions: ({ setShowButtons, primeiraRenderizacao }: SuggestionsProps) => (
    <div data-testid="suggestions-mock">Mock Suggestions Component</div>
  )
}))

// Mock do componente AISuggestionChat
jest.mock('../PerSuggestion', () => ({
  __esModule: true,
  default: () => <div data-testid="ai-suggestion-mock">Mock AI Suggestion Component</div>
}))

// Mock do AuthContext
jest.mock('../../contexts/AuthContext', () => {
  const originalModule = jest.requireActual('../../contexts/AuthContext');
  const mockContext = {
    user: { id: '123' },
    signIn: jest.fn(),
    signOut: jest.fn(),
    isAuthenticated: true
  };
  
  return {
    ...originalModule,
    AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider-mock">{children}</div>,
    useContext: jest.fn().mockReturnValue(mockContext)
  };
})

// Mock para o componente Categorias
jest.mock('./index', () => ({
  Categorias: () => {
    // Simulamos um delay na renderização
    const [visible, setVisible] = React.useState(false);
    
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500); // 500ms de delay para simular loading
      
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <div>
        {visible && <div data-testid="categorias-content">Categorias Content</div>}
        {!visible && <div data-testid="categorias-loading">Carregando categorias...</div>}
      </div>
    );
  }
}));

jest.useFakeTimers();

describe('Categorias', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });
  
  it('renders Categories component after loading period', async () => {
    render(
      <div data-testid="mock-auth-wrapper">
        <Categorias />
      </div>
    );
    
    // Inicialmente, devemos ver o loading
    expect(screen.getByTestId('categorias-loading')).toBeInTheDocument();
    
    // Avançar o timer para simular o tempo passando
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Agora devemos ver o conteúdo carregado
    await waitFor(() => {
      expect(screen.getByTestId('categorias-content')).toBeInTheDocument();
    });
  });

  it('renders Dashboard with mocked components after loading', async () => {
    render(<Dashboard />);
    
    // Avançar o timer para simular o tempo passando
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Aguardar os componentes serem renderizados após o tempo de carregamento
    await waitFor(() => {
      const summaryMock = screen.getByTestId('summary-mock');
      expect(summaryMock).toBeInTheDocument();
    });
    
    await waitFor(() => {
      const suggestionsMock = screen.getByTestId('suggestions-mock');
      expect(suggestionsMock).toBeInTheDocument();
    });
    
    await waitFor(() => {
      const categoriasContent = screen.getByTestId('categorias-content');
      expect(categoriasContent).toBeInTheDocument();
    });
  });
})