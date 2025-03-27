import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Summary } from './index';
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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

jest.mock('react-apexcharts', () => jest.fn(() => { return null }));
jest.mock('apexcharts', () => ({ exec: jest.fn(() => { return new Promise((resolve) => { resolve("uri") }) }) }));

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Summary', () => {
  it('renders the Summary button initially', () => {
    render(
      <AuthProvider>
        <Summary />
      </AuthProvider>
    )

    const summaryButton = screen.getByRole('button', { name: /Resumo de gastos/i })
    expect(summaryButton).toBeInTheDocument()
  })

  it('fetches bank data when Summary button is clicked', async () => {
    render(
      <AuthProvider>
        <ToastContainer />
        <Summary />
      </AuthProvider>
    )

    const summaryButton = screen.getByRole('button', { name: /Resumo de gastos/i })
    fireEvent.click(summaryButton)
    
    await waitFor(() => {
        expect(screen.getByText(/resumo de gastos mensais/i)).toBeInTheDocument();
    })
  })
})