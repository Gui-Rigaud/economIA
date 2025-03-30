import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider } from '@/contexts/AuthContext'
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from '@/app/dashboard/page';

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

describe('PerSuggestions', () => {
    it('renders the personalized suggestions space', () => {
        render(
            <AuthProvider>
                <Dashboard />
            </AuthProvider>
        )

        const perSuggestionsButton = screen.getByRole('button', { name : /Sugestões Personalizadas/i })
        expect(perSuggestionsButton).toBeInTheDocument();
    })

    // it('renders the personalized suggestions message', () => {
    //     render(
    //         <AuthProvider>
    //             <Dashboard />
    //         </AuthProvider>
    //     )

                
    // })
})