'use client';

import React, { ChangeEvent, useContext, useState } from "react";
import { setupAPIClient } from "@/services/api";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const acceptableFileTypes = '.csv, application/pdf, text/csv';

function UploadButton() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext is null");
  }
  const { user } = authContext;

  const [file, setFile] = useState<File>();
  const [labelText, setLabelText] = useState<string>('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function onFileChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      setLabelText(`Arquivo recebido com sucesso - ${selectedFile.name}`);
    }
  }

  async function onFileUploadHandler() {
    if (!file) {
      toast.error('Nenhum arquivo selecionado.');
      return;
    }

    setLoading(true);
    const apiClient = setupAPIClient();
    const data = new FormData();
    
    if (!user) {
      toast.error('Usuário não autenticado.');
      setLoading(false);
      return;
    }
    
    data.append('user_id', user.id);
    data.append('file', file);

    if (!acceptableFileTypes.includes(file.type)) {
      toast.error('Por favor, selecione um arquivo válido (CSV ou PDF).');
      setLoading(false);
      return;
    }

    try {
      await apiClient.post('register/file', data);
      toast.success('Arquivo enviado com sucesso!', { theme: 'dark' });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Erro ao enviar o arquivo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto">
      {/* Moldura verde apenas para a mensagem */}
      {labelText && (
        <div className="border-[3px] border-[#48a078] rounded-lg p-3 w-full text-center">
          {labelText}
        </div>
      )}
      
      {/* Botão de seleção - Aumentado */}
      <label 
        htmlFor="fileSelector" 
        className="flex justify-center items-center text-white bg-[#48a078] hover:bg-green-700 rounded-lg px-6 py-3 cursor-pointer w-full text-lg transition-colors"
      >
        Selecione o arquivo (*csv ou pdf)
      </label>
      
      <input 
        type="file" 
        id="fileSelector" 
        accept={acceptableFileTypes} 
        onChange={onFileChangeHandler} 
        className="hidden" 
      />
      
      {/* Botão de envio - Aumentado */}
      <button 
        onClick={onFileUploadHandler} 
        className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-lg w-full text-lg transition-colors disabled:opacity-70"
        disabled={loading}
      >
        {loading ? 'Enviando...' : 'Enviar Arquivo'}
      </button>
    </div>
  );
}

export default UploadButton;