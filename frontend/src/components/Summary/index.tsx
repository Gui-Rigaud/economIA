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
    receita: string;
    despesa: string;
    saldo: string;
}

function formatNumberString(numberString: string | undefined) {
    console.log("numberString", numberString);
    if (!numberString) {
        return undefined;
    }
    
    // Handle the decimal part (last 3 characters)
    let novaString: string = "";
    // Add the last 3 characters (decimals including dot)
    novaString += numberString.slice(-3);
    
    // Get the whole number part (everything before the decimal point)
    const wholeNumberPart = numberString.slice(0, -3);
    if (wholeNumberPart.length === 0) {
        return novaString; // Return if there's only decimal part
    }
    
    // Format the whole number part with thousands separators
    let formattedWhole = "";
    let contador: number = 0;
    
    for (let i = wholeNumberPart.length - 1; i >= 0; i--) {
        formattedWhole = wholeNumberPart[i] + formattedWhole;
        contador++;
        if (contador === 3 && i > 0) {
            formattedWhole = "." + formattedWhole;
            contador = 0;
        }
    }
    
    return formattedWhole + novaString;
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
                <>
                    <div id="spendings-summary" className="flex flex-col justify-center items-center text-black py-12 md:py-16 lg:py-20">
                        <div
                            id="text-container"
                            ref={textContainerRef}
                            className={`w-full max-w-7xl mx-auto px-4 md:w-[90%] lg:w-[85%] transition-all duration-500 ease-in-out transform ${showSummary ? 'scale-100' : 'scale-0'} ${roboto400.className}`}
                        >
                            {/* Heading */}
                            <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 md:mb-8 lg:mb-10">
                                Esse é o resumo dos seus gastos:
                            </h2>
                            
                            {/* Main content grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                                {/* Saldo Card - Takes full width on mobile, 2/3 on larger screens */}
                                <div className=" rounded-lg p-4 md:p-6 lg:p-8 col-span-1 md:col-span-2 lg:col-span-2 row-span-2">
                                    <span className="text-white text-lg md:text-xl lg:text-2xl block mb-2">Saldo disponível</span>
                                    <span className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold whitespace-normal break-words">
                                    R${formatNumberString(dados?.saldo.toString()) ?? "N/A"}
                                    </span>
                                </div>
                                
                                {/* Despesas Card */}
                                <div className=" rounded-lg p-4 md:p-6 lg:p-8 col-span-1 row-span-1">
                                    <span className="text-white text-lg md:text-xl lg:text-2xl">Despesas totais:</span>
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
                                        <span className="text-red-600">R${formatNumberString(dados?.despesa.toString()) ?? "N/A"}</span>
                                    </div>
                                </div>
                                
                                {/* Orçamento Card */}
                                <div className=" rounded-lg p-4 md:p-6 lg:p-8 col-span-1 row-span-1">
                                    <span className="text-white text-lg md:text-xl lg:text-2xl">Seu Orçamento:</span>
                                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
                                        <span className="text-green-600">R${formatNumberString(dados?.receita.toString()) ?? "N/A"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
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