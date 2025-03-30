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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { '@nextauth.token': token } = parseCookies();
  
  if (!authContext) {
    throw new Error('AuthContext is null');
  }
  
  const { signOut } = authContext;
  
  const handleSignOut = async () => {
    await signOut();
  };
  
  // Combined navigation items, using both ID references
  const navItems = [
    { 
      href: "#graph", 
      altHref: "#Categorias",
      label: "Gráficos", 
      tooltip: <>Esse campo pega os dados bancários que você enviou e organiza eles em <Link href="#Categorias" className='hover:text-econGreen'><strong className='hover'>categorias</strong></Link>, devolvendo um <strong>gráfico de donut</strong> que mostra como seus gastos estão divididos nessas categorias</>
    },
    { 
      href: "#spendings-summary", 
      altHref: "#spendings-summary",
      label: "Resumo", 
      tooltip: <>O campo abaixo analisa os dados de <strong>Receita</strong>, <strong>Despesas totais</strong> e <strong>Saldo</strong>, devolvendo assim um <Link href="#spendings-summary" className='hover:text-green-700'><strong>Resumo dos gastos</strong></Link></>
    },
    { 
      href: "#suggestions", 
      altHref: "#suggestionsdiv",
      label: "Sugestões", 
      tooltip: <>Esse campo analisa as <strong>categorias</strong> criadas, os dados do <strong>resumo</strong> e, a partir disso, desenvolve, através de <strong>IA</strong>, uma aba de <Link href='#suggestions' className='hover:text-green-700'><strong>Sugestão dos gastos</strong></Link>. Essa sugestão dos gastos busca trazer formas de gastos <strong>mais conscientes</strong> que podem ser adotados pelo usuário</> 
    }
  ];
  
  useEffect(() => {
    if (token === undefined) {
      router.push('/login');
    }
  }, [token, router]);
  
  return (
    <header className="py-4 sm:py-6 md:py-8">
      <div className="w-full px-4 mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/dashboard" className="flex-shrink-0">
            <Image
              alt="logo"
              src={logo}
              width={150}
              height={150}
              priority={true}
              quality={100}
              className="w-24 sm:w-32 md:w-40 h-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex ml-4 lg:ml-10 space-x-2 lg:space-x-8">
            {navItems.map((item, index) => (
              <div 
                key={index} 
                className="relative"
                onMouseEnter={() => setTooltip(index)}
                onMouseLeave={() => setTooltip(null)}
              >
                <Link href={item.href} className="text-white text-base lg:text-xl hover:text-gray-300 px-2 lg:px-6">
                  {item.label}
                </Link>
                {tooltip === index && (
                  <div className="absolute top-full left-0 w-64 lg:w-72 bg-gray-300 text-black text-xs lg:text-sm px-3 py-1 rounded shadow-lg z-50">
                    {item.tooltip}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center">
          <button 
            className="md:hidden text-white mr-4"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logout Button */}
          <form onSubmit={handleSignOut}>
            <button
              type="submit"
              className="border-0 bg-transparent transition-transform duration-300 hover:scale-110"
            >
              <LogOutIcon size={24} color="#FFF" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 mt-2 px-4 py-2">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                <Link 
                  href={item.altHref || item.href} 
                  className="text-white text-lg block py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                <div className="text-gray-400 text-xs mt-1 mb-2">
                  {item.tooltip}
                </div>
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}