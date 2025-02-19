import '@testing-library/jest-dom'
import { render, screen, fireEvent, act } from '@testing-library/react'
import UploadButton from './index'
import { AuthProvider } from '@/contexts/AuthContext'
import styles from './styles.module.scss'
import { setupAPIClient } from '@/services/api'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify'

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

    const fileInput = screen.getByLabelText(/selecione o arquivo/i)
    const uploadButton = screen.getByRole('button', { name: /enviar arquivo/i })

    expect(fileInput).toBeInTheDocument()
    expect(uploadButton).toBeInTheDocument()
  })
})