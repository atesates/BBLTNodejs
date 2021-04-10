const { Router } = require('express');
var express = require('express');
var router = express.Router();
var ctrlAbout = require('../controllers/aboutController');
router.get('/',ctrlAbout.index);
module.exports = router;