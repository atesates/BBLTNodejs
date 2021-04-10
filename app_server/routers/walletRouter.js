const { Router } = require('express');
var express = require('express');
var router = express.Router();
var ctrlWallet = require('../controllers/walletController.js');

router.get('/',ctrlWallet.indexGet);
router.get('/callenrollinit', ctrlWallet.callEnrollInit);

module.exports = router;