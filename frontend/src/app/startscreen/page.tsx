import React from "react";
import logoblack from "../assets/logoblack.png";
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

export default function startScreen()
{
    return (
    <div id = "screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center">
        <div id = "main-container" className = "bg-backgroundLightGray rounded-lg h-[700px] w-[1000px]">
            <div id = "logo-container" className = "flex justify-center items-center">
                    <Image src = {logoblack} alt = "logo" width={200} height={200}/>
            </div>

            <div id = "text-container" className = {`flex flex-col justify-center items-center ${roboto400.className} text-[24px]`}>
                <p className="mb-4">Bem-vindo ao economIA!</p>
                <p className="mb-4">economIA é a sua mais nova plataforma de gestão financeira baseada em I.A</p>
                <p className="mb-4">Faça login caso já tenha uma conta ou cadastre-se caso seja novo!</p>
            </div>

            <div id = "buttons-container" className = "flex flex-col justify-center items-center mt-[64px]">
                <Link href = "/login" className = "w-[320px] h-[48px] bg-econGreen rounded-lg drop-shadow-xl text-white mb-4 flex justify-center items-center">Login</Link>
                <Link href = "/cadastro" className = "w-[320px] h-[48px] bg-econGreen rounded-lg drop-shadow-xl text-white mb-4 flex justify-center items-center">Cadastrar</Link>
            </div>

        </div>
    </div>  
    )
}