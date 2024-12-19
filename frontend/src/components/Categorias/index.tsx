"use client"

import styles from './categorias.module.scss'
import ApexCharts from 'apexcharts'
import Donut from '../Graph';

const categorias = [
  {
      "categoria": "Alimentação/Restaurante",
      "porcentagem": 35
  },
  {
      "categoria": "Compras/Varejo",
      "porcentagem": 15
  },
  {
      "categoria": "Bares/Lazer",
      "porcentagem": 35
  },
  {
      "categoria": "Mercado/Supermercado",
      "porcentagem": 10
  },
  {
      "categoria": "Pagamento/Crédito",
      "porcentagem": 5
  },
];

export function Categorias(){
  
  const paletaCores = [
    "#216869", "#48a078", "#9cc5a1", "#FFE4", "#6BE8A4", "#132414",
    "#1B998B", "#2D3047", "#FFFD82", "#FF9B71", "#E84855", "#F9DC5C",
    "#3185FC", "#EFBCD5", "#9A031E", "#5F0F40", "#0F4C5C", "#E36414"
  ];

  const gerarCoresComPaleta = (quantidade:any) => {
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

  

  let listaCategorias = categorias.map((categoria) => categoria.categoria);
  console.log(listaCategorias);

  return(
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>CATEGORIAS</h1>
        <h2>Separamos seus gastos para você</h2> 
      </section>


      <div className={styles.chartContainer}>
        <Donut
        categories={categorias.map((data) => data.categoria)}
        data={categorias.map((data) => data.porcentagem)}/>
      </div>


      <section className={styles.categoriasList}>
        {categorias.map((categoria) => (
          <div key={categoria.categoria} className={styles.categoriaItem}>
            <h3>{categoria.categoria}</h3>
            <p>{categoria.porcentagem}%</p>
          </div>
        ))}
      </section>
    </main>
  )
}