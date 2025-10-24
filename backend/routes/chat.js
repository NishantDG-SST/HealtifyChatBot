const express = require('express');
const { sendMessage, getChats, getChat } = require('../controllers/chatController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.post('/message', sendMessage);
router.get('/chats', getChats);
router.get('/chat/:chatId', getChat);

module.exports = router;