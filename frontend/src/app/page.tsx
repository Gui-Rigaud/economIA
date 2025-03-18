'use client'

import React from "react";
import logoblack from "./assets/logoblack.png";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

const roboto700 = Roboto({
    subsets: ["latin"],
    weight: "700"
})

export default function Home()
{
  return (
    <div id = "screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center text-black">
        <div id = "main-container" className = "bg-backgroundLightGray rounded-lg h-[700px] w-[95%] 2sm:w-95/100 sm:w-11/12 md:w-10/12 lg:w-[1000px] mx-auto">
            <div id = "logo-container" className = "flex justify-center items-center mt-10">
                    <Image src = {logoblack} alt = "logo" width={200} height={200}/>
            </div>

            <div id = "text-container" className = {`flex flex-col justify-center items-center ${roboto400.className} text-lg md:text-[24px] text-center px-4 md:px-6 `}>
                <p className=" ">Bem-vindo ao economIA!</p>
                <p className="mb-4 ">economIA é a sua mais nova plataforma de gestão financeira baseada em I.A</p>
                <p className="mb-4 ">Faça login caso já tenha uma conta ou cadastre-se caso seja novo!</p>
            </div>

            <div id = "buttons-container" className = "flex flex-col justify-center items-center mt-[64px]">
                <Link href = "/login" className = "w-[320px] h-[48px] bg-econGreen hover:bg-green-700 rounded-lg drop-shadow-xl text-white mb-4 flex justify-center items-center">Login</Link>
                <Link href = "/cadastro" className = "w-[320px] h-[48px] bg-econGreen hover:bg-green-700 rounded-lg drop-shadow-xl text-white mb-4 flex justify-center items-center">Cadastrar</Link>
            </div>

        </div>
    </div>  
    )
}