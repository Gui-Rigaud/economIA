import React from "react";
import { Header } from "@/components/Header";

export default function DashboardLayout({children}:
  {children: React.ReactNode}
){
  return(
    <>
    <Header/>
    {children}
    </>
  )
}