'use client';

import { Categorias } from "@/components/Categorias";
import { Summary } from "@/components/Summary";
import { AuthProvider } from "@/contexts/AuthContext";
import { Suggestions } from "@/components/Suggestions";
import SideBar from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex-grow">
          <Categorias />
          <Summary />
          <Suggestions />
        </div>
      </div>
    </AuthProvider>
  );
}