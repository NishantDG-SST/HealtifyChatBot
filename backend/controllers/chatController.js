const axios = require('axios');
const Chat = require('../models/Chat.js');

const callGeminiAPI = async (message, chatHistory) => {
  try {
    const prompt = `You are a medical assistant AI. Help users understand their symptoms and provide general health information.

IMPORTANT DISCLAIMER: This is for informational purposes only and not a substitute for professional medical advice. Always consult with a healthcare provider for medical concerns.

User's message: ${message}

Previous conversation context: ${JSON.stringify(chatHistory)}

Please provide a helpful, educational response that:
1. Acknowledges the symptoms
2. Provides possible conditions (but emphasizes this is not a diagnosis)
3. Suggests when to see a doctor
4. Offers general wellness advice
5. Clearly states this is not medical advice

Format your response with clear sections and line breaks for better readability.`;

    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent',
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        }
      }
    );

    // Format the response for better readability
    const rawResponse = response.data.candidates[0].content.parts[0].text;
    return formatAIResponse(rawResponse);
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    throw new Error('Failed to get response from AI service');
  }
};

// Helper function to format the AI response
const formatAIResponse = (text) => {
  // Add basic formatting for better readability
  return text
    // Replace markdown-style headers with bold text
    .replace(/\*\*\*(.*?)\*\*\*/g, '\n**$1**\n')
    .replace(/\*\*(.*?)\*\*/g, '**$1**')
    // Ensure proper line breaks
    .replace(/\n\s*\n/g, '\n\n')
    // Add spacing after numbered lists
    .replace(/(\d+\.)\s/g, '\n$1 ')
    // Clean up extra whitespace
    .trim();
};

exports.sendMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body;
    const userId = req.user._id;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    let chat;
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, user: userId });
      if (!chat) {
        return res.status(404).json({ message: 'Chat not found' });
      }
    } else {
      chat = new Chat({
        user: userId,
        messages: []
      });
    }

    // Add user message to chat
    chat.messages.push({
      role: 'user',
      content: message
    });

    // Get AI response
    const aiResponse = await callGeminiAPI(message, chat.messages);

    // Add AI response to chat
    chat.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    await chat.save();

    res.json({
      chatId: chat._id,
      response: aiResponse,
      messages: chat.messages
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to process message' 
    });
  }
};

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .sort({ updatedAt: -1 })
      .select('_id messages createdAt updatedAt');

    res.json(chats);
  } catch (error) {
    console.error('Get chats error:', error);
    res.status(500).json({ message: 'Failed to fetch chats' });
  }
};

exports.getChat = async (req, res) => {
  try {
    const chat = await Chat.findOne({ 
      _id: req.params.chatId, 
      user: req.user._id 
    });

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.json(chat);
  } catch (error) {
    console.error('Get chat error:', error);
    res.status(500).json({ message: 'Failed to fetch chat' });
  }
};