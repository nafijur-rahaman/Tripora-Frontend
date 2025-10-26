import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Bot, User } from 'lucide-react';


const tripData = [
  {
    title: "Maldives Paradise Escape",
    location: "Maldives",
    price: "$1599",
    duration: "7 Days / 6 Nights",
    category: "Beach",
    overview: "Experience turquoise waters, white sands, and overwater villas. Perfect for couples and beach lovers.",
  },
  {
    title: "Rome Historical Discovery",
    location: "Rome, Italy",
    price: "$1399",
    duration: "6 Days / 5 Nights",
    category: "Cultural",
    overview: "Walk through centuries of history — from the Colosseum to the Vatican, every corner tells a story.",
  },
  {
    title: "Everest Base Camp Adventure",
    location: "Nepal",
    price: "$1899",
    duration: "10 Days / 9 Nights",
    category: "Adventure",
    overview: "Take on one of the world’s most iconic treks — from Lukla to Everest Base Camp.",
  },

];

export default function FaqChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm Tripora AI. Looking for the perfect travel package?" },
    { type: 'prompt' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handlePackageSelect = (pkg) => {
    const userMessage = { sender: 'user', text: `Tell me about ${pkg.title}` };
    setMessages(prev => [...prev.filter(m => m.type !== 'prompt'), userMessage]);

    setIsTyping(true);
    setTimeout(() => {
      const botMessage = {
        sender: 'bot',
        text: `${pkg.title} (${pkg.category})\nLocation: ${pkg.location}\nPrice: ${pkg.price}\nDuration: ${pkg.duration}\nOverview: ${pkg.overview}`
      };
      const promptMessage = { type: 'prompt' };
      setMessages(prev => [...prev, botMessage, promptMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-indigo-600 text-white p-4 rounded-full shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isOpen ? 'x' : 'message'}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed bottom-28 right-8 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 z-50"
          >
            {/* Header */}
            <header className="bg-indigo-100 p-4 flex items-center shadow-sm border-b border-slate-200">
              <Bot className="h-8 w-8 text-indigo-600 mr-3" />
              <div>
                <h3 className="text-lg font-bold text-slate-900">Tripora Assistant</h3>
                <p className="text-sm text-slate-500">Your travel package guide</p>
              </div>
            </header>

            {/* Messages Area */}
            <div className="flex-1 p-6 overflow-y-auto bg-slate-50 space-y-6">
              {messages.map((msg, index) => {
                if (msg.type === 'prompt') {
                  return (
                    <div key={`prompt-${index}`} className="space-y-3">
                      {tripData.map((pkg, i) => (
                        <motion.button
                          key={i}
                          onClick={() => handlePackageSelect(pkg)}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="w-full text-left p-4 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:bg-indigo-50 hover:border-indigo-400 transition-all"
                        >
                          {pkg.title}
                        </motion.button>
                      ))}
                    </div>
                  );
                }

                const isUser = msg.sender === 'user';
                return (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && <Bot className="h-8 w-8 text-white bg-indigo-600 p-1.5 rounded-full flex-shrink-0 shadow" />}
                    <div className={`max-w-xs md:max-w-sm p-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
                      isUser 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-white text-slate-800 rounded-bl-none border border-slate-200'
                    }`}>
                      {msg.text}
                    </div>
                    {isUser && <User className="h-8 w-8 text-white bg-slate-500 p-1.5 rounded-full flex-shrink-0 shadow" />}
                  </motion.div>
                );
              })}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex items-start gap-3 justify-start"
                >
                  <Bot className="h-8 w-8 text-white bg-indigo-600 p-1.5 rounded-full flex-shrink-0 shadow" />
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 rounded-bl-none shadow-sm">
                    <div className="flex items-center space-x-1">
                      <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
