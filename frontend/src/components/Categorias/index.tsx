"use client";

import Donut from '../Graph';
import { setupAPIClient } from '@/services/api';
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

interface Categoria {
  categoria: string;
  porcentagem: number;
}

export function Categorias() {
  const paletaCores = [
    "#B00000", "#0000B0", "#008000", "#CC7000", "#C0A000",
    "#600060", "#B00050", "#000060", "#005050"
  ];

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is null");
  }

  const { user } = authContext;
  const apiClient = setupAPIClient();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [showPhrase, setShowPhrase] = useState(false);
  const primeiraRenderizacao = useRef(true);
  const [cores,setCores] = useState<string[]>([]);

  const fetchCategories = async () => {
    if (!user?.id) {
      console.warn("User ID ainda não está disponível.");
      return;
    }

    if (primeiraRenderizacao.current) {
      setShowPhrase(true);


      try {
        const gen_categories = await apiClient.post('/generate-categories', {
          user_id: user.id
        });

        if (gen_categories?.data && user.id) {
          const percent_categories = await apiClient.post(
            '/percent-categories',
            gen_categories.data,
            {
              params: { user_id: user.id }
            }
          );

          if (percent_categories?.data) {
            setCategorias(percent_categories.data);
          } else {
            toast.error("A IA não gerou nenhuma categoria", { theme: "dark" });
          }

          setCores(gerarCoresComPaleta(percent_categories.data.length));
        }
      } catch (error) {
        console.error("Erro ao gerar ou buscar categorias:", error);
        toast.error("Erro ao gerar categorias", { theme: "dark" });
      } finally {
        primeiraRenderizacao.current = false;
      }
    }
  };

  useEffect(() => {
    if (primeiraRenderizacao.current && user?.id) {
      fetchCategories();
    }
  }, [user?.id]); // Remove fetchCategories do array de dependências para evitar chamadas duplicadas

  const gerarCoresComPaleta = (quantidade: number) => {
    const cores = [...paletaCores];
    const resultado = [];

    while (resultado.length < quantidade) {
      if (cores.length === 0) cores.push(...paletaCores);
      const corIndex = Math.floor(Math.random() * cores.length);
      resultado.push(cores.splice(corIndex, 1)[0]);
    }

    return resultado;
  };

  return (
    <>
      <AuthProvider>
        <main className="p-8 font-sans">
          <>
            {showPhrase && (
              <section className="text-center mb-20">
                <h1 className="text-4xl text-white">CATEGORIAS</h1>
                <h2 className="text-xl text-[#9cc5a1]">Separamos seus gastos para você</h2>
              </section>
            )}

            <div id="graph" className="flex justify-center items-center h-[300px] w-full mb-[150px]">
              <Donut
                categories={categorias.map((data) => data.categoria)}
                data={categorias.map((data) => data.porcentagem)}
                colors={cores}
              />
            </div>

            <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
              {categorias.map((categoria) => (
                <div key={categoria.categoria} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm transition-transform duration-200 hover:-translate-y-1">
                  <h3 className="text-center text-lg text-gray-800 truncate w-full">{categoria.categoria}</h3>
                  <p className="text-center text-gray-600">{categoria.porcentagem}%</p>
                </div>
              ))}
            </section>
          </>
        </main>
      </AuthProvider>
    </>
  );
}