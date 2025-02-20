"use client"

import styles from './categorias.module.scss'
import ApexCharts from 'apexcharts'
import Donut from '../Graph';
import { setupAPIClient } from '@/services/api';
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';
import { canSSRAuth } from '@/utils/canSSRAuth';

// const categorias = [
//   {
//       "categoria": "Alimentação/Restaurante",
//       "porcentagem": 35
//   },
//   {
//       "categoria": "Compras/Varejo",
//       "porcentagem": 15
//   },
//   {
//       "categoria": "Bares/Lazer",
//       "porcentagem": 35
//   },
//   {
//       "categoria": "Mercado/Supermercado",
//       "porcentagem": 10
//   },
//   {
//       "categoria": "Pagamento/Crédito",
//       "porcentagem": 5
//   },
// ];

interface Categoria {
  categoria: string;
  porcentagem: number;
}

export function Categorias() {

  const paletaCores = [
    "#216869", "#48a078", "#9cc5a1", "#FFE4", "#6BE8A4", "#132414",
    "#1B998B", "#2D3047", "#FFFD82", "#FF9B71", "#E84855", "#F9DC5C",
    "#3185FC", "#EFBCD5", "#9A031E", "#5F0F40", "#0F4C5C", "#E36414"
  ];

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is null");
  }
  const { user } = authContext;
  const apiClient = setupAPIClient();
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const primeiraRenderizacao = useRef(true);

  const fetchCategories = async () => {
    if (primeiraRenderizacao.current) {
      setLoading(true);

      let listTransactions;
      console.log(user);
      try {
        listTransactions = await apiClient.get('/list/transactions', {
          params: {
            user_id: user?.id
          }
        });

        console.log(listTransactions.data);
        let gen_categories;
        try {
          if (listTransactions) {
            gen_categories = await apiClient.post('/gen-categories',
              listTransactions.data
              , {
                params: {
                  user_id: user?.id
                }
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
                  setLoading(false);
                }
              } else {
                toast.error("A IA não gerou nenhuma categoria", { theme: "dark" });
              }
            } catch (error) {
              console.error("Error fetching percent categories:", error);
              setLoading(false);
              return;
            }
          } else {
            toast.error("Não há nenhuma transação!", { theme: "dark" });
          }
        } catch (error) {
          console.error("Error generating categories:", error);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setLoading(false);
        return;
      }
      primeiraRenderizacao.current = false;
    }
  };

  const gerarCoresComPaleta = (quantidade: any) => {
    const cores = [...paletaCores]; // Copia a paleta para não modificar a original
    const resultado = [];

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
        <main className={styles.container}>
          {primeiraRenderizacao.current ? (
            <div className="flex items-center justify-center h-screen">
                <button
                onClick={fetchCategories}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-6 rounded-full w-32 h-32 flex items-center justify-center text-2xl"
                >
                Go!
                </button>
            </div>
          ) : null}

          {loading ? (
            <div id = "graph" className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
              <div className={styles.spinner}><FaSpinner color='#FFF' size={40} /></div>
              <p>Aguarde um momento! Nossa IA está trabalhando<span className={styles.dots}></span></p>
            </div>
          ) : (
            <>
              <section className={styles.containerHeader}>
                <h1>CATEGORIAS</h1>
                <h2>Separamos seus gastos para você</h2>
              </section>


              <div className={styles.chartContainer}>
                <Donut
                  categories={categorias.map((data) => data.categoria)}
                  data={categorias.map((data) => data.porcentagem)} />
              </div>


                <section className={styles.categoriasList}>
                {categorias.map((categoria) => (
                  <div key={categoria.categoria} className={`${styles.categoriaItem} flex flex-col items-center`}>
                  <h3 className="text-center text-sm truncate w-full">{categoria.categoria}</h3>
                  <p>{categoria.porcentagem}%</p>
                  </div>
                ))}
                </section>
            </>)}
        </main>
      </AuthProvider>
    </>
  )
}