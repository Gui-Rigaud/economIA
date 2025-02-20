import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Categorias } from './index'
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

describe('Categorias', () => {
  it('renders the Go button initially', () => {
    render(
      <AuthProvider>
        <Categorias />
      </AuthProvider>
    )

    const goButton = screen.getByRole('button', { name: /go!/i })
    expect(goButton).toBeInTheDocument()
  })

  it('fetches categories when Go button is clicked', async () => {
    render(
      <AuthProvider>
        <ToastContainer />
        <Categorias />
      </AuthProvider>
    )

    const goButton = screen.getByRole('button', { name: /go!/i })
    fireEvent.click(goButton)

    await waitFor(() => {
      const loadingMessage = screen.getByText(/aguarde um momento! nossa ia está trabalhando/i)
      expect(loadingMessage).toBeInTheDocument()
    })
  })
})