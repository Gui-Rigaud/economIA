import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'
import Upload from './page'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('Upload', () => {
  it('renders the logo', () => {
    render(
      <AuthProvider>
        <Upload />
      </AuthProvider>
    )

    const logo = screen.getByAltText(/logo/i)
    expect(logo).toBeInTheDocument()
  })

  it('renders the message of the upload page', () => {
    render(
      <AuthProvider>
        <Upload />
      </AuthProvider>
    )

    const messageUpload = screen.getByText(/Falta pouco!/i)
    expect(messageUpload).toBeInTheDocument()
  })

  it('renders the Choose file button', () => {
    render(
      <AuthProvider>
        <ToastContainer />
        <Upload />
      </AuthProvider>
    )

    const uploadButton1 = screen.getByText(/Selecione o arquivo (csv ou pdf)/i)
    expect(uploadButton1).toBeInTheDocument()
  })

  it('renders the Send file button', () => {
    render (
      <AuthProvider>
        <Upload />
      </AuthProvider>
    )
    const uploadButton2 = screen.getByRole('button', { name: /Enviar Arquivo/i })
    expect(uploadButton2).toBeInTheDocument()
  })
})
