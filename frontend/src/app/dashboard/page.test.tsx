import '@testing-library/jest-dom'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import Dashboard from './page'
import { AuthProvider } from '../../contexts/AuthContext'
import React from 'react'
import { act } from 'react'

// Mock de React useRef e context antes de importar componentes
const mockAuthContext = {
  user: { id: '123' },
  signIn: jest.fn(),
  signOut: jest.fn(),
  isAuthenticated: true
};

// Mock do useContext e useRef
jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useContext: () => mockAuthContext,
    useRef: jest.fn().mockImplementation(() => ({
      current: true
    }))
  };
});

// Mock de scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Mock da API
jest.mock('../../services/api', () => ({
  setupAPIClient: () => ({
    get: jest.fn().mockImplementation((url) => {
      if (url === '/suggestion') {
        return Promise.resolve({
          data: {
            sugestoes: [
              { id: '1', frase: 'Sugerir gestão de gastos' },
              { id: '2', frase: 'Análise personalizada' }
            ]
          }
        });
      } else if (url === '/budget') {
        return Promise.resolve({
          data: {
            receita: 5000,
            despesa: 3000,
            saldo: 2000
          }
        });
      }
      return Promise.resolve({ data: [] });
    }),
    post: jest.fn().mockImplementation((url) => {
      if (url === '/generate-categories') {
        return Promise.resolve({ data: ['Alimentação', 'Transporte'] });
      } else if (url === '/percent-categories') {
        return Promise.resolve({
          data: [
            { categoria: 'Alimentação', porcentagem: 60 },
            { categoria: 'Transporte', porcentagem: 40 }
          ]
        });
      } else if (url === '/per-suggestion') {
        return Promise.resolve({
          data: {
            suggestion: {
              resposta: "Aqui está uma análise personalizada da sua situação financeira."
            }
          }
        });
      }
      return Promise.resolve({ data: [] });
    }),
  }),
}));

// Mock dos componentes para evitar dependências externas
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock('react-markdown', () => () => <div data-testid="markdown-content">Conteúdo Markdown</div>);
jest.mock('react-apexcharts', () => jest.fn(() => <div data-testid="apex-chart">Gráfico</div>));
jest.mock('apexcharts', () => ({ exec: jest.fn(() => Promise.resolve("uri")) }));

// Mock de cada componente individualmente para testes específicos - USANDO CAMINHOS RELATIVOS
jest.mock('../../components/Summary', () => ({
  Summary: () => <div data-testid="summary-mock">Esse é o resumo de gastos</div>
}));

jest.mock('../../components/Categorias', () => ({
  Categorias: () => <div data-testid="categorias-mock">Separamos seus gastos pra você</div>
}));

jest.mock('../../components/Suggestions', () => {
  const Mock: React.FC<{ setShowButtons: React.Dispatch<React.SetStateAction<boolean>>; primeiraRenderizacao: React.MutableRefObject<boolean> }> = ({ setShowButtons, primeiraRenderizacao }) => {
    React.useEffect(() => {
      // Simular o comportamento onde após carregar, os botões são mostrados
      setTimeout(() => {
        setShowButtons(true);
        if (primeiraRenderizacao) {
          primeiraRenderizacao.current = false;
        }
      }, 500);
      
      return () => clearTimeout(500);
    }, []);
    
    return <div data-testid="suggestions-mock">Sugestões</div>;
  };
  
  return {
    Suggestions: Mock
  };
});

jest.mock('../../components/PerSuggestion', () => ({
  __esModule: true,
  default: () => <div data-testid="per-suggestion-mock">Sugestões Personalizadas</div>
}));

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

jest.useFakeTimers();

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });
    
  it('renders the complete dashboard with all components', async () => {
    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );
    
    // Verificar componentes iniciais
    expect(screen.getByTestId('summary-mock')).toBeInTheDocument();
    expect(screen.getByTestId('categorias-mock')).toBeInTheDocument();
    expect(screen.getByTestId('suggestions-mock')).toBeInTheDocument();
    
    // Avançar o tempo para permitir que os componentes terminem de carregar
    act(() => {
      jest.advanceTimersByTime(600);
    });
    
    // Após carregar, os botões de navegação devem estar visíveis
    await waitFor(() => {
      const standardButton = screen.getByRole('button', { name: /Sugestões Padrão/i });
      const personalizedButton = screen.getByRole('button', { name: /Sugestões Personalizadas/i });
      
      expect(standardButton).toBeInTheDocument();
      expect(personalizedButton).toBeInTheDocument();
    });
  });
  
  it('renders Summary component correctly', async () => {
    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );
    
    // Verificar se o componente Summary é renderizado corretamente
    expect(screen.getByText(/Esse é o resumo de gastos/i)).toBeInTheDocument();
  });
  
  it('renders Categorias component correctly', async () => {
    render(
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    );
    
    // Verificar se o componente Categorias é renderizado corretamente
    expect(screen.getByText(/Separamos seus gastos pra você/i)).toBeInTheDocument();
  });
});