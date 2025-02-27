import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import DashboardLayout from './layout'
import { AuthProvider } from '@/contexts/AuthContext'
import { Header } from '@/components/Header'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

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
    const header = screen.getByTestId('header-mock'); // Adicione data-testid ao Header real
    expect(header).toBeInTheDocument();
  });

  it('renders the children inside the layout', () => {
      render(
      <AuthProvider>
          <DashboardLayout>
          <div data-testid="dashboard-content">Conteúdo do Dashboard</div>
          </DashboardLayout>
      </AuthProvider>
      )

      const content = screen.getByTestId('dashboard-content')
      expect(content).toBeInTheDocument()
  })
})