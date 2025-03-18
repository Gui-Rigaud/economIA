"use client";

import React, { useContext } from "react";
import { Roboto } from "next/font/google";
import Image from 'next/image';
import logoBlackf from "../assets/logoblack.png";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AuthContext, AuthProvider } from "../../contexts/AuthContext";
import { FormEvent, useState } from 'react';
import Link from "next/link";

const roboto400 = Roboto({ subsets: ["latin"], weight: "400" });
const roboto700 = Roboto({ subsets: ["latin"], weight: "700" });

export default function CadastroScreen() {
    const authContext = useContext(AuthContext);
    if (!authContext) throw new Error("AuthContext is null");
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
        if (!name || !email || !senha || !cpf || !telefone || !data_nasc || !receita) {
            toast.error("Preencha todos os campos!", { theme: "dark" });
            return;
        }
        const data = { name, email, senha, cpf, telefone, data_nasc, receita };
        try {
            const response = await signUp(data);
            console.log(response);
            router.push('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthProvider>
            <div id="screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center">
                <form onSubmit={handleSignup}>
                    {/* Forms-container para celular (< 640px) e telas maiores */}
                    <div id="forms-container" className={`bg-backgroundLightGray rounded-xl h-[90vh] w-[95%] sm:h-[700px] sm:w-[1000px] mx-auto p-4 sm:p-8 shadow-lg overflow-y-auto ${roboto400.className}`}>
                        <div id="logo-container" className="flex justify-center items-center">
                            <Image src={logoBlackf} alt="logo" width={200} height={200} />
                        </div>
                        <div id="forms-inputs" className="grid sm:grid-cols-2 mx-4 sm:mx-8 gap-x-8 sm:gap-x-16 gap-y-6">
                            <div id="name-container">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-900">Nome</label>
                                <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome Sobrenome" className={`${roboto400.className} h-12 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600`} />
                            </div>
                            <div id="email-container">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">E-mail</label>
                                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com" className={`${roboto400.className} h-12 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600`} />
                            </div>
                            <div id="password-container">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-900">Senha</label>
                                <input id="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Senha" type="password" className={`${roboto400.className} h-12 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600`} />
                            </div>
                            <div id="cpf-container">
                                <label htmlFor="cpf" className="block text-sm font-medium text-gray-900">CPF</label>
                                <input id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="12345678912" className={`${roboto400.className} h-12 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600`} />
                            </div>
                            <div id="cellphone-container">
                                <label htmlFor="cellphone" className="block text-sm font-medium text-gray-900">Número de telefone</label>
                                <input id="cellphone" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="81999999999" className={`${roboto400.className} h-12 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600`} />
                            </div>
                            <div id="birthdate-container">
                                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-900">Data de nascimento</label>
                                <input id="birthdate" value={data_nasc} onChange={(e) => setData_nasc(e.target.value)} type="date" className={`${roboto400.className} h-12 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600`} />
                            </div>
                            <div id="receita-container">
                                <label htmlFor="receita" className="block text-sm font-medium text-gray-900">Receita</label>
                                <input id="receita" value={receita} onChange={(e) => setReceita(e.target.value)} placeholder="10000000" className={`${roboto400.className} h-12 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600`} />
                            </div>
                        </div>
                        <div className={`${roboto700.className} mt-6 flex flex-col items-center`}>
                            <Link href="/login" className="underline text-black hover:text-green-700 mb-4">Já tem um cadastro? Faça o login clicando aqui!</Link>
                            <button type="submit" className="w-64 h-12 bg-econGreen hover:bg-green-700 rounded-lg shadow-xl text-white">Cadastrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthProvider>
    );
}