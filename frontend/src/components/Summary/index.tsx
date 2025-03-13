import { useEffect, useRef } from "react";
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
    const [loading, setLoading] = useState(false);
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

    const fetchSummary = async () => {
        setLoading(true);

        try {
            const response = await apiClient.post("/budget", {
                user_id: user?.id
            });

            if (response.data) {
                setDados(response.data);
            } else {
                toast.error("Não foi possível encontrar os dados necessários para o resumo de gastos", { theme: "dark" });
            }
        } catch (error) {
            console.error("Erro ao buscar resumo:", error);
            toast.error("Erro ao buscar resumo de gastos", { theme: "dark" });
        } finally {
            setLoading(false);
            setShowSummary(true);
            primeiraRenderizacao.current = false;
        }
    };

    return (
        <>
            <AuthProvider>
                <div id="spendings-summary" className="flex flex-col justify-center items-center text-black min-h-screen">
                    {primeiraRenderizacao.current ? (
                        <div className="flex items-center justify-center h-screen">
                            <button
                                onClick={fetchSummary}
                                className={`bg-econGreen hover:bg-green-700 text-white font-bold py-6 px-6 rounded-full w-35 h-35 flex items-center justify-center text-2xl transition-all duration-500 ease-in-out transform ${showSummary ? 'scale-0' : 'scale-100'}`}
                            >
                                Resumo de gastos
                            </button>
                        </div>
                    ) : (
                        <>
                            {loading ? (
                                <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
                                    <p className="text-white text-xl">Carregando...</p>
                                </div>
                            ) : (
                                <div
                                    id="text-container"
                                    ref={textContainerRef}
                                    className={`bg-econGreen border-4 border-black rounded-3xl w-1/3 mx-auto flex flex-col justify-center items-center ${roboto400.className} text-[24px] text-white transition-all duration-500 ease-in-out transform ${showSummary ? 'scale-100' : 'scale-0'}`}
                                >
                                    <p className="mb-4 mt-3 font-bold opacity-0"><strong>Resumo de gastos mensais</strong></p>
                                    <p className="mb-1 p-4 opacity-0">Receita: {dados?.receita ?? "N/A"}</p>
                                    <p className="mb-1 p-4 opacity-0">Despesas totais: {dados?.despesa ?? "N/A"}</p>
                                    <p className="mb-1 p-4 opacity-0">Saldo: {dados?.saldo ?? "N/A"}</p>
                                </div>
                            )}
                        </>
                    )}
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