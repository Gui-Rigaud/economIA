"use client";

import React from "react";
import { Roboto } from "next/font/google";
import Image from 'next/image';
import logoBlackf from "../assets/logoblack.png";
import Router from "next/router";
import { toast } from 'react-toastify';
import { AuthContext, AuthProvider } from "../../contexts/AuthContext";
import { useContext, FormEvent, useState } from 'react'


const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

const roboto700 = Roboto({
    subsets: ["latin"],
    weight: "700"
})


export default function cadastroScreen() {
    const { signUp } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [data_nasc, setData_nasc] = useState('');


    async function handleSignup(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || senha === '' || cpf === '' || telefone === '' || data_nasc === '') {
            toast.error("Preencha todos os campos!", { theme: "dark" });
            return;
        }

        let data = {
            name,
            email,
            senha,
            cpf,
            telefone,
            data_nasc
        }
        try {
            const response = await signUp(data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <>
            <AuthProvider>
                <div id="screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center">

                    <form onSubmit={handleSignup}>
                        <div id="forms-container" className={`bg-backgroundLightGray rounded-lg h-[700px] w-[1000px] ${roboto400.className}`}>
                            <div id="logo-container" className="flex justify-center items-center">
                                <Image src={logoBlackf} alt="logo" width={200} height={200} />
                            </div>

                            <div id="forms-inputs" className="grid grid-cols-2 mx-[32px] gap-x-[64px] gap-y-[32px]">
                                <div id="name-container" className="">
                                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">Nome</label>
                                    <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome Sobrenome" className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
                                </div>

                                <div id="email-container" className="">
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">E-mail</label>
                                    <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com" className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
                                </div>

                                <div id="password-container">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">Senha</label>
                                    <input id="password" onChange={(e) => setSenha(e.target.value)} value={senha} placeholder="Senha" type="password" className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
                                </div>

                                <div id="cpf-container">
                                    <label htmlFor="cpf" className="block text-sm/6 font-medium text-gray-900">CPF</label>
                                    <input id="cpf" placeholder="12345678912" value={cpf} onChange={(e) => setCpf(e.target.value)} className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
                                </div>

                                <div id="cellphone-container">
                                    <label htmlFor="cellphone" className="block text-sm/6 font-medium text-gray-900">Número de telefone</label>
                                    <input id="cellphone" placeholder="81999999999" value={telefone} onChange={(e) => setTelefone(e.target.value)} className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
                                </div>

                                <div id="birthdate-container">
                                    <label htmlFor="birthdate" className="block text-sm/6 font-medium text-gray-900">Data de nascimento</label>
                                    <input id="birthdate" placeholder="Data de nascimento" value={data_nasc} onChange={(e) => setData_nasc(e.target.value)} type="date" className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
                                </div>
                            </div>

                            <div className={`${roboto700.className} mt-[96px] flex flex-col items-center`}>
                                <button type="submit" className="w-[320px] h-[48px] bg-econGreen rounded-lg drop-shadow-xl text-white">Cadastrar</button>
                            </div>

                        </div>

                    </form>

                </div>
            </AuthProvider>
        </>
    )
}