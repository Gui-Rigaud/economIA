import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Cadastro from './page'
import { AuthProvider } from '@/contexts/AuthContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}))

describe('Cadastro', () => {
  it('renders the logo', () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    )

    const logo = screen.getByAltText(/logo/i)
    expect(logo).toBeInTheDocument()
  })

  it('renders the name input', () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    )

    const nameInput = screen.getByPlaceholderText(/nome sobrenome/i)
    expect(nameInput).toBeInTheDocument()
  })

  it('renders the email input', () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    )

    const emailInput = screen.getByPlaceholderText(/exemplo@gmail.com/i)
    expect(emailInput).toBeInTheDocument()
  })

  it('renders the password input', () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    )

    const passwordInput = screen.getByPlaceholderText(/senha/i)
    expect(passwordInput).toBeInTheDocument()
  })

  it('renders the CPF input', () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    )

    const cpfInput = screen.getByPlaceholderText(/12345678912/i)
    expect(cpfInput).toBeInTheDocument()
  })

  it('renders the phone number input', () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    )

    const phoneInput = screen.getByPlaceholderText(/81999999999/i)
    expect(phoneInput).toBeInTheDocument()
  })

  it('renders the birthdate input', () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    )

    const birthdateInput = screen.getByPlaceholderText(/data de nascimento/i)
    expect(birthdateInput).toBeInTheDocument()
  })

  it('renders the register button', () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    )

    const registerButton = screen.getByRole('button', { name: /cadastrar/i })
    expect(registerButton).toBeInTheDocument()
  })

  it('renders the login link', () => {
    render(
      <AuthProvider>
        <Cadastro />
      </AuthProvider>
    )

    const loginLink = screen.getByText('Já tem um cadastro? Faça o login clicando aqui!')
    expect(loginLink).toBeInTheDocument()
  })

  it('shows error message when fields are empty', () => {
    render(
      <AuthProvider>
        <ToastContainer />
        <Cadastro />
      </AuthProvider>
    )

    const registerButton = screen.getByRole('button', { name: /cadastrar/i })
    fireEvent.click(registerButton)

    const errorMessage = screen.getByText(/Preencha todos os campos!/i)
    expect(errorMessage).toBeInTheDocument()
  })  
})