'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/assets/logo.png';
import { LogOutIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

export function Header() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [tooltip, setTooltip] = useState<number | null>(null);
  const { '@nextauth.token': token } = parseCookies();

  if (!authContext) {
    throw new Error('AuthContext is null');
  }

  const { signOut } = authContext;

  const handleSignOut = async () => {
    await signOut();
    
  };

  useEffect(() => {
    if (token === undefined) {
      router.push('/login');
    }
  }, [token, router])

  return (
    <header className="h-20 mt-8">
      <div className="w-screen h-20 mx-auto mt-10 px-4 flex items-center justify-between relative">
        <div className="flex items-center">
          <Link href="/dashboard" className="ml-10">
            <Image
              alt="logo"
              src={logo}
              width={200}
              height={200}
              priority={true}
              quality={100}
            />
          </Link>

          <nav className="ml-10 flex space-x-8 relative w-full">
            {[
              { href: "#graph", label: "Gráficos", tooltip: <>Esse campo pega os dados bancários que você enviou e organiza eles em <Link href="#grapsh" className='hover:text-econGreen'><strong className='hover'>categorias</strong></Link>, devolvendo um <strong>gráfico de donut</strong> que mostra como seus gastos estão divididos nessas categorias</>},
              { href: "#spendings-summary", label: "Resumo", tooltip: <>O campo abaixo analisa os dados de <strong>Receita</strong>, <strong>Despesas totais</strong> e <strong>Saldo</strong>, devolvendo assim um <Link href="#spendings-summary" className='hover:text-green-700'><strong>Resumo dos gastos</strong></Link></>},
              { href: "#suggestionsdiv", label: "Sugestões", tooltip: <>Esse campo analisa as <strong>categorias</strong> criadas, os dados do <strong>resumo</strong> e, a partir disso, desenvolve, através de <strong>IA</strong>, uma aba de <Link href='#suggestions' className='hover:text-green-700'><strong>Sugestão dos gastos</strong></Link>. Essa sugestão dos gastos busca trazer formas de gastos <strong>mais conscientes</strong> que podem ser adotados pelo usuário</> }
            ].map((item, index) => (
              <div key={index} className="relative flex flex-col items-center w-full"
                  onMouseEnter={() => setTooltip(index)}
                  onMouseLeave={() => setTooltip(null)}>
                <Link href={item.href} className="text-white text-[20px] hover:text-gray-300 px-6">{item.label}</Link>
                {tooltip === index && (
                  <div className="absolute top-full left-0 w-full bg-gray-300 text-black text-sm px-3 py-1 rounded shadow-lg z-50">
                    {item.tooltip}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

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
