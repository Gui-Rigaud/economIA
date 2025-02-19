import Image from "next/image";
import React from "react";
import { Roboto } from "next/font/google";
import logo from '@/app/assets/logo.png'
const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})



export default function SideBar() {
return (
    <div id = "sidebar" className = {`bg-econBlue w-[300px] h-screen flex flex-col items-center ${roboto400.className}`}>
        <div className = "flex justify-center items-center h-[100px]">
            <Image src = {logo} alt = "Logo" width = {160} height = {160} className = "mt-[25px]"/>
        </div>
        <div className = "flex flex-col items-center justify-center h-[100px]">
            <p className = "text-white text-[20px]">Gráficos</p>
        </div>
        <div className = "flex flex-col items-center justify-center h-[100px]">
            <p className = "text-white text-[20px]">Resumo mensal dos gastos</p>
        </div>
        <div className = "flex flex-col items-center justify-center h-[100px]">
            <p className = "text-white text-[20px]">Sugestões</p>
        </div>
    </div>
)}