"use client";

import React from "react";
import { useContext, FormEvent, useState } from 'react'
import { Roboto } from "next/font/google";
import Image from "next/image";
import logoblack from "../assets/logoblack.png"
import Link from "next/link";
import { AuthContext, AuthProvider } from "../../contexts/AuthContext";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import Spinner from "@/components/Spinner/Spinner";

const roboto400 = Roboto({
    subsets: ["latin"],
    weight: "400"
})

const roboto700 = Roboto({
    subsets: ["latin"],
    weight: "700"
})

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const authContext = useContext(AuthContext);

    if (!authContext) {
        toast.error("Authentication context is not available", { theme: "dark" });
        return null;
    }

    const { signIn } = authContext;

    async function handleLogin(event: FormEvent) {

        event.preventDefault();

        if (email === '' || senha === '') {
            toast.error("Preencha todos os campos!", { theme: "dark" });
            return;
        }

        const data = {
            email,
            senha
        }

        setLoading(true);

        try {
            const response = await signIn(data);
            console.log(response);
        }catch(err: unknown){
            if (err instanceof AxiosError && err.response) {
                toast.error(err.response.data, { theme: "dark" });
            }
        }

        setLoading(false);

        router.push('/upload');

    }

    return (
        <>
            <AuthProvider>
                {loading ? (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <Spinner/>
                    </div>
                ) :
                    <div id="screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center">
                        <div id="forms-container" className={`bg-backgroundLightGray shadow-[0px_10px_30px_rgba(0,0,0,0.3)] rounded-lg lg:h-[700px] w-[90%] h-[80%] lg:w-[500px] md:h-[700px] md:w-[500px] ${roboto400.className}`}>
                            <div id="logo-container" className="flex justify-center items-center">
                                <Image src={logoblack} alt="logo" width={400} height={400} />
                            </div>
                            <form onSubmit={handleLogin}>
                                <div id="forms-inputs" className="grid grid-cols-1 gap-y-6 mt-[0px] w-[90%]">
                                    <div className="ml-[32px]">
                                        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="E-mail" className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-600 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
                                    </div>

                                    <div className="ml-[32px] ">
                                        <input type="password" onChange={(e) => setSenha(e.target.value)} placeholder="Senha" value={senha} className={`${roboto400.className} h-[56px] block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-600 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 `} />
                                    </div>


                                </div>

                                <div className={`${roboto700.className} mt-[75px] flex flex-col items-center`}>
                                    <Link href="/cadastro" className="underline text-black hover:text-green-700 mb-5">Ainda não tem uma conta? Cadastre-se clicando aqui!</Link>
                                    <button type="submit" className="w-[320px] h-[48px] bg-econGreen hover:bg-green-700 rounded-lg drop-shadow-xl text-white">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                }
            </AuthProvider>
        </>
    )
}

export default Login;