const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();


router.get('/home', userController.getHome)
router.get('/syncContacts', userController.syncContacts)


module.exports = router;