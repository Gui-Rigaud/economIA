import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';

import Router from "next/router";

import { toast } from 'react-toastify'

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    telefone: string;
    data_nasc: string;
}

type SignInProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
    cpf: string;
    telefone: string;
    data_nasc: string; 
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
        Router.push('/startscreen');
    } catch {
        console.log('erro ao deslogar');
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    useEffect(() => {

        //tentar conseguir algo no token
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me').then(response => {
                const { id, name, email, cpf,telefone, data_nasc , created_at } = response.data;

                setUser({
                    id,
                    email,
                    name,
                    cpf,
                    telefone,
                    data_nasc,
                })
            })
                .catch(() => {
                    //Se algo der errado, o user será deslogado
                    signOut();
                })
        }


    }, [])

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/login', {
                email,
                password
            })

            const { id, name, token, cpf, telefone, data_nasc} = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // Expirar em um mês
                path: "/" //Quais caminhos terão acesso ao cookie
            });

            setUser({
                id,
                name,
                email,
                cpf,
                telefone,
                data_nasc,
            });

            //Passar para próximas requisições o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Logado com sucesso!', { theme: "dark" });

            //Redirecionar para a dashboard
            Router.push('/upload');
        } catch (err) {
            toast.error("Erro ao acessar!", { theme: "dark" });
            console.log("ERRO AO ACESSAR ", err);
        }
    }

    async function signUp({ name, email, password, cpf, telefone, data_nasc }: SignUpProps) {
        try {
            const response = await api.post('/register/user', {
                name,
                email,
                password,
                cpf,
                telefone,
                data_nasc
            })

            toast.success("Conta criada com sucesso!", { theme: "dark" })

            Router.push('/login');


        } catch (err) {
            toast.error("Erro ao cadastrar!", { theme: "dark" });
            console.log("erro ao cadastrar ", err)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}