'use client';

import { Categorias } from "@/components/Categorias"
import { AuthProvider } from "@/contexts/AuthContext";

export default function Dashboard() {

  return (
    <>
      <AuthProvider>
        <Categorias />
      </AuthProvider>
    </>
  )
}