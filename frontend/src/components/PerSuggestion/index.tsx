import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { setupAPIClient } from "@/services/api";
import { toast } from "react-toastify";
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatProps {
  title?: string;
  placeholder?: string;
  className?: string;
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function AISuggestionChat({
  title = "Sugestões Personalizadas",
  placeholder = "Digite sua pergunta...",
  className = "",
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const apiClient = setupAPIClient();

  useEffect(() => {
    setMessages([
      {
        id: '1',
        text: 'Olá! Estou aqui para **ajudar** com sugestões personalizadas. Como posso te ajudar hoje?',
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await apiClient.post('/per-suggestion', { input: newMessage.text });

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response.data.suggestion.resposta, // Resposta em Markdown
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error('Erro ao obter resposta:', error);
      toast.error('Erro ao obter resposta da IA', { theme: "dark" });

      const errorMessage: Message = {
        id: Date.now().toString(),
        text: 'Desculpe, ocorreu um erro ao obter a resposta da IA.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex flex-col items-center justify-center h-screen"> 
      <div className={`bg-white rounded-2xl shadow-lg aspect-square w-[50%] h-[70%] flex flex-col ${className}`}>
        <div className="bg-econGreen text-white p-4 rounded-t-2xl">
          <h2 className="font-bold text-lg">{title}</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-blue-100 text-gray-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.sender === 'ai' ? (
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                ) : (
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                )}
                <p className="text-xs text-gray-500 text-right mt-1">
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <form onSubmit={handleSendMessage} className="border-t p-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-econGreen text-gray-800"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className={`rounded-full px-4 py-2 transition duration-200 ${isLoading || !input.trim() ? 'bg-gray-300' : 'bg-white'}`}
            disabled={isLoading || !input.trim()}
          >
            <Send size={20} color={isLoading || !input.trim() ? "gray" : "green"} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AISuggestionChat;
