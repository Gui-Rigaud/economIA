'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/assets/logo.png';
import { LogOutIcon, Menu, X } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

export function Header() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [tooltip, setTooltip] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
  }, [token, router]);
  
  const navigationItems = [
    { 
      href: "#graph", 
      label: "Gráficos", 
      tooltip: <>Esse campo pega os dados bancários que você enviou e organiza eles em <Link href="#grapsh" className='hover:text-econGreen'><strong className='hover'>categorias</strong></Link>, devolvendo um <strong>gráfico de donut</strong> que mostra como seus gastos estão divididos nessas categorias</>
    },
    { 
      href: "#spendings-summary", 
      label: "Resumo", 
      tooltip: <>O campo abaixo analisa os dados de <strong>Receita</strong>, <strong>Despesas totais</strong> e <strong>Saldo</strong>, devolvendo assim um <Link href="#spendings-summary" className='hover:text-green-700'><strong>Resumo dos gastos</strong></Link></>
    },
    { 
      href: "#suggestions", 
      label: "Sugestões", 
      tooltip: <>Esse campo analisa as <strong>categorias</strong> criadas, os dados do <strong>resumo</strong> e, a partir disso, desenvolve, através de <strong>IA</strong>, uma aba de <Link href='#suggestions' className='hover:text-green-700'><strong>Sugestão dos gastos</strong></Link>. Essa sugestão dos gastos busca trazer formas de gastos <strong>mais conscientes</strong> que podem ser adotados pelo usuário</> 
    }
  ];

  return (
    <header className="h-auto py-4 md:h-20 md:mt-8">
      <div className="w-full h-auto md:h-20 mx-auto md:mt-10 px-4 flex flex-col md:flex-row items-center justify-between relative">
        
        {/* Logo and Mobile Menu Button */}
        <div className="w-full md:w-auto flex justify-between items-center">
          <Link href="/dashboard" className="ml-2 md:ml-10">
            <Image
              alt="logo"
              src={logo}
              width={150}
              height={150}
              priority={true}
              quality={100}
              className="w-auto h-auto"
            />
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden mr-4 text-white" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Navigation */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full md:w-auto items-center`}>
          <nav className="w-full md:ml-10 flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 py-4 md:py-0">
            {navigationItems.map((item, index) => (
              <div 
                key={index} 
                className="relative flex flex-col items-center w-full"
                onMouseEnter={() => setTooltip(index)}
                onMouseLeave={() => setTooltip(null)}
              >
                <Link 
                  href={item.href} 
                  className="text-white text-[18px] md:text-[20px] hover:text-gray-300 px-6 py-2 md:py-0 text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {tooltip === index && (
                  <div className="hidden md:block absolute top-full left-0 w-full bg-gray-300 text-black text-sm px-3 py-1 rounded shadow-lg z-50">
                    {item.tooltip}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* Logout Button */}
          <form onSubmit={handleSignOut} className="mt-4 md:mt-0">
            <button
              type="submit"
              className="border-0 bg-transparent transition-transform duration-300 hover:scale-110 mr-2 md:mr-10 flex items-center"
            >
              <span className="mr-2 text-white md:hidden">Sair</span>
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}