const express = require('express')

const transactionController = require('../controllers/transactionController')

const router = express.Router();


router.post('/walletTransfer', transactionController.walletTransfer)



module.exports = router;