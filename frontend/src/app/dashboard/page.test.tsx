import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Dashboard from './page'
import { AuthProvider } from '@/contexts/AuthContext'
import userEvent from '@testing-library/user-event'; 

// Mock dos componentes para evitar dependências externas
jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(),
      prefetch: jest.fn(),
    }),
}))

jest.mock('react-apexcharts', () => jest.fn(() => { return null }));
jest.mock('apexcharts', () => ({ exec: jest.fn(() => { return new Promise((resolve) => { resolve("uri") }) }) }));

// Mock ResizeObserver
global.ResizeObserver = class {
observe() {}
unobserve() {}
disconnect() {}
}

describe('Dashboard', () => {
    it('renders Categories button', () => {
        render(
        <AuthProvider>
            <Dashboard />
        </AuthProvider>
        )

        const categorias = screen.getByRole('button', { name: /Gerar Categorias/i })
        expect(categorias).toBeInTheDocument()
    })

    it('renders Summary button', () => {
        render(
        <AuthProvider>
            <Dashboard />
        </AuthProvider>
        )

        const summary = screen.getByRole('button', { name: /Resumo de gastos/i })
        expect(summary).toBeInTheDocument()
    })

    it('renders Suggestions button', () => {
        render(
        <AuthProvider>
            <Dashboard />
        </AuthProvider>
        )

        const suggestions = screen.getByRole('button', { name: /Sugerir gestão de gastos/i })
        expect(suggestions).toBeInTheDocument()
    })

    it('calls the correct function when "Gerar Categorias" button is clicked', async () => {
        const mockOnClick = jest.fn(); // Mock da função de clique
        render(
            <AuthProvider>
                <Dashboard />
            </AuthProvider>
        );

        const categoriasButton = screen.getByRole('button', { name: /Gerar Categorias/i });
        categoriasButton.onclick = mockOnClick; // Atribui a função mock ao botão

        await userEvent.click(categoriasButton); // Simula o clique no botão

        expect(mockOnClick).toHaveBeenCalledTimes(1); // Verifica se a função foi chamada
    });

    it('calls the correct function when "Resumo de gastos" button is clicked', async () => {
        const mockOnClick = jest.fn(); // Mock da função de clique
        render(
            <AuthProvider>
                <Dashboard />
            </AuthProvider>
        );

        const categoriasButton = screen.getByRole('button', { name: /Resumo de gastos/i });
        categoriasButton.onclick = mockOnClick; // Atribui a função mock ao botão

        await userEvent.click(categoriasButton); // Simula o clique no botão

        expect(mockOnClick).toHaveBeenCalledTimes(1); // Verifica se a função foi chamada
    });

    it('calls the correct function when "Sugerir gestão de gastos" button is clicked', async () => {
        const mockOnClick = jest.fn(); // Mock da função de clique
        render(
            <AuthProvider>
                <Dashboard />
            </AuthProvider>
        );

        const categoriasButton = screen.getByRole('button', { name: /Sugerir gestão de gastos/i });
        categoriasButton.onclick = mockOnClick; // Atribui a função mock ao botão

        await userEvent.click(categoriasButton); // Simula o clique no botão

        expect(mockOnClick).toHaveBeenCalledTimes(1); // Verifica se a função foi chamada
    });
})
