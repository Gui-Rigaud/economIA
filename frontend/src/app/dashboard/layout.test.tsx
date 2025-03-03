import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DashboardLayout from './layout'
import { AuthProvider } from '@/contexts/AuthContext'
import { useRouter } from 'next/router'

// Mock do useRouter para evitar erro de roteamento
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

// Mock do Header para evitar dependências externas nos testes
jest.mock('../../components/Header', () => ({
  Header: () => <div data-testid="header-mock">Header</div>
}))

describe('DashboardLayout', () => {
  it('renders the real Header component', () => {
    render(
      <AuthProvider>
        <DashboardLayout>
          <div data-testid="dashboard-content">Conteúdo do Dashboard</div>
        </DashboardLayout>
      </AuthProvider>
    );

    // Verifica se o Header real está presente
    const header = screen.getByTestId('header-mock'); 
    expect(header).toBeInTheDocument();
  });

  it('renders the children inside the layout', () => {
    render(
      <AuthProvider>
        <DashboardLayout>
          <div data-testid="dashboard-content">Conteúdo do Dashboard</div>
        </DashboardLayout>
      </AuthProvider>
    );

    const content = screen.getByTestId('dashboard-content');
    expect(content).toBeInTheDocument();
  });
});
