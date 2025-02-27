"use client";

import { setupAPIClient } from "@/services/api";
import { useState, useContext, useRef } from "react";
import { toast } from "react-toastify";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { Roboto } from "next/font/google";
import { FaSpinner } from 'react-icons/fa';

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
});

interface Suggestion { 
    id: string;
    frase: string;
}

export function Suggestions() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is null");
    }
    const { user } = authContext;
    const apiClient = setupAPIClient();
    const [loading, setLoading] = useState(false);
    const [dados, setDados] = useState<Suggestion[]>([]);
    const [showPhrase, setShowPhrase] = useState(false);
    const primeiraRenderizacao = useRef(true);

    const fetchSuggestion = async () => {
        setLoading(true);
        
        try {
            const response = await apiClient.get("/suggestion");
            
            console.log(response.data);
            if (response.data) {
                setDados(response.data.sugestoes);
            } else {
                toast.error("Não foi possível encontrar os dados necessários para sugestões", { theme: "dark" });
            }
        } catch (error) {
            console.error("Erro ao buscar sugestões:", error);
            toast.error("Erro ao buscar sugestões", { theme: "dark" });
        } finally {
            setLoading(false);
            setShowPhrase(true);
            primeiraRenderizacao.current = false;
        }
    };

    return (
        <AuthProvider>
            <div id="suggestions" className="flex flex-col justify-center items-center text-black min-h-screen">
                {primeiraRenderizacao.current ? (
                    <div className="flex items-center justify-center h-screen">
                        <button
                            onClick={fetchSuggestion}
                            className="bg-econGreen hover:bg-green-700 text-white font-bold py-6 px-6 rounded-full w-30 h-35 flex items-center justify-center text-2xl"
                        >
                            Sugerir gestão de gastos
                        </button>
                    </div>
                ) : null}

                {loading ? (
                    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="animate-spin"><FaSpinner color='#FFF' size={40} /></div>
                        <p className="text-white text-xl">Aguarde um momento! Nossa IA está trabalhando<span className="dots"></span></p>
                    </div>
                ) : (
                    <>
                    { showPhrase && (<div id="text-container" className={`bg-gray-200 border-4 border-black rounded-3xl w-[900px] mx-auto flex flex-col justify-center items-center ${roboto400.className} text-[24px] width-[10px]`}>
                        <p key="#" className="mb-4 mt-3 font-bold"><strong>Sugestões</strong></p>
                        {dados.length > 0 ? (
                            dados.map(({ id, frase }) => (
                                <p key={id} className="mb-1 p-4">{id}: {frase}</p>
                            ))
                        ) : (
                            <p className="mb-1 p-4">Nenhuma sugestão disponível</p>
                        )}
                    </div>)}
                    </>
                )}
            </div>
        </AuthProvider>
    );
}
