import { useEffect, useRef, useCallback } from "react";
import { setupAPIClient } from "@/services/api";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { Roboto } from "next/font/google";

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

interface Summary {
    receita: number;
    despesa: number;
    saldo: number;
}

export function Summary() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is null");
    }
    const { user } = authContext;
    const apiClient = setupAPIClient();
    const [dados, setDados] = useState<Summary>();
    const [showSummary, setShowSummary] = useState(false);
    const primeiraRenderizacao = useRef(true);
    const textContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!primeiraRenderizacao.current && textContainerRef.current) {
            const textElements = textContainerRef.current.querySelectorAll("p");
            textElements.forEach((element, index) => {
                element.classList.add("fade-in-up");
                element.style.animationDelay = `${index * 0.2}s`;
            });
        }
    }, [dados]);


    const fetchSummary = useCallback(async () => {    
        setTimeout(async () => {
            if (!user?.id) {
                toast.error("Usuário não encontrado. Tente novamente.", { theme: "dark" });
                return;
            }
    
            try {
                const response = await apiClient.get("/budget", {
                    params: { user_id: user.id }
                });
    
                if (response.data) {
                    const data_formatted = {
                        receita: response.data.receita.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ','),
                        despesa: response.data.despesa.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ','),
                        saldo: response.data.saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace('.', ',')
                    };
                    setDados({
                        receita: data_formatted.receita,
                        despesa: data_formatted.despesa,
                        saldo: data_formatted.saldo
                    });
                } else {
                    toast.error("Não foi possível encontrar os dados necessários para o resumo de gastos", { theme: "dark" });
                }
            } catch (error) {
                console.error("Erro ao buscar resumo:", error);
                toast.error("Erro ao buscar resumo de gastos", { theme: "dark" });
            } finally {
                setShowSummary(true);
                primeiraRenderizacao.current = false;
            }
        }, 1000); // Aguarda 1 segundo antes de executar a requisição
    }, [user?.id, apiClient]);

    useEffect(() => {
        if (primeiraRenderizacao.current && user?.id) {
            fetchSummary();
        }
    }, [user?.id, fetchSummary]); 

    return (
        <>
            <AuthProvider>
                <div id="spendings-summary" className="flex flex-col justify-center items-center text-black min-h-screen">
                    <>
                        <div
                            id="text-container"
                            ref={textContainerRef}
                            className={`w-[1300px] mx-auto grid grid-cols-3 grid-rows-3 gap- ${roboto400.className} text-[24px] text-white transition-all duration-500 ease-in-out transform ${showSummary ? 'scale-100' : 'scale-0'}`}
                        >
                            <p className="col-start-1 col-span-3 row-start-1 row-span-1 mb-1 font-bold opacity-0 text-[76px]"><strong>Esse é o resumo dos seus gastos:</strong></p>
                            <p className="w-full mb-1 col-start-1 col-span-2 row-start-2 row-span-2 p-4 opacity-0 text-[170px]">
                                <span className="text-[24px] block">Saldo disponível</span>
                                R${dados?.saldo ?? "N/A"}
                            </p>
                            <p className="w-full mb-1 col-start-3 col-span-1 row-start-2 row-span-1 p-4 opacity-0 text-[40px] text-white">Despesas totais: <span className="text-red-600">R${dados?.despesa ?? "N/A"}</span></p>
                            <p className="w-full mb-1 col-start-3 col-span-1 row-start-3 row-span-1 p-4 opacity-0 text-[40px] text-white">Seu Orçamento: <span className="text-green-600">R${dados?.receita ?? "N/A"}</span></p>
                        </div>
                    </>
                </div>
            </AuthProvider>
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .fade-in-up {
                    animation: fadeInUp 1s ease-out forwards;
                }
            `}</style>
        </>
    );
}