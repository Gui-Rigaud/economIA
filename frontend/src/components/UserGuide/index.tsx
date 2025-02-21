import { useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { Roboto } from "next/font/google";
import Link from "next/link";

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

export function UserGuide () {
    const [showGuide, setShowGuide] = useState(false);

    return (
        <>
        <AuthProvider>
            <div id = "user-guide" className = "flex flex-col justify-center items-center text-black min-h-screen">

                {!showGuide && (
                    <button 
                       onClick = {() => setShowGuide(true)}
                       className="mb-4 rounded-full bg-econGreen hover:bg-green-700 text-white font-bold py-6 px-6 w-35 h-35 flex items-center justify-center text-2xl"
                    >
                        Mostrar Guia
                    </button>
                )}

                {showGuide && (
                    <div id="text-container" className = {`bg-gray-200 border-4 border-black rounded-3xl w-2/3 mx-auto flex flex-col justify-center items-center ${roboto400.className} text-[24px] width-[10px] relative p-6`}>
                        
                        <button 
                            onClick = {() => setShowGuide(false)}
                            className="absolute top-3 right-3 mr-3 text-black hover:text-red-700 text-3xl"
                        >
                            X
                        </button>

                        <p className = "mb-4 mt-3 font-bold"><strong>Guia do Usuário</strong></p>
                        <p className = "mb-1 ml-2 p-4 text-justify">Neste campo, te ajudaremos a entender como funciona nosso site e como você pode acessar as informações necessárias mais facilmente</p>      
                        
                        <div id = "sidebar-text-container" className = {`bg-gray-300 border-4 border-black rounded-3xl mx-auto ml-3 mr-3 flex flex-col justify-center items-center ${roboto400.className} text-[24px] width-[10px] w-full p-4`}>
                            <p className = "mb-4 mt-3 font-bold"><strong className = "hover:text-econGreen">Sidebar</strong></p>
                            <p className = "mb-1 p-3 text-justify">No lado esquerdo de sua tela há alguns nomes escritos em branco. Essa é a <strong className = "hover:text-green-600">Sidebar</strong></p>
                            <p className = "mb-1 p-3 text-justify">A sidebar é responsável por facilitar o acesso aos outros campos presentes em nossa página.</p>
                            <p className = "mb-1 p-3 text-justify">Basta um clique no nome do campo desejado e ela te leva até lá, onde você poderá realizar a operação do respectivo campo</p>
                        </div>
                        <p className = "p-3"></p>

                        <div id = "graficos-text-container" className = {`bg-gray-300 border-4 border-black rounded-3xl mx-auto ml-3 mr-3 flex flex-col justify-center items-center ${roboto400.className} text-[24px] width-[10px] w-full p-4`}>
                            <p className = "mb-4 mt-3 font-bold"><Link href = "#graph"><strong className = "hover:text-econGreen">Gráficos</strong></Link></p>
                            <p className = "mb-1 p-3 text-justify">Em sua sidebar, é possível ver o nome de alguns campos presentes em nossa página. Entre elas está o campo <Link href = "#graph"><strong className = "hover:text-econGreen">Gráficos</strong></Link></p>
                            <p className = "mb-1 p-3 text-justify">Nesse campo, é possível gerar um gráfico baseado nos gastos que você teve durante o mês</p>
                            <p className = "mb-1 p-3 text-justify">Ele organiza suas despesas em diferentes categorias e as apresenta em formato de <strong className = "text-green-600">Donut</strong></p>
                        </div>
                        <p className = "p-3"></p>

                        <div id = "summary-text-container" className = {`bg-gray-300 border-4 border-black rounded-3xl mx-auto ml-3 mr-3 flex flex-col justify-center items-center ${roboto400.className} text-[24px] width-[10px] w-full p-4`}>
                            <p className = "mb-4 mt-3 font-bold"><Link href = "#spendings-summary"><strong className = "hover:text-econGreen">Resumo dos gastos mensais</strong></Link></p>
                            <p className = "mb-1 p-3 text-justify">Além do campo de <Link href = "#graph"><strong className = "hover:text-econGreen">Gráficos</strong></Link>, 
                                                        também é possivél ver o campo de <Link href = "#spendings-summary"><strong className = "hover:text-econGreen">Resumo dos gastos mensais</strong></Link></p>
                            <p className = "mb-1 p-3 text-justify">Nesse campo, é possível gerar um resumo em formato de texto das despesas que você teve nesse mês</p>
                            <p className = "mb-1 p-3 text-justify">Ele organiza suas despesas em <strong className = "text-green-600">Receita</strong>, <strong className = "text-green-600">Despesas totais</strong> e <strong className = "text-green-600">Saldo</strong>, gerando assim um gráfico </p>
                        </div>
                        <p className = "p-3"></p>

                        <div id = "sugestions-text-container" className = {`bg-gray-300 border-4 border-black rounded-3xl mx-auto ml-3 mr-3 flex flex-col justify-center items-center ${roboto400.className} text-[24px] width-[10px] w-full p-4`}>
                            <p className = "mb-4 mt-3 font-bold"><Link href = "#suggestions"><strong className = "hover:text-econGreen">Sugestões</strong></Link></p>
                            <p className = "mb-1 p-3 text-justify">Como último campo da nossa sidebar temos o campo voltado para <Link href = "#suggestions"><strong className = "hover:text-econGreen">Sugestões</strong></Link></p>
                            <p className = "mb-1 p-3 text-justify">Nesse último campo, a nossa IA irá gerar sugestões de gastos mais conscientes baseados nos gastos do usuário e nas categorias geradas pelo gráfico</p>
                        </div>
                        <p className = "p-3"></p>

                    </div>
                )}
            </div>
        </AuthProvider>
        </>
    );
}