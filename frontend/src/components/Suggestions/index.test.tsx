import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Suggestions } from './index';
import { AuthProvider } from '@/contexts/AuthContext'
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
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
jest.mock('apexcharts', () => ({ exec: jest.fn(() => { return new Promise((resolve, reject) => { resolve("uri") }) }) }));

// Mock ResizeObserver
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('Suggestions', () => {
  it('renders the Suggestions button initially', () => {
    render(
      <AuthProvider>
        <Suggestions />
      </AuthProvider>
    )

    const suggestionsButton = screen.getByRole('button', { name: /Sugerir gestão de gastos/i })
    expect(suggestionsButton).toBeInTheDocument()
  })

  it('fetches bank data when Suggestions button is clicked', async () => {
    render(
      <AuthProvider>
        <ToastContainer />
        <Suggestions />
      </AuthProvider>
    )

    const suggestionsButton = screen.getByRole('button', { name: /Sugerir gestão de gastos/i })
    fireEvent.click(suggestionsButton)

    await waitFor(() => {
        expect(screen.getByText('Sugestões')).toBeInTheDocument()
    })
  })
})