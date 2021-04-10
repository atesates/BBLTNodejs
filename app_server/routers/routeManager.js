var routeLogin = require('./loginRouter');
var routeHome = require('./homeRouter');
var aboutRoute = require('./aboutRouter');
var contactRoute = require('./contactRouter');
var walletRoute = require('./walletRouter');
var supplyRoute = require('./supplyRouter');



module.exports = function(app){
    app.use('/login',routeLogin);
    app.use('/',routeHome);
    app.use('/about', aboutRoute)
    app.use('/contact', contactRoute)
    app.use('/wallet', walletRoute)
    app.use('/supply', supplyRoute)

}