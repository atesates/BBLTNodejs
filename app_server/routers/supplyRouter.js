const { Router } = require('express');
var express = require('express');
var router = express.Router();
var ctrlSupply = require('../controllers/supplyController.js');

router.get('/',ctrlSupply.indexGet);
router.get('/callcreatesupply', ctrlSupply.callCreateSupply);
router.get('/supplylist', ctrlSupply.callGetAllSupplyAndDemand);

module.exports = router;