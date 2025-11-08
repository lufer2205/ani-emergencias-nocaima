import React, { useRef, useEffect } from 'react';
import type { Message } from '../types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import LoadingIndicator from './LoadingIndicator';
import InteractiveMap from './InteractiveMap';

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    onSendMessage: (text: string) => void;
    isMapVisible: boolean;
    onToggleMap: () => void;
}

const MapIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M8.25 3.75a3.75 3.75 0 0 0-3.75 3.75v.518l-1.978 2.473a.75.75 0 0 0 .96 1.064L4.5 11.23V18a3.75 3.75 0 0 0 3.75 3.75h6a3.75 3.75 0 0 0 3.75-3.75v-6.77l1.018.272a.75.75 0 0 0 .96-1.064l-1.978-2.473V7.5a3.75 3.75 0 0 0-3.75-3.75h-6ZM9.75 9.75a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5h-3a.75.75 0 0 1-.75-.75ZM9 15.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5H9Z" clipRule="evenodd" />
    </svg>
);


const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, error, onSendMessage, isMapVisible, onToggleMap }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    return (
        <>
            <div className="flex flex-col w-full max-w-2xl h-[90vh] bg-white rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden border border-gray-200">
                <header className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4 flex justify-between items-center shadow-md">
                    <div className="text-center flex-1">
                        <h1 className="text-xl font-bold">ANI - Asistente de Emergencia</h1>
                        <p className="text-sm opacity-90">Nocaima, Cundinamarca</p>
                    </div>
                    <button onClick={onToggleMap} className="p-2 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white" aria-label="Mostrar mapa de emergencia">
                        <MapIcon className="w-6 h-6"/>
                    </button>
                </header>

                <main className="flex-1 p-4 sm:p-6 overflow-y-auto bg-gray-50">
                    <div className="flex flex-col space-y-4">
                        {messages.map((msg) => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))}
                        {isLoading && <LoadingIndicator />}
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-sm" role="alert">
                                <p className="font-bold">Error de Conexión</p>
                                <p>{error}</p>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </main>

                <footer className="p-4 bg-white border-t border-gray-200">
                    <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
                </footer>
            </div>
            <InteractiveMap isVisible={isMapVisible} onClose={onToggleMap} />
        </>
    );
};

export default ChatWindow;