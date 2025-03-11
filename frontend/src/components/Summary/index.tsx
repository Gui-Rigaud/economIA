import { setupAPIClient } from "@/services/api";
import { useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { Roboto } from "next/font/google";

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

interface Summary {
    receita: number;
    despesa: number
    saldo: number;
}

export function Summary() 
{
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is null");
    }
    const { user } = authContext;
    const apiClient = setupAPIClient();
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<Summary>();
    const primeiraRenderizacao = useRef(true);

    // setDados({
    //     receita: 
    //     despesas:
    //     saldo:
    // }) 

    // useEffect(() => {
    //     fetch("/Users/joaoguilhermeohashiramos/Desktop/periodo_3/DS_Project/ProjetoDS/economIA/backend") // Substitua pela URL do seu backend
    //     .then((res) => res.json())
    //     .then((data) => setDados(data)) // Armazena o objeto no estado
    //     .catch((error) => console.error("Erro ao buscar dados:", error));
    // }, []);

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
                        className="bg-econGreen hover:bg-green-700 text-white font-bold py-6 px-6 rounded-full w-35 h-35 flex items-center justify-center text-2xl duration-300"
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
                        <div id="text-container" className={`bg-gray-200 border-4 border-black rounded-3xl w-1/3 mx-auto flex flex-col justify-center items-center ${roboto400.className} text-[24px] width-[10px]`}>
                            <p className="mb-4 mt-3 font-bold"><strong>Resumo de gastos mensais</strong></p>
                            <p className="mb-1 p-4">Receita: {dados?.receita ?? "N/A"}</p>
                            <p className="mb-1 p-4">Despesas totais: {dados?.despesa ?? "N/A"}</p>
                            <p className="mb-1 p-4">Saldo: {dados?.saldo ?? "N/A"}</p>
                        </div>
                    )}
                </>
            )}
        </div>
        </AuthProvider>
        </>
    );
}