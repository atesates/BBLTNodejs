const { Router } = require('express');
var express = require('express');
var router = express.Router();
var ctrlContact = require('../controllers/contactController');
router.get('/',ctrlContact.index);
module.exports = router;