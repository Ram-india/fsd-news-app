const express = require('express');
const router = express.Router();
const{ signUp, login, getProfile } = require ('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post("/signup", signUp);
router.post('/login', login);

router.get('/profile', authMiddleware, getProfile);
module.exports = router;