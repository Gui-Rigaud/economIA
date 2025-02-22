'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/assets/logo.png';
import { LogOutIcon } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function Header() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  if (!authContext) {
    throw new Error('AuthContext is null');
  }

  const { signOut } = authContext;

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="h-20 mt-8">
      <div className="w-screen h-20 mx-auto mt-10 px-4 flex items-center justify-between">
        <Link href="/dashboard" className='ml-10'>
          <Image
            alt="logo"
            src={logo}
            width={200}
            height={200}
            priority={true}
            quality={100}
          />
        </Link>

        <nav>
          <form onSubmit={handleSignOut}>
            <button
              type="submit"
              className="border-0 bg-transparent transition-transform duration-300 hover:scale-110 mr-10"
            >
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
