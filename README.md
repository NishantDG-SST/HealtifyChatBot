# Health Diagnosis Chatbot

A full-stack MERN application with AI-powered health diagnosis using Google's Gemini API. This application provides users with general health information and symptom analysis through an intelligent chatbot interface.

## 🚀 Features

- **🤖 AI-Powered Health Assistant** - Integrated with Google Gemini API for intelligent health responses
- **🔐 User Authentication** - JWT-based secure login and registration
- **💬 Real-time Chat Interface** - Clean, responsive chat UI with message history
- **📱 Responsive Design** - Works seamlessly on desktop and mobile devices
- **🔒 Secure** - Password hashing and protected API routes
- **📊 Chat History** - Persistent conversation storage
- **⚠️ Medical Disclaimers** - Clear warnings about non-diagnostic nature

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### AI Integration
- **Google Gemini API** - AI-powered health responses
- **Gemini 2.5 Flash** - Advanced language model

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- MongoDB (local or MongoDB Atlas)
- Google Gemini API key

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/health-chatbot.git
cd health-chatbot
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
```

Configure `.env`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/health-chatbot
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_gemini_api_key_here
```

Start backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install

# Create environment file
cp .env.example .env
```

Configure `.env`:
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

Start frontend:
```bash
npm run dev
```

## 🎯 Usage

1. **Register** a new account or **Login** with existing credentials
2. **Start chatting** with the health assistant by describing symptoms
3. **Receive AI-powered responses** with:
   - Symptom acknowledgment
   - Possible conditions (educational purposes only)
   - Wellness advice
   - When to see a doctor
4. **View chat history** in the sidebar
5. **Start new conversations** anytime

## 🏗 Project Structure

```
health-chatbot/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   └── chatController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Chat.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── chat.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Chat.jsx
│   │   │   └── Navbar.jsx
│   │   ├── services/
│   │   │   └── api.jsx
│   │   ├── utils/
│   │   │   └── auth.jsx
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Chat
- `POST /api/chat/message` - Send message to AI
- `GET /api/chat/chats` - Get user's chat history
- `GET /api/chat/chat/:chatId` - Get specific chat

## 🚀 Deployment

### Frontend (Vercel)
1. Connect GitHub repo to Vercel
2. Set environment variable: `VITE_API_BASE_URL=https://your-backend-url.com/api`
3. Auto-deploys on git push

### Backend (Render/Railway)
1. Connect GitHub repo to Render/Railway
2. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET` 
   - `GEMINI_API_KEY`
   - `CLIENT_URL` (frontend domain)

### Database
- Use **MongoDB Atlas** for production database

## ⚠️ Important Disclaimers

- 🩺 **Not Medical Advice**: This application provides general health information only
- 🔬 **No Diagnosis**: Does not provide medical diagnoses or treatment recommendations
- 🚑 **Emergency**: For medical emergencies, contact healthcare professionals immediately
- 📋 **Consult Professionals**: Always consult qualified healthcare providers for medical concerns

## 🔧 Environment Variables

### Backend
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/health-chatbot
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend
```env
VITE_API_BASE_URL=http://localhost:5001/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/health-chatbot/issues) page
2. Create a new issue with detailed description
3. Provide steps to reproduce the problem

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- MERN stack community
- Medical professionals who reviewed the disclaimer content

---

**Remember**: This is an educational tool, not a replacement for professional medical advice. Always consult healthcare providers for medical concerns.

**Live Demo**: [https://healtify-chat-bot.vercel.app](https://healtify-chat-bot.vercel.app)

**Backend API**: [https://healtifychatbot.onrender.com](https://healtifychatbot.onrender.com)
