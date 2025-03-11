'use client';

import React, { ChangeEvent, useContext, useState } from "react";
import Papa from 'papaparse';
import { setupAPIClient } from "@/services/api";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const acceptableFileTypes = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv, application/pdf, .xlsx, text/plain, application/vnd.oasis.opendocument.spreadsheet, application/vnd.oasis.opendocument.text, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/rtf, text/csv';

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
      setFile(event.target.files[0]);
      Papa.parse(event.target.files[0], {
        complete: function (results) {
          console.log('Parsed CSV data:', results.data);
          setLabelText('Arquivo carregado com sucesso!');
        },
        error: function (error) {
          console.error('Error parsing CSV file:', error);
          setLabelText('Erro ao carregar o arquivo.');
        }
      });
    }
  }

  async function onFileUploadHandler() {
    if (!file) {
      setLabelText('Nenhum arquivo selecionado.');
      return;
    }

    setLoading(true);
    const apiClient = setupAPIClient();
    const data = new FormData();
    if (user) {
      data.append('user_id', user.id);
    } else {
      setLabelText('Usuário não autenticado.');
      setLoading(false);
      return;
    }
    data.append('file', file);

    if (!acceptableFileTypes.includes(file.type)) {
      console.log(file.type);
      setLabelText('Por favor, selecione um arquivo válido.');
      setLoading(false);
      return;
    }
    console.log(data);

    try {
      const response = await apiClient.post('register/transaction', data);
      console.log('File upload response:', response.data);
      toast.success('Arquivo enviado com sucesso!', { theme: 'dark' });
      router.push('/dashboard');
    } catch (error) {
      console.error('Error uploading file:', error);
      setLabelText('Erro ao enviar o arquivo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-[60px] w-[30%] border-[3px] border-[#48a078] m-[10px] transition-all duration-300 rounded-lg hover:bg-[#49a078]">
      {labelText && <p className="mb-8 my-4 text-center">{labelText}</p>}
      <label htmlFor="fileSelector" className="flex w-full h-full justify-center items-center text-white bg-[#48a078] hover:cursor-pointer hover:bg-green-700">
        Selecione o arquivo (*csv, xlsx, pdf, etc.)
      </label>
      <input type="file" id="fileSelector" accept={acceptableFileTypes} onChange={onFileChangeHandler} className="opacity-0 z-[-1] absolute" />
      <button onClick={onFileUploadHandler} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded mt-4 mx-auto block duration-150">
        Enviar Arquivo
      </button>
    </div>
  );
}

export default UploadButton;