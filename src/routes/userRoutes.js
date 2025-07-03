const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router();


router.post('/home', userController.getHome)
router.post('/syncContacts', userController.syncContacts)
router.get('/transactionHistory', userController.getTransactionHistory)


module.exports = router;