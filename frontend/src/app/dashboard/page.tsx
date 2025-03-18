'use client';

import { Categorias } from "@/components/Categorias";
import { Summary } from "@/components/Summary";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suggestions } from "@/components/Suggestions";
import AISuggestionChat from "@/components/PerSuggestion";
export default function Dashboard() {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <div className="flex-grow">
          <Categorias />
          <Summary />
          <AISuggestionChat />
        </div>
      </div>
    </AuthProvider>
  );
}