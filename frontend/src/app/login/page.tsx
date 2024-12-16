"use client";

import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import { Roboto } from "next/font/google";
import Image from "next/image";
import logo from "../assets/logo.png"

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

const roboto700 = Roboto({
    subsets: ["latin"],
    weight: "700"
})


type FormData = {
    email: string
    password: string
}

export default function loginScreen()
{

    const {register,handleSubmit,formState:{errors}} = useForm<FormData>()
    const printData: SubmitHandler<FormData> = (data) => {
        console.log(data)
    }

    return (
        <div id = "screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center">
            <div id = "forms-container" className ={`bg-backgroundLightGray rounded-lg h-[700px] w-[500px] ${roboto400.className}`}>
                <div id = "logo-container" className = "flex justify-center items-center">
                    <Image src = {logo} alt = "logo" width={400} height={400}/>
                </div>
                <form onSubmit = {handleSubmit(printData)}>
                <div id = "forms-inputs" className = "grid grid-cols-1 gap-y-6 mt-[0px] w-[436px]">
                    <div className = "ml-[32px]">
                        <input id = "email" type = "email" placeholder = "E-mail" {...register("email", {required: true})} className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                    {   errors.email && <span className = {`${roboto700.className} text-[#ff0f0f]`}>Este campo é obrigatório</span>}
                    </div>

                    <div className = "ml-[32px] ">
                        <input type = "password" placeholder = "Senha" {...register("password", {required: true})} className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                        {errors.password && <span className = {`${roboto700.className} text-[#ff0f0f]`}>Este campo é obrigatório</span>}
                    </div>
                    
                    
                </div>

                    <div className = {`${roboto700.className} mt-[96px] flex flex-col items-center`}>
                        <a href = "https://youtube.com" className="underline">Ainda não tem uma conta? Cadastre-se clicando aqui!</a>
                        <button type = "submit" className = "w-[320px] h-[48px] bg-econGreen rounded-lg drop-shadow-xl text-white">Login</button>
                    </div>
                    
                    
                </form>
            </div>
        </div>
    )
}
