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
    <div className="flex h-screen">
      <div className="flex-grow">
        <Summary />
        <Categorias />

        <div id="suggestionsdiv" className="relative mt-20">
          {showButtons && (
            <div className="flex pt-6 z-10 relative ml-[25%] pt-20">
              <label className="flex items-center cursor-pointer">
                <span
                  className={`mr-4 text-white text-lg ${roboto400.className}`}
                >
                  Personalizar
                </span>
                <div
                  className={`relative w-16 h-8 rounded-full transition-colors ${
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
              </label>
            </div>
          )}
          <div
            className={`absolute inset-0 ${
              selectedComponent === "suggestions" ? "block" : "hidden"
            }`}
          >
            <Suggestions
              setShowButtons={setShowButtons}
              primeiraRenderizacao={primeiraRenderizacao}
            />
          </div>
          <div
            className={`absolute inset-0 ${
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
