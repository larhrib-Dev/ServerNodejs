const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// Auth and Signup
router.post('/register', userController.register);

module.exports = router;