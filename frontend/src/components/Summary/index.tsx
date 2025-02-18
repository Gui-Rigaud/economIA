import { Roboto } from "next/font/google";

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

export function Summary() 
{
    return (
        <div id = "spendings-summary" className = "bg-backgroundLightGray flex justify-center items-center text-black">
            <div id = "text-container" className = {`bg-gray-200 border-4 border-black rounded-3xl w-3/4 mx-auto flex flex-col justify-center items-center ${roboto400.className} text-[24px]`}>
                <p className="mb-4 font-bold">Resumo de gastos mensais</p>
                <p className="mb-1 p-4">Receita :</p>
                <p className="mb-1 p-4">Despesas totais :</p>
                <p className="mb-1 p-4">Saldo :</p>
            </div>
        </div>
    )
}