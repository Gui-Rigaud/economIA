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
                    setDados(response.data);
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
    };

    useEffect(() => {
        if (primeiraRenderizacao.current && user?.id) {
            fetchSummary();
        }
    }, [user?.id]); // Agora, a função só executa quando `user.id` estiver disponível    

    return (
        <>
            <AuthProvider>
                <div id="spendings-summary" className="flex flex-col justify-center items-center text-black min-h-screen">
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