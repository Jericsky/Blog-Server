const express = require('express');
const userController = require('../controllers/user')

const router = express.Router();

router.post('/register', userController.registerUser)

router.post('/login', userController.loginUser)

router.get('/profile/:userId', userController.getUserProfile)

module.exports = router;