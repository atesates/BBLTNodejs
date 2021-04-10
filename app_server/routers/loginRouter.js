const { Router } = require('express');
var express = require('express');
var router = express.Router();
var ctrlLogin = require('../controllers/loginController');
router.get('/',ctrlLogin.indexGet);
router.post('/', ctrlLogin.indexPost);
module.exports = router;