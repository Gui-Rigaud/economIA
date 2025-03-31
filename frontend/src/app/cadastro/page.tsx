"use client";

import React, { useContext, useState, FormEvent } from "react";
import { Roboto } from "next/font/google";
import Image from 'next/image';
import logoBlackf from "../assets/logoblack.png";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AuthContext, AuthProvider } from "../../contexts/AuthContext";
import Link from "next/link";

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
});

const roboto700 = Roboto({
    subsets: ["latin"],
    weight: "700"
});

export default function CadastroScreen() {
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

        const data = {
            name,
            email,
            senha,
            cpf,
            telefone,
            data_nasc,
            receita
        };

        try {
            const response = await signUp(data);
            console.log(response);
            router.push('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <AuthProvider>
            <div className="bg-econDarkGreen min-h-screen w-full flex justify-center items-center p-4 md:p-8">
                <form onSubmit={handleSignup} className="w-full max-w-4xl">
                    <div className={`bg-backgroundLightGray shadow-[0px_10px_30px_rgba(0,0,0,0.3)] rounded-lg w-full max-w-[1000px] min-h-[700px] mx-auto p-6 md:p-8 ${roboto400.className}`}>
                        <div className="flex justify-center items-center mb-6 md:mb-8">
                            <Image 
                                src={logoBlackf} 
                                alt="logo" 
                                width={200} 
                                height={200}
                                className="w-auto h-auto max-w-[120px] sm:max-w-[150px] md:max-w-[200px]"
                                priority
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-8 lg:gap-x-16 md:gap-y-5">
                            <div className="w-full">
                                <label htmlFor="name" className="block text-sm font-medium text-black mb-1">Nome</label>
                                <input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nome Sobrenome"
                                    className={`${roboto400.className} h-12 md:h-14 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="email" className="block text-sm font-medium text-black mb-1">E-mail</label>
                                <input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    placeholder="exemplo@gmail.com"
                                    className={`${roboto400.className} h-12 md:h-14 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="password" className="block text-sm font-medium text-black mb-1">Senha</label>
                                <input
                                    id="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    type="password"
                                    placeholder="Senha"
                                    className={`${roboto400.className} h-12 md:h-14 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="cpf" className="block text-sm font-medium text-black mb-1">CPF</label>
                                <input
                                    id="cpf"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    placeholder="123.456.789-12"
                                    className={`${roboto400.className} h-12 md:h-14 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="cellphone" className="block text-sm font-medium text-black mb-1">Telefone</label>
                                <input
                                    id="cellphone"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    placeholder="(81) 99999-9999"
                                    className={`${roboto400.className} h-12 md:h-14 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="birthdate" className="block text-sm font-medium text-black mb-1">Data de nascimento</label>
                                <input
                                    id="birthdate"
                                    value={data_nasc}
                                    onChange={(e) => setData_nasc(e.target.value)}
                                    type="date"
                                    className={`${roboto400.className} h-12 md:h-14 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="receita" className="block text-sm font-medium text-black mb-1">Receita</label>
                                <input
                                    id="receita"
                                    value={receita}
                                    onChange={(e) => setReceita(e.target.value)}
                                    placeholder="10000.00"
                                    className={`${roboto400.className} h-12 md:h-14 block w-full rounded-md bg-white px-3 py-2 text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600`}
                                />
                            </div>
                        </div>

                        <div className={`${roboto700.className} mt-8 flex flex-col items-center`}>
                            <Link href="/login" className="underline text-black hover:text-green-700 mb-4 text-center text-sm md:text-base">
                                Já tem um cadastro? Faça o login clicando aqui!
                            </Link>
                            <button 
                                type="submit" 
                                className="w-full max-w-xs h-12 bg-econGreen hover:bg-green-700 rounded-lg drop-shadow-xl text-white transition-colors duration-200"
                            >
                                Cadastrar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthProvider>
    );
}