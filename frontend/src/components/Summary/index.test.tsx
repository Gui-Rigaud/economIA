import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Summary } from './index';
import { AuthProvider } from '@/contexts/AuthContext'
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
  it('renders the Summary', () => {
    render(
      <AuthProvider>
        <Summary />
      </AuthProvider>
    )

    const summary = screen.getByText(/Esse é o resumo dos seus gastos:/i)
    expect(summary).toBeInTheDocument()
  })
})