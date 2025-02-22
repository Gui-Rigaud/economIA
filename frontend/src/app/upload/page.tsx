
import UploadButton from "@/components/UploadButton";
import logoblack from "../assets/logoblack.png";
import { Roboto } from "next/font/google";
import Image from 'next/image';

const roboto400 = Roboto({
  subsets: ["latin"],
  weight: "400"
})

const roboto700 = Roboto({
  subsets: ["latin"],
  weight: "700"
})

export default function Upload() {
  return (
    <div id = "screen" className="bg-econDarkGreen h-screen w-screen flex justify-center items-center text-black">
      <div id = "main-container" className = "bg-backgroundLightGray rounded-lg h-[700px] w-[1000px]">
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
  )
}
