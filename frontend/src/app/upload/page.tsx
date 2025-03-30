"use client";

import UploadButton from "@/components/UploadButton";
import logoblack from "../assets/logoblack.png";
import { Roboto } from "next/font/google";
import Image from 'next/image';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import {useRouter} from 'next/navigation';
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import { useContext } from 'react';

const roboto400 = Roboto({
  subsets: ["latin"],
  weight: "400"
})

export default function Upload() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext is null');
  }
  
  const { '@nextauth.token': token } = parseCookies();

  const router = useRouter();

  useEffect(() => {
    if (token === undefined) {
      router.push('/login');
    }
  }, [token, router])

  return (
    <AuthProvider>
      <div id = "screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center text-black">
        <div id = "main-container" className = "bg-backgroundLightGray shadow-[0px_10px_30px_rgba(0,0,0,0.3)] rounded-lg w-[500px] h-[700px] lg:h-[700px] lg:w-[1000px] md:h-[700px] md:w-[600px] sm:h-[700px] sm:w-[400px]S">
          <div id = "logo-container" className = "flex justify-center items-center mt-7">
            <Image src = {logoblack} alt = "logo" width={200} height={200}/>
          </div>

          <div id = "text-container" className = {`flex flex-col justify-center items-center ${roboto400.className} text-[18px] mt-[80px]`}>
            <h1 className="text-[36px]">Falta pouco!</h1>
            <p>Precisamos de um documento com seus gastos para a análise da IA</p>
          </div>
          <div id = "buttons-container" className = "flex flex-col justify-center items-center mt-[20px]">
            <UploadButton />
          </div>
        </div>
      </div>
    </AuthProvider>
  )
}
