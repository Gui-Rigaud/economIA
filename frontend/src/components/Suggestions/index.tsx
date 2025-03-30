"use client";

import { setupAPIClient } from "@/services/api";
import React, { useState, useContext, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "@/contexts/AuthContext";
import { Roboto } from "next/font/google";
import Spinner from "@/components/Spinner/Spinner";

const roboto400 = Roboto({
  subsets: ["latin"],
  weight: "400"
});

interface Suggestion {
  id: string;
  frase: string;
}

interface SuggestionsProps {
  setShowButtons: (show: boolean) => void;
  primeiraRenderizacao: React.RefObject<boolean>;
}

export function Suggestions({ setShowButtons }: SuggestionsProps) {
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
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!primeiraRenderizacao.current && textContainerRef.current) {
      const textElements = textContainerRef.current.querySelectorAll("p");
      textElements.forEach((element, index) => {
        element.classList.add("animate-fadeInUp");
        element.style.animationDelay = `${index * 0.2}s`;
      });
    }
  }, [dados]);

  const fetchSuggestion = async () => {
    if (!user?.id) return;

    setLoading(true);

    try {
      const response = await apiClient.get("/suggestion", {
        params: { user_id: user.id }
      });

      if (response.data) {
        setDados(response.data.sugestoes);
      } else {
        toast.error("Não foi possível encontrar sugestões", { theme: "dark" });
      }
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
      toast.error("Erro ao buscar sugestões", { theme: "dark" });
    } finally {
      setLoading(false);
      setShowPhrase(true);
      setShowButtons(true);
      primeiraRenderizacao.current = false;
    }
  };

  useEffect(() => {
    if (primeiraRenderizacao.current && user?.id) {
      fetchSuggestion();
    }
  }, [user?.id]); // Executa quando o user.id estiver disponível

  return (
    <div id="suggestions" className="flex flex-col justify-center items-center text-black min-h-screen">
      {loading ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
          <p className="text-white text-xl">Aguarde um momento! Nossa IA está trabalhando<span className="dots"></span></p>
        </div>
      ) : (
        <>
          {showPhrase && (
            <div
              id="text-container"
              ref={textContainerRef}
              className={`bg-white rounded-2xl shadow-lg w-[50%] h-[70%] flex flex-col ${roboto400.className}`}
            >
              <div className="bg-econGreen text-white p-4 rounded-t-2xl">
                <h2 className="font-bold text-lg">Sugestões</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {dados?.length > 0 ? (
                  dados.map(({ id, frase }) => (
                    <p key={id} className="mb-1 p-4 bg-gray-100 rounded-lg">
                      <strong>{id}.</strong> {frase}
                    </p>
                  ))
                ) : (
                  <p className="mb-1 p-4">Nenhuma sugestão disponível</p>
                )}
              </div>
            </div>
          )}
        </>
      )}

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
        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}