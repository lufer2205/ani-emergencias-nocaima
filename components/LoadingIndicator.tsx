
import React from 'react';
import { AVATAR_URL } from '../constants';

const LoadingIndicator: React.FC = () => {
    return (
        <div className="flex items-end gap-3 justify-start">
            <img src={AVATAR_URL} alt="ANI Avatar" className="w-10 h-10 rounded-full shadow-md" />
            <div className="flex items-center space-x-1.5 bg-gradient-to-r from-cyan-50 to-teal-50 px-4 py-3 rounded-2xl rounded-bl-none shadow-md">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
        </div>
    );
};

export default LoadingIndicator;
