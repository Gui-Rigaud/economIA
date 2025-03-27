"use client";

import Donut from '../Graph'; // Certifique-se de que o caminho está correto
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
    "#B00000", // Vermelho escuro
    "#0000B0", // Azul escuro
    "#008000", // Verde escuro
    "#CC7000", // Laranja escuro
    "#C0A000", // Amarelo escuro
    "#600060", // Roxo escuro
    "#B00050", // Rosa escuro
    "#000060", // Azul bem escuro
    "#005050", // Azul-esverdeado escuro
];

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is null");
  }
  const { user } = authContext;
  const apiClient = setupAPIClient();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [showPhrase, setShowPhrase] = useState(false); // Estado para controlar a visibilidade da frase
  const primeiraRenderizacao = useRef(true);

  const fetchCategories = async () => {
    if (primeiraRenderizacao.current) {
      setShowPhrase(true); // Mostra a frase após o botão ser pressionado

      const listTransactions = true;
      console.log(user);
        let gen_categories;
        try {
          if (listTransactions) {
            gen_categories = await apiClient.post('/generate-categories', {
                user_id: user?.id
            });
            let percent_categories;
            try {
              if (gen_categories) {
                percent_categories = await apiClient.post('/percent-categories', gen_categories.data, {
                  params: {
                    user_id: user?.id
                  }
                });

                if (percent_categories) {                
                  setCategorias(percent_categories.data);
                }
              } else {
                toast.error("A IA não gerou nenhuma categoria", { theme: "dark" });
              }
            } catch (error) {
              console.error("Error fetching percent categories:", error);
              return;
            }
          } else {
            toast.error("Não há nenhuma transação!", { theme: "dark" });
          }
        } catch (error) {
          console.error("Error generating categories:", error);
          return;
        }
      }
      primeiraRenderizacao.current = false;
    };

  useEffect(() => {
    if (primeiraRenderizacao.current) {
      fetchCategories();
    }
  }, [primeiraRenderizacao, fetchCategories]);

  const gerarCoresComPaleta = (quantidade: number) => {
    const cores = [...paletaCores]; // Copia a paleta para não modificar a original
    const resultado = [];
  
    // Se a quantidade de categorias for maior que o número de cores, repetimos a paleta
    while (resultado.length < quantidade) {
      if (cores.length === 0) {
        cores.push(...paletaCores); // Reabastece as cores quando acabar
      }
      // Remove uma cor aleatória da lista e adiciona ao resultado
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

            <div id="graph" className="flex justify-center items-center h-[300px] w-full mb-9">
              <Donut
                categories={categorias.map((data) => data.categoria)}
                data={categorias.map((data) => data.porcentagem)}
                colors={gerarCoresComPaleta(categorias.length)} // Passa as cores aqui
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