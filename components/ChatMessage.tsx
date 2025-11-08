
import React from 'react';
import type { Message } from '../types';
import { AVATAR_URL } from '../constants';

interface ChatMessageProps {
    message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isBot = message.sender === 'bot';

    return (
        <div className={`flex items-end gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
            {isBot && (
                <img src={AVATAR_URL} alt="ANI Avatar" className="w-10 h-10 rounded-full shadow-md border-2 border-white" />
            )}
            <div
                className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-md ${
                    isBot
                        ? 'bg-gradient-to-r from-cyan-50 to-teal-50 text-gray-800 rounded-bl-none'
                        : 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-br-none'
                }`}
            >
                <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
            </div>
        </div>
    );
};

export default ChatMessage;
