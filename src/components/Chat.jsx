import React, { useState, useRef, useEffect } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { getGroqChatCompletion } from '../api/groqClient';

const Chat = () => {
  const [messages, setMessages] = useState([{
    role: "assistant",
    content: "Greetings, I am Jarvis, an advanced AI assistant created by PW Security under the guidance of The Professor. How may I assist you today?"
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = { role: "user", content };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const conversationHistory = [...messages, userMessage];
      const response = await getGroqChatCompletion(conversationHistory);
      const assistantMessage = { role: "assistant", content: response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "I apologize, but I encountered an error. Please try again."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([{
      role: "assistant",
      content: "Conversation cleared. How may I assist you?"
    }]);
  };

  return (
    <div className="chat-layout">
      <div className="chat-wrapper">
        <div className="chat-header">
          <motion.button
            className="clear-button"
            onClick={clearConversation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Clear conversation"
          >
            <FaTrash />
          </motion.button>
        </div>
        <div className="messages-container">
          {messages.map((message, index) => (
            <Message key={index} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Chat;