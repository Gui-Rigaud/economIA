import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from './page'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/router'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('Login', () => {
  it('renders the logo', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    )

    const logo = screen.getByAltText(/logo/i)
    expect(logo).toBeInTheDocument()
  })

  it('renders the email input', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    )

    const emailInput = screen.getByPlaceholderText(/e-mail/i)
    expect(emailInput).toBeInTheDocument()
  })

  it('renders the password input', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    )

    const passwordInput = screen.getByPlaceholderText(/senha/i)
    expect(passwordInput).toBeInTheDocument()
  })

  it('renders the login button', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    )

    const loginButton = screen.getByRole('button', { name: /login/i })
    expect(loginButton).toBeInTheDocument()
  })

  it('renders the button that redirects to cadastro', () => {
    render (
      <AuthProvider>
        <Login />
      </AuthProvider>
    )
    const cadastroLink = screen.getByText('Ainda não tem uma conta? Cadastre-se clicando aqui!')
    expect(cadastroLink).toBeInTheDocument()
  })

  it('shows error message when fields are empty', async () => {
    render(
      <AuthProvider>
        <ToastContainer/>
        <Login />
      </AuthProvider>
    )

    const emailInput = screen.getByPlaceholderText(/e-mail/i)
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })

    const loginButton = screen.getByRole('button', { name: /login/i })
    fireEvent.click(loginButton)

    const toastMessage = await screen.findByText('Preencha todos os campos!')
    expect(toastMessage).toBeInTheDocument()
  })
})