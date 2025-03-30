import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AuthProvider } from '@/contexts/AuthContext'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from '.';

jest.mock('../../services/api', () => ({
    setupAPIClient: () => ({
        get: jest.fn().mockResolvedValue({ data: [] }),
        post: jest.fn().mockResolvedValue({ data: [] }),
    }),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

jest.mock('react-markdown', () => () => <div />);

jest.mock('react-apexcharts', () => jest.fn(() => { return null }));
jest.mock('apexcharts', () => ({ exec: jest.fn(() => { return new Promise((resolve, reject) => { resolve("uri") }) }) }));

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Header', () => {
    it('renders the Categories User Instruction', () => {
        render(
            <AuthProvider>
              <Header />
            </AuthProvider>
        )

        const categoriesInstructions = screen.getByText(/Gráficos/i);
        expect(categoriesInstructions).toBeInTheDocument();
    })

    it('renders the Summary User Instruction', () => {
        render(
            <AuthProvider>
              <Header />
            </AuthProvider>
        )

        const summaryInstructions = screen.getByText(/Resumo/i);
        expect(summaryInstructions).toBeInTheDocument();
    })

    it('renders the Suggestions User Instruction', () => {
        render(
            <AuthProvider>
              <Header />
            </AuthProvider>
        )

        const suggestionsInstructions = screen.getByText(/Sugestões/i);
        expect(suggestionsInstructions).toBeInTheDocument();
    })
})