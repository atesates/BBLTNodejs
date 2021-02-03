var fs = require('fs');

var express = require('express');
var path = require('path');
var app = express();
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
//views in yerini belirtiyoruz, aksi takdirde direk views e bakar
app.set('views', path.join(__dirname, '/app_server/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(ejsLayouts);
//kullaniciyz aciyoruz bu komutla:
app.use('/public', express.static(path.join(__dirname, 'public')))

require('./app_server/routers/routeManager')(app);
// app.use(function(req,res,next){
//     console.log("url...: ", req.originalUrl);
//     console.log('time...:' + Date.now());
//     next();
// })



app.listen(8000); 