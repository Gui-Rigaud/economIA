import styles from './categorias.module.scss'


export function Categorias(){

  const categorias = [
    { id: 1, nome: 'Alimentação', descricao: 'Gastos com comida e supermercado',  },
    { id: 2, nome: 'Transporte', descricao: 'Gastos com transporte público e combustível' },
    { id: 3, nome: 'Lazer', descricao: 'Gastos com entretenimento e viagens' },
    { id: 4, nome: 'Educação', descricao: 'Gastos com estudos e cursos' },
  ];
  
  return(
    <main className={styles.container}>
      <section className={styles.containerHeader}>
        <h1>CATEGORIAS</h1>
        <h2>Separamos seus gastos para você</h2> 
      </section>

      <section className={styles.categoriasList}>
        {categorias.map((categoria) => (
          <div key={categoria.id} className={styles.categoriaItem}>
            <h3>{categoria.nome}</h3>
            <p>{categoria.descricao}</p>
          </div>
        ))}
      </section>
    </main>
  )
}