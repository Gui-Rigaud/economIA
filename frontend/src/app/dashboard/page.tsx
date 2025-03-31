"use client";

import { useState, useRef } from "react";
import { Categorias } from "@/components/Categorias";
import { Summary } from "@/components/Summary";
import { Suggestions } from "@/components/Suggestions";
import AISuggestionChat from "@/components/PerSuggestion";
import { Roboto } from "next/font/google";

const roboto400 = Roboto({
  subsets: ["latin"],
  weight: "400",
});

export default function Dashboard() {
  const [selectedComponent, setSelectedComponent] = useState<
    "suggestions" | "aisuggestionchat"
  >("suggestions");
  const [showButtons, setShowButtons] = useState(false);
  const primeiraRenderizacao = useRef(true);

  const handleToggle = () => {
    setSelectedComponent((prev) =>
      prev === "suggestions" ? "aisuggestionchat" : "suggestions"
    );
  };

  return (
    <div className="flex h-screen w-sreen">
      <div className="flex-grow">
        <Summary />
        <Categorias />

        <div id="suggestionsdiv" className="relative mt-20">
            <div className="flex justify-start pl-8 ml-[22.5%]">
            {showButtons && (
              <div className="flex items-center z-10">
              <span
                className={`mr-4 text-white text-lg ${roboto400.className}`}
              >
                Personalizar
              </span>
              <div
                className={`relative w-16 h-8 rounded-full transition-colors cursor-pointer ${
                selectedComponent === "aisuggestionchat"
                  ? "bg-econGreen"
                  : "bg-gray-300"
                }`}
                onClick={handleToggle}
              >
                <div
                className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                  selectedComponent === "aisuggestionchat"
                  ? "translate-x-8"
                  : ""
                }`}
                ></div>
              </div>
              </div>
            )}
          </div>
            <div
            className={`mt-0 ${
              selectedComponent === "suggestions" ? "block" : "hidden"
            }`}
            >
            <Suggestions
              setShowButtons={setShowButtons}
              primeiraRenderizacao={primeiraRenderizacao}
            />
            </div>
            <div
            className={`mt-0 ${
              selectedComponent === "aisuggestionchat" ? "block" : "hidden"
            }`}
            >
            <AISuggestionChat />
            </div>
        </div>
      </div>
    </div>
  );
}
