import React, { useState, useRef, useEffect } from 'react';
import { chatAPI } from '../services/api.jsx';

// Format AI responses with proper styling
// Format AI responses with proper styling
// Format AI responses with proper styling
const formatAIMessage = (text) => {
  return (
    <div className="ai-message-content">
      {text.split('\n').map((line, index) => {
        const trimmed = line.trim();
        
        // Empty lines for spacing
        if (trimmed === '') return <br key={index} />;
        
        // Headers with ## (two hashes) - main section
        if (trimmed.startsWith('## ')) {
        // Remove '## ' and optional numbering (e.g., '3. ')
        const headerText = trimmed.replace('## ', '').replace(/^\d+\.\s*/, '');
        return <div key={index} className="ai-main-header">{headerText}</div>;
        }

        // Headers with ### (three hashes) - sub-section
        if (trimmed.startsWith('### ')) {
        const subHeaderText = trimmed.replace('### ', '').replace(/^\d+\.\s*/, '');
        return <div key={index} className="ai-subheader">{subHeaderText}</div>;
        }

        // Headers (bold text with **)
        if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
          return <div key={index} className="ai-header">{trimmed.replace(/\*\*/g, '')}</div>;
        }
        
        // Bold text within sentences
        if (trimmed.includes('**')) {
          const parts = trimmed.split(/\*\*(.*?)\*\*/g);
          return (
            <div key={index} className="ai-text">
              {parts.map((part, i) => 
                i % 2 === 1 ? <strong key={i}>{part}</strong> : part
              )}
            </div>
          );
        }
        
        // Bullet points
        if (trimmed.startsWith('* ')) {
          return <div key={index} className="ai-bullet">{trimmed.substring(2)}</div>;
        }
        
        // Numbered lists
        if (trimmed.match(/^\d+\./)) {
          return <div key={index} className="ai-numbered">{trimmed}</div>;
        }
        
        // Table rows
        if (trimmed.includes('|')) {
          // Skip table header separators (---)
          if (trimmed.includes('---')) {
            return <hr key={index} className="ai-divider" />;
          }
          return (
            <div key={index} className="ai-table-row">
              {trimmed.split('|').filter(cell => cell.trim() !== '').map((cell, i) => 
                <span key={i} className="ai-table-cell">{cell.trim()}</span>
              )}
            </div>
          );
        }
        
        // Section dividers
        if (trimmed === '---' || trimmed === '***') {
          return <hr key={index} className="ai-divider" />;
        }
        
        // Regular text
        return <div key={index} className="ai-text">{trimmed}</div>;
      })}
    </div>
  );
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const response = await chatAPI.getChats();
      setChats(response.data);
    } catch (error) {
      console.error('Failed to load chats:', error);
    }
  };

  const loadChat = async (chatId) => {
    try {
      const response = await chatAPI.getChat(chatId);
      setMessages(response.data.messages);
      setChatId(chatId);
    } catch (error) {
      console.error('Failed to load chat:', error);
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setChatId(null);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || loading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setLoading(true);

    // Add user message to chat
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await chatAPI.sendMessage({
        message: userMessage,
        chatId: chatId
      });

      setMessages(response.data.messages);
      if (!chatId) {
        setChatId(response.data.chatId);
        loadChats();
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <button onClick={startNewChat} className="btn btn-primary new-chat-btn">
          New Chat
        </button>
        
        <div className="chat-history">
          <h3>Chat History</h3>
          {chats.map(chat => (
            <div 
              key={chat._id} 
              className={`chat-item ${chatId === chat._id ? 'active' : ''}`}
              onClick={() => loadChat(chat._id)}
            >
              <div className="chat-preview">
                {chat.messages[0]?.content.substring(0, 50)}...
              </div>
              <div className="chat-date">
                {new Date(chat.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-main">
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h2>Welcome to Health Diagnosis Chatbot</h2>
              <p>
                Describe your symptoms and I'll provide general health information. 
                Remember, this is for informational purposes only and not a substitute 
                for professional medical advice.
              </p>
              <div className="disclaimer">
                <strong>Important:</strong> Always consult with a healthcare provider 
                for medical concerns and diagnosis.
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-content">
                  {message.role === 'assistant' ? formatAIMessage(message.content) : message.content}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="message assistant">
              <div className="message-content typing">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="chat-input-form">
          <div className="input-group">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Describe your symptoms..."
              className="form-control"
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;