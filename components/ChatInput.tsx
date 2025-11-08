
import React, { useState } from 'react';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    isLoading: boolean;
}

const SendIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onSendMessage(text);
            setText('');
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e as unknown as React.FormEvent);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-3">
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu emergencia aquí..."
                className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:outline-none transition resize-none"
                rows={1}
                disabled={isLoading}
            />
            <button
                type="submit"
                disabled={isLoading || !text.trim()}
                className="p-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500 hover:opacity-90 transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
                <SendIcon className="w-6 h-6" />
            </button>
        </form>
    );
};

export default ChatInput;
