"use client";

import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import { Roboto } from "next/font/google";
import Image from "next/image";
import logoblack from "../assets/logoblack.png"

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

const roboto700 = Roboto({
    subsets: ["latin"],
    weight: "700"
})


type FormData = {
    name: string
    email: string
    password: string
    cpf: number
    cellphone: number
    birthdate: string
}

export default function cadastroScreen()
{
    const {register,handleSubmit,formState:{errors}} = useForm<FormData>()
    const printData: SubmitHandler<FormData> = (data) => {
        console.log(data)
    }

    return (
            

        <div id = "screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center">
            
            <form onSubmit={handleSubmit(printData)}>
                <div id = "forms-container" className ={`bg-backgroundLightGray rounded-lg h-[700px] w-[1000px] ${roboto400.className}`}>
                <div id = "logo-container" className = "flex justify-center items-center">
                    <Image src = {logoblack} alt = "logo" width={200} height={200}/>
                </div>

                    <div id = "forms-inputs" className = "grid grid-cols-2 mx-[32px] gap-x-[64px] gap-y-[32px]">
                        <div id = "name-container" className = "">
                            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Nome</label>
                            <input id = "name" placeholder = "Nome Sobrenome" {...register("name", {required: true})} className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                            {errors.name && <span className = {`${roboto700.className} text-[#ff0f0f]`}>Este campo é obrigatório</span>}
                        </div>

                        <div id = "email-container" className = "">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">E-mail</label>
                            <input id = "email" type = "email" placeholder = "exemplo@gmail.com" {...register("email", {required: true})} className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                            {errors.email && <span className = {`${roboto700.className} text-[#ff0f0f]`}>Este campo é obrigatório</span>}
                        </div>

                        <div id = "password-container">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Senha</label>
                            <input id = "password" placeholder = "Senha"  type = "password"{...register("password", {required: true})} className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                            {errors.password && <span className = {`${roboto700.className} text-[#ff0f0f]`}>Este campo é obrigatório</span>}
                        </div>

                        <div id = "cpf-container">
                            <label htmlFor="cpf" className="block text-sm/6 font-medium text-gray-900">CPF</label>
                            <input id = "cpf" placeholder = "12345678912" {...register("cpf", {required: true})} className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                            {errors.cpf && <span className = {`${roboto700.className} text-[#ff0f0f]`}>Este campo é obrigatório</span>}
                        </div>

                        <div id = "cellphone-container">
                            <label htmlFor="cellphone" className="block text-sm/6 font-medium text-gray-900">Número de telefone</label>
                            <input id = "cellphone" placeholder = "81999999999" {...register("cellphone", {required: true})} className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                            {errors.cellphone && <span className = {`${roboto700.className} text-[#ff0f0f]`}>Este campo é obrigatório</span>}
                        </div>

                        <div id = "birthdate-container">
                            <label htmlFor="birthdate" className="block text-sm/6 font-medium text-gray-900">Data de nascimento</label>
                            <input id = "birthdate" placeholder = "Data de nascimento" {...register("birthdate", {required: true})} type = "date" className = {`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `}/>
                            {errors.birthdate && <span className = {`${roboto700.className} text-[#ff0f0f]`}>Este campo é obrigatório</span>}
                        </div>
                    </div>

                    <div className = {`${roboto700.className} mt-[96px] flex flex-col items-center`}>
                        <button type = "submit" className = "w-[320px] h-[48px] bg-econGreen rounded-lg drop-shadow-xl text-white">Cadastrar</button>
                    </div>

                </div>

            </form>
            
        </div>
    )
}