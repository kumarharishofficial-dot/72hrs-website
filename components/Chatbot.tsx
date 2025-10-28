import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import ChatIcon from './icons/ChatIcon';
import XIcon from './icons/XIcon';
import SendIcon from './icons/SendIcon';
import { useLanguage } from '../hooks/useLanguage';

interface Message {
    role: 'user' | 'model';
    text: string;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1 p-2">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
);


const Chatbot: React.FC = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!process.env.API_KEY) {
            console.error("API_KEY is not set.");
            return;
        }

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: t('chatbot.systemInstruction'),
            },
        });
        setChat(newChat);
    }, [t]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ role: 'model', text: t('chatbot.welcomeMessage') }]);
        }
    }, [isOpen, messages, t]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading || !chat) return;

        const userMessage: Message = { role: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: userMessage.text });
            const modelMessage: Message = { role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage: Message = { role: 'model', text: t('chatbot.errorMessage') };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-5 right-5 z-50">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 bg-primary-violet text-white rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-90 transform hover:scale-110 transition-all duration-300"
                    aria-label="Open chat"
                >
                    <ChatIcon className="w-8 h-8" />
                </button>
            </div>

            {isOpen && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex justify-center items-center p-4"
                  onClick={() => setIsOpen(false)}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="chatbot-title"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-lg h-full sm:h-[80vh] sm:max-h-[700px] bg-light-bg dark:bg-dark-card shadow-2xl rounded-2xl flex flex-col"
                    >
                        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
                            <h3 id="chatbot-title" className="font-bold font-geist text-light-text dark:text-dark-text">{t('chatbot.title')}</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full text-light-text-secondary dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-bg"
                                aria-label="Close chat"
                            >
                                <XIcon className="h-6 w-6" />
                            </button>
                        </header>

                        <div className="flex-grow p-4 overflow-y-auto space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-primary-violet text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-light-text dark:text-dark-text rounded-bl-none'}`}>
                                        <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200 dark:bg-gray-700">
                                        <TypingIndicator />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
                            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t('chatbot.inputPlaceholder')}
                                    className="w-full p-2 border rounded-md bg-transparent border-gray-300 dark:border-gray-600 focus:ring-1 focus:ring-primary-violet focus:border-primary-violet"
                                    disabled={isLoading}
                                />
                                <button type="submit" disabled={isLoading || !inputValue.trim()} className="p-3 bg-primary-violet text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed">
                                    <SendIcon className="w-5 h-5"/>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chatbot;
