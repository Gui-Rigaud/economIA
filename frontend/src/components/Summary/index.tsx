import { useEffect, useState } from "react";
import { Roboto } from "next/font/google";

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

export function Summary() 
{
    const [dados, setDados] = useState<any | null>(null);

    useEffect(() => {
        fetch("/Users/joaoguilhermeohashiramos/Desktop/periodo_3/DS_Project/ProjetoDS/economIA/backend") // Substitua pela URL do seu backend
        .then((res) => res.json())
        .then((data) => setDados(data)) // Armazena o objeto no estado
        .catch((error) => console.error("Erro ao buscar dados:", error));
    }, []);

    return (
        <div id = "spendings-summary" className = "bg-backgroundLightGray flex justify-center items-center text-black">
            { dados ? (
                <div id = "text-container" className = {`bg-gray-200 border-4 border-black rounded-3xl w-3/4 mx-auto flex flex-col justify-center items-center ${roboto400.className} text-[24px]`}>
                    <p className="mb-4 font-bold"><strong>Resumo de gastos mensais</strong></p>
                    <p className="mb-1 p-4">Receita : {dados.Receita}</p>
                    <p className="mb-1 p-4">Despesas totais : {dados.Despesas}</p>
                    <p className="mb-1 p-4">Saldo : {dados.Saldo}</p>
                </div>
            ):(
                <div id = "loading-container" className = {`bg-gray-200 border-4 border-black rounded-3xl w-3/4 mx-auto flex flex-col justify-center items-center ${roboto400.className} text-[24px]`}>
                    <p>Carregando...</p>
                </div>
            )}
        </div>
    )
}