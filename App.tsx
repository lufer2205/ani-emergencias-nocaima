import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { Message } from './types';
import { SYSTEM_PROMPT } from './constants';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMapVisible, setMapVisible] = useState(false);
    const chatRef = useRef<Chat | null>(null);

    const initializeChat = useCallback(async () => {
        try {
            if (!process.env.API_KEY) {
                throw new Error("API_KEY environment variable not set.");
            }
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: SYSTEM_PROMPT,
                },
            });
            chatRef.current = chat;
            
            setMessages([
                { id: 'init1', text: '¡Hola! Soy ANI, tu Asistente Nocaima Inteligente.', sender: 'bot' },
                { id: 'init2', text: 'Estoy aquí para ayudarte en situaciones de emergencia. ¿Cómo puedo asistirte?', sender: 'bot' }
            ]);
            setError(null);
        } catch (e) {
            console.error("Failed to initialize Gemini chat:", e);
            const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
            setError(`Error: No se pudo conectar con el asistente de IA. Por favor, asegúrate de que la clave de API esté configurada correctamente. (${errorMessage})`);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        initializeChat();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), text, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            if (!chatRef.current) {
                throw new Error("Chat session not initialized.");
            }
            const response = await chatRef.current.sendMessage({ message: text });
            let botResponseText = response.text;
            
            if (botResponseText.includes('[SHOW_MAP]')) {
                setMapVisible(true);
                botResponseText = botResponseText.replace('[SHOW_MAP]', '').trim();
            }
            
            if (botResponseText) { // Only add message if there is text
                const botMessage: Message = { id: (Date.now() + 1).toString(), text: botResponseText, sender: 'bot' };
                setMessages(prev => [...prev, botMessage]);
            }
            setError(null);
        } catch (e) {
            console.error("Error sending message to Gemini:", e);
            const errorMessageText = e instanceof Error && e.message.includes('API key') 
              ? 'Hubo un problema con la clave de API. Por favor, verifícala.'
              : 'Lo siento, ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo más tarde.';
            const errorMessage: Message = { id: (Date.now() + 1).toString(), text: errorMessageText, sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-teal-50 to-cyan-100 min-h-screen flex items-center justify-center font-sans p-4">
            <ChatWindow
                messages={messages}
                isLoading={isLoading}
                error={error}
                onSendMessage={handleSendMessage}
                isMapVisible={isMapVisible}
                onToggleMap={() => setMapVisible(prev => !prev)}
            />
        </div>
    );
};

export default App;