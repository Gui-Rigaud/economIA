"use client";

import React, { useContext } from "react";
import { Roboto } from "next/font/google";
import Image from 'next/image';
import logoBlackf from "../assets/logoblack.png";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AuthContext, AuthProvider } from "../../contexts/AuthContext";
import { FormEvent, useState } from 'react'
import Link from "next/link";

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

const roboto700 = Roboto({
    subsets: ["latin"],
    weight: "700"
})

export default function cadastroScreen() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext is null");
    }
    const { signUp } = authContext;
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [data_nasc, setData_nasc] = useState('');
    const [receita, setReceita] = useState('');


    async function handleSignup(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || senha === '' || cpf === '' || telefone === '' || data_nasc === '' || receita === '') {
            toast.error("Preencha todos os campos!", { theme: "dark" });
            return;
        }

        let data = {
            name,
            email,
            senha,
            cpf,
            telefone,
            data_nasc,
            receita
        }
        try {
            const response = await signUp(data);
            console.log(response);
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (

        <>
            <AuthProvider>
                <div id="screen" className="bg-backgroundLightGray h-screen w-screen flex justify-center items-center">

                    <form onSubmit={handleSignup}>
                        <div id="forms-container" className={`bg-backgroundLightGray shadow-[0px_10px_30px_rgba(0,0,0,0.3)] rounded-lg h-[700px] w-[1000px] ${roboto400.className}`}>
                            <div id="logo-container" className="flex justify-center items-center">
                                <Image src={logoBlackf} alt="logo" width={200} height={200} />
                            </div>

                            <div id="forms-inputs" className="grid grid-cols-2 mx-[32px] gap-x-[64px] gap-y-[20px]">
                                <div id="name-container" className="">
                                    <label htmlFor="name" className="block text-sm/6 font-medium text-black">Nome</label>
                                    <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome Sobrenome" className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`} />
                                </div>

                                <div id="email-container" className="">
                                    <label htmlFor="email" className="block text-sm/6 font-medium text-black">E-mail</label>
                                    <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com" className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`} />
                                </div>

                                <div id="password-container">
                                    <label htmlFor="password" className="block text-sm/6 font-medium text-black">Senha</label>
                                    <input id="password" onChange={(e) => setSenha(e.target.value)} value={senha} placeholder="Senha" type="password" className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`} />
                                </div>

                                <div id="cpf-container">
                                    <label htmlFor="cpf" className="block text-sm/6 font-medium text-black">CPF</label>
                                    <input id="cpf" placeholder="12345678912" value={cpf} onChange={(e) => setCpf(e.target.value)} className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`} />
                                </div>

                                <div id="cellphone-container">
                                    <label htmlFor="cellphone" className="block text-sm/6 font-medium text-black">Número de telefone</label>
                                    <input id="cellphone" placeholder="81999999999" value={telefone} onChange={(e) => setTelefone(e.target.value)} className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`} />
                                </div>

                                <div id="birthdate-container">
                                    <label htmlFor="birthdate" className="block text-sm/6 font-medium text-black">Data de nascimento</label>
                                    <input id="birthdate" placeholder="Data de nascimento" value={data_nasc} onChange={(e) => setData_nasc(e.target.value)} type="date" className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`} />
                                </div>

                                <div id="receita-container">
                                    <label htmlFor="receita" className="block text-sm/6 font-medium text-black">Receita</label>
                                    <input id="receita" placeholder="10000000" value={receita} onChange={(e) => setReceita(e.target.value)} className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`} />
                                </div>
                            </div>

                            <div className={`${roboto700.className} mt-[30px] flex flex-col items-center`}>
                                <Link href="/login" className="underline text-black hover:text-green-700 mb-2">Já tem um cadastro? Faça o login clicando aqui!</Link>
                                <button type="submit" className="w-[320px] h-[48px] bg-econGreen hover:bg-green-700 rounded-lg drop-shadow-xl text-white">Cadastrar</button>
                            </div>

                        </div>

                    </form>

                </div>
            </AuthProvider>
        </>
    )
}