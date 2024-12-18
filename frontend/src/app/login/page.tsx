"use client";

import React from "react";
import { useContext, FormEvent, useState } from 'react'
import { Roboto } from "next/font/google";
import Image from "next/image";
import logoblack from "../assets/logoblack.png"
import Link from "next/link";
import { AuthContext, AuthProvider } from "../../contexts/AuthContext";
import { toast } from 'react-toastify';
import { canSSRGuest } from '@/utils/canSSRGuest';

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

const roboto700 = Roboto({
    subsets: ["latin"],
    weight: "700"
})

export default function loginScreen()
{
    

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    async function handleLogin(event: FormEvent) {

        const { signIn } = useContext(AuthContext);
      
        event.preventDefault();
    
        if(email === '' || password === ''){
          toast.error("Preencha todos os campos!", { theme: "dark" });
          return;
        }
      
        let data = {
          email,
          password
        }
      
        await signIn(data);
     
      }

    
    
    return (
        <>
        <AuthProvider>
        <div id = "screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center">
            <div id = "forms-container" className ={`bg-backgroundLightGray rounded-lg h-[700px] w-[500px] ${roboto400.className}`}>
                <div id = "logo-container" className = "flex justify-center items-center">
                    <Image src = {logoblack} alt = "logo" width={400} height={400}/>
                </div>
                <form onSubmit = {handleLogin}>
                <div id = "forms-inputs" className = "grid grid-cols-1 gap-y-6 mt-[0px] w-[436px]">
                    <div className = "ml-[32px]">
                        <input id = "email" type = "email"  onChange={ (e) => setEmail(e.target.value)} value = {email} placeholder = "E-mail" className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                    </div>

                    <div className = "ml-[32px] ">
                        <input type = "password" onChange={ (e) => setPassword(e.target.value)} placeholder = "Senha" value = {password} className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                    </div>
                    
                    
                </div>

                    <div className = {`${roboto700.className} mt-[96px] flex flex-col items-center`}>
                        <Link href = "/cadastro" className="underline">Ainda não tem uma conta? Cadastre-se clicando aqui!</Link>
                        <button type = "submit" className = "w-[320px] h-[48px] bg-econGreen rounded-lg drop-shadow-xl text-white">Login</button>
                    </div>
                    
                    
                </form>
            </div>
        </div>
        </AuthProvider>
        </>
    )
}
