const express = require('express');
const router = express.Router();
const passport = require('passport');

const userLoginController = require('../controllers/users/login.controller');
const userRegisterController = require('../controllers/users/register.controller');

// Auth and Signup
router.post('/register', userRegisterController.register);
router.post('/login', userLoginController.login);

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    return res.send({ message: 'Hi, you are authenticated'});
});

module.exports = router;