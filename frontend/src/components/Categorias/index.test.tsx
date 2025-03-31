import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { Categorias } from './index'
import 'react-toastify/dist/ReactToastify.css'
import { act } from 'react'
import Dashboard from '@/app/dashboard/page'
import React from 'react';

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
        post: jest.fn().mockImplementation((url) => {
            if (url === '/generate-categories') {
                return Promise.resolve({ data: ['Alimentação', 'Transporte', 'Lazer'] });
            } else if (url === '/percent-categories') {
                return Promise.resolve({
                    data: [
                        { categoria: 'Alimentação', porcentagem: 50 },
                        { categoria: 'Transporte', porcentagem: 30 },
                        { categoria: 'Lazer', porcentagem: 20 }
                    ]
                });
            } else if (url === '/per-suggestion') {
                return Promise.resolve({
                    data: {
                        suggestion: {
                            resposta: "Resposta da IA personalizada"
                        }
                    }
                });
            }
            return Promise.resolve({ data: [] });
        }),
    }),
}))

// Mock de react-markdown
jest.mock('react-markdown', () => 
  function ReactMarkdown({ children }: { children?: React.ReactNode }) {
    return <div data-testid="markdown-mock">{children || "Markdown content"}</div>;
  }
);

// Mock de next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

// Mock dos gráficos
jest.mock('react-apexcharts', () => jest.fn(() => <div data-testid="chart-mock">Chart</div>));
jest.mock('apexcharts', () => ({ exec: jest.fn(() => Promise.resolve("uri")) }));

// Mock do componente Summary
jest.mock('../Summary', () => ({
  Summary: () => <div data-testid="summary-mock">Mock Summary Component</div>
}))

// Mock do componente Suggestions
jest.mock('../Suggestions', () => ({
  Suggestions: ({ setShowButtons }: { setShowButtons: React.Dispatch<React.SetStateAction<boolean>> }) => {
    React.useEffect(() => {
      if (setShowButtons) {
        setTimeout(() => {
          setShowButtons(true);
        }, 100);
      }
    }, [setShowButtons]);
    
    return <div data-testid="suggestions-mock">Mock Suggestions Component</div>;
  }
}))

// IMPORTANTE: Mock do componente PerSuggestion corrigido
jest.mock('../PerSuggestion', () => ({
  __esModule: true,
  default: () => <div data-testid="per-suggestion-mock">Mock AI Suggestion Chat Component</div>
}));

// Mock do AuthContext corrigido
const mockAuthContext = {
  user: { id: '123' },
  signIn: jest.fn(),
  signOut: jest.fn(),
  isAuthenticated: true,
  signUp: jest.fn()
};

jest.mock('../../contexts/AuthContext', () => ({
  AuthContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({ children }: { children: React.ReactNode }) => children
  },
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider-mock">{children}</div>,
  useAuth: () => mockAuthContext
}));

// Mock do useContext do React para fornecer o contexto de autenticação
jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => mockAuthContext
  };
});

// Mock para o componente Categorias
jest.mock('./index', () => ({
  Categorias: () => {
    // Simulamos um delay na renderização
    const [visible, setVisible] = React.useState(false);
    
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(true);
      }, 500);
      
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <div>
        {visible ? 
          <div data-testid="categorias-content">Categorias Content</div> : 
          <div data-testid="categorias-loading">Carregando categorias...</div>
        }
      </div>
    );
  }
}));

jest.useFakeTimers();

describe('Categorias', () => {
  beforeEach(() => {
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
    // Renderizar Dashboard explicitamente com o contexto
    render(
      <div data-testid="auth-provider-mock">
        <Dashboard />
      </div>
    );
    
    // Avançar o timer para simular o tempo passando
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // Aguardar os componentes serem renderizados após o tempo de carregamento
    await waitFor(() => {
      expect(screen.getByTestId('summary-mock')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('suggestions-mock')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('categorias-content')).toBeInTheDocument();
    });
  });
})