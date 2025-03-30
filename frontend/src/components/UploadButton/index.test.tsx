import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import UploadButton from './index'
import { AuthProvider } from '@/contexts/AuthContext'
import styles from './styles.module.scss'
import { act } from '@testing-library/react'

jest.mock('../../services/api', () => ({
  setupAPIClient: () => ({
    post: jest.fn().mockResolvedValue({ data: 'success' }),
  }),
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}))

describe('UploadButton', () => {
  it('renders the file input and upload button', () => {
    render(
      <AuthProvider>
        <div className={styles.Container}>
          <UploadButton />
        </div>
      </AuthProvider>
    )

    const fileInput = screen.getByLabelText(/Selecione o arquivo/i)
    const uploadButton = screen.getByRole('button', { name: /Enviar Arquivo/i })

    expect(fileInput).toBeInTheDocument()
    expect(uploadButton).toBeInTheDocument()
  })

  it('updates label when file is selected', () => {
    render(
      <AuthProvider>
        <UploadButton />
      </AuthProvider>
    )

    const fileInput = screen.getByLabelText(/Selecione o arquivo/i)
    const file = new File(['dummy content'], 'example.csv', { type: 'text/csv' })

    fireEvent.change(fileInput, { target: { files: [file] } })

    expect(screen.getByText(/example.csv/i)).toBeInTheDocument()
  })

  it('shows error if no file is selected and upload is clicked', async () => {
    render(
      <AuthProvider>
        <UploadButton />
      </AuthProvider>
    )

    const uploadButton = screen.getByRole('button', { name: /Enviar Arquivo/i })

    await act(async () => {
      fireEvent.click(uploadButton)
    })

    const errorMessage = screen.getByText('Nenhum arquivo selecionado.');

    expect(errorMessage).toBeInTheDocument();
  })
})