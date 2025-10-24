const express = require('express');
const { register, login, getProfile } = require('../controllers/authController.js');
const { validateRegister, validateLogin } = require('../middleware/validation.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', auth, getProfile);

module.exports = router;