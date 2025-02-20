'use client';

import { Categorias } from "@/components/Categorias"
import { Summary } from "@/components/Summary";
import { AuthProvider } from "@/contexts/AuthContext";

export default function Dashboard() {

  return (
    <>
      <AuthProvider>
        <Categorias />
        <Summary />
      </AuthProvider>
    </>
  )
}