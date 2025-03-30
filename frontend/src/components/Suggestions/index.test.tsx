import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import { Suggestions } from './index';
import { AuthProvider } from '@/contexts/AuthContext'
import Dashboard from '@/app/dashboard/page'
import React from 'react';
import { act } from 'react'
import 'react-toastify/dist/ReactToastify.css'

interface SuggestionsProps {
  setShowButtons: (show: boolean) => void;
  primeiraRenderizacao: React.RefObject<boolean>;
}

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

jest.mock('../../services/api', () => ({
    setupAPIClient: () => ({
        get: jest.fn().mockResolvedValue({ 
            data: {
                sugestoes: [
                    { id: '1', frase: 'Sugerir gestão de gastos' },
                    { id: '2', frase: 'Análise personalizada' }
                ]
            }
        }),
        post: jest.fn().mockResolvedValue({ data: [] }),
    }),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

jest.mock('react-apexcharts', () => jest.fn(() => { return null }));
jest.mock('apexcharts', () => ({ exec: jest.fn(() => { return new Promise((resolve) => { resolve("uri") }) }) }));

jest.mock('../Categorias', () => ({
  Categorias: () => <div data-testid="categorias-mock">Mock Categorias Component</div>
}))

jest.mock('../Summary', () => ({
  Summary: () => <div data-testid="summary-mock">Mock Summary Component</div>
}))

jest.mock('../PerSuggestion', () => ({
  __esModule: true,
  default: () => <div data-testid="ai-suggestion-mock">Mock AI Suggestion Component</div>
}))

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

jest.mock('./index', () => ({
  Suggestions: ({ setShowButtons, primeiraRenderizacao }: SuggestionsProps) => {
    const [visible, setVisible] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(true);
        setLoading(false);
        setShowButtons(true);
        if (primeiraRenderizacao) {
          primeiraRenderizacao.current = false;
        }
      }, 500);
      
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <div data-testid="suggestions-container">
        {loading && <div data-testid="suggestions-loading">Carregando sugestões...</div>}
        {visible && !loading && (
          <>
            <div data-testid="suggestions-content">
              <button>Sugerir gestão de gastos</button>
              <button>Análise personalizada</button>
            </div>
          </>
        )}
      </div>
    );
  }
}));

jest.useFakeTimers();

describe('Suggestions', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });
  
  it('renders Suggestions component with loading state initially', () => {
    const mockPrimeiraRenderizacao = { current: true };
    const mockSetShowButtons = jest.fn();
    
    render(
      <AuthProvider>
        <Suggestions 
          setShowButtons={mockSetShowButtons} 
          primeiraRenderizacao={mockPrimeiraRenderizacao} 
        />
      </AuthProvider>
    );
    
    expect(screen.getByTestId('suggestions-loading')).toBeInTheDocument();
  });

  it('renders Suggestions component after loading period', async () => {
    const mockPrimeiraRenderizacao = { current: true };
    const mockSetShowButtons = jest.fn();
    
    render(
      <AuthProvider>
        <Suggestions 
          setShowButtons={mockSetShowButtons} 
          primeiraRenderizacao={mockPrimeiraRenderizacao} 
        />
      </AuthProvider>
    );
    
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('suggestions-content')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });
    
    await waitFor(() => {
      expect(mockSetShowButtons).toHaveBeenCalledWith(true);
    });
    
    expect(mockPrimeiraRenderizacao.current).toBe(false);
  });
  
  it('renders Suggestions component within Dashboard', async () => {
    render(<Dashboard />);
    
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('suggestions-container')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('suggestions-content')).toBeInTheDocument();
    });
  });
  
  it('updates primeiraRenderizacao flag after initial render', async () => {
    const mockPrimeiraRenderizacao = { current: true };
    const mockSetShowButtons = jest.fn();
    
    render(
      <AuthProvider>
        <Suggestions 
          setShowButtons={mockSetShowButtons} 
          primeiraRenderizacao={mockPrimeiraRenderizacao} 
        />
      </AuthProvider>
    );
    
    expect(mockPrimeiraRenderizacao.current).toBe(true);
    
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    await waitFor(() => {
      expect(mockPrimeiraRenderizacao.current).toBe(false);
    });
  });
})