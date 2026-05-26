import { createContext, useContext } from 'react';
import { useChatbot } from '../hooks/useChatbot';

const ChatbotContext = createContext(null);

export const ChatbotProvider = ({ children }) => {
  const chatbot = useChatbot();
  return (
    <ChatbotContext.Provider value={chatbot}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbotContext must be used within a ChatbotProvider');
  }
  return context;
};
