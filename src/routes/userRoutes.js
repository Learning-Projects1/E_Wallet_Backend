const express = require('express')

const userController = require('../controllers/userController')

const router = express.Router();


router.get('/home', userController.getHome)


module.exports = router;