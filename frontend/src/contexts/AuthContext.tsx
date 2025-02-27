"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from '../services/apiClient';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import {useRouter} from 'next/navigation';


type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
};

export type UserProps = {
    id: string;
    name: string;
    email: string;
    cpf: string;
    telefone: string;
    data_nasc: string;
    receita: string;
};

type SignInProps = {
    email: string;
    senha: string;
};

type AuthProviderProps = {
    children: ReactNode;
};

type SignUpProps = {
    name: string;
    email: string;
    senha: string;
    cpf: string;
    telefone: string;
    data_nasc: string;
    receita: string;
};

export const AuthContext = createContext<AuthContextData | null>(null);

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token');
    } catch (err) {
        console.error('Erro ao deslogar:', err);
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>();
    const isAuthenticated = !!user;

    const router = useRouter();

    useEffect(() => {
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me')
                .then(response => {
                    const { id, name, email, cpf, telefone, data_nasc, receita } = response.data;

                    setUser({
                        id,
                        name,
                        email,
                        cpf,
                        telefone,
                        data_nasc,
                        receita
                    });
                })
                .catch(() => {
                    signOut();
                });
        }
    }, []);

    async function signIn({ email, senha }: SignInProps) {
        try {
            const response = await api.post('/login', {
                email,
                senha,
            });

            const { id, name, token, cpf, telefone, data_nasc , receita} = response.data;

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // 1 mês
                path: "/", // Disponível em todas as rotas
            });

            setUser({
                id,
                name,
                email,
                cpf,
                telefone,
                data_nasc,
                receita
            });

            api.defaults.headers['Authorization'] = `Bearer ${token}`;

            toast.success('Logado com sucesso!', { theme: "dark" });
            router.push('upload')
        } catch (err) {
            toast.error("Erro ao acessar!", { theme: "dark" });
            console.error("Erro ao acessar:", err);
        }
    }

    async function signUp({ name, email, senha, cpf, telefone, data_nasc, receita }: SignUpProps) {
        try {
            await api.post('/register/user', {
                name,
                email,
                senha,
                cpf,
                telefone,
                data_nasc,
                receita
            });

            toast.success("Conta criada com sucesso!", { theme: "dark" });
            router.push('login');

        } catch (err) {
            toast.error("Erro ao cadastrar!", { theme: "dark" });
            console.error("Erro ao cadastrar:", err);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    );
}