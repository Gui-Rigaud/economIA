'use client';

import styles from './header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/app/assets/logo.png'
import { LogOutIcon } from 'lucide-react'
import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export function Header() {

  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error('AuthContext is null')
  }

  const { signOut } = authContext

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  }

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link href='/dashboard'>
            <Image
              alt='logo'
              src={logo}
              width={200}
              height={200}
              priority={true}
              quality={100}
            />
          </Link>

          <nav>
            <form onSubmit={handleSignOut}>
              <button type="submit">
                <LogOutIcon size={24} color='#FFF' />
              </button>
            </form>
          </nav>
        </div>
      </header>
    </>
  )
}