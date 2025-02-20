import Image from "next/image";
import React from "react";
import { Roboto } from "next/font/google";
import logo from '@/app/assets/logo.png'
import Link from "next/link";
const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})



export default function SideBar() {
return (
    <div id = "sidebar" className = {`bg-econDarkGreen w-[300px] h-full flex flex-col mt-[20px] items-center ${roboto400.className}`}>
        <div className = "flex flex-col items-center justify-center h-[100px]">
            <Link href = "#graph" className = "text-white text-[20px]">Gráficos</Link>
        </div>
        <div className = "flex flex-col items-center justify-center h-[100px]">
            <Link href = "#spendings-summary" className = "text-white text-[20px]">Resumo mensal dos gastos</Link>
        </div>
        <div className = "flex flex-col items-center justify-center h-[100px]">
            <Link href = "#suggestions" className = "text-white text-[20px]">Sugestões</Link>
        </div>
    </div>
)}