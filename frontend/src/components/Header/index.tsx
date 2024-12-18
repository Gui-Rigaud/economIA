import styles from './header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/app/assets/logo.png'
import { LogOutIcon } from 'lucide-react'

export function Header(){
  return(
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
            <form>
              <button>
                <LogOutIcon size={24} color='#FFF'/>
              </button>
            </form>
          </nav>
        </div>

    

    </header>
  )
}