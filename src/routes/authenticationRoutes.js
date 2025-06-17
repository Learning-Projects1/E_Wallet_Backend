const express = require('express');
const authController = require('../controllers/authenticationController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);
router.post('/verifyWalletPin', authController.verifyWalletPin);

module.exports = router;
