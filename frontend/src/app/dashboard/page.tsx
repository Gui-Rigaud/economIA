'use client';

import { useState, useRef } from 'react';
import { Categorias } from "@/components/Categorias";
import { Summary } from "@/components/Summary";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suggestions } from "@/components/Suggestions";
import AISuggestionChat from "@/components/PerSuggestion";

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState<'suggestions' | 'aisuggestionchat'>('suggestions');
  const [showButtons, setShowButtons] = useState(false);
  const primeiraRenderizacao = useRef(true);

  return (
    <AuthProvider>
      <div className="flex h-screen">
        <div className="flex-grow">
          <Summary />
          <Categorias />
          {showButtons && (
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => setSelectedComponent('suggestions')}
                className={`px-4 py-2 rounded ${selectedComponent === 'suggestions' ? 'bg-econGreen text-white' : 'bg-gray-200 text-black'}`}
              >
                Sugestões Padrão
              </button>
              <button
                onClick={() => setSelectedComponent('aisuggestionchat')}
                className={`px-4 py-2 rounded ${selectedComponent === 'aisuggestionchat' ? 'bg-econGreen text-white' : 'bg-gray-200 text-black'}`}
              >
                Sugestões Personalizadas
              </button>
            </div>
          )}
          <div className="relative">
            <div className={`absolute inset-0 ${selectedComponent === 'suggestions' ? 'block' : 'hidden'}`}>
              <Suggestions setShowButtons={setShowButtons} primeiraRenderizacao={primeiraRenderizacao}/>
            </div>
            <div className={`absolute inset-0 ${selectedComponent === 'aisuggestionchat' ? 'block' : 'hidden'}`}>
              <AISuggestionChat />
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}