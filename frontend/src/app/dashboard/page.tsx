'use client';

import { Categorias } from "@/components/Categorias";
import { Summary } from "@/components/Summary";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suggestions } from "@/components/Suggestions";

export default function Dashboard() {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <div className="flex-grow">
          <Categorias />
          <Summary />
          <Suggestions />
        </div>
      </div>
    </AuthProvider>
  );
}