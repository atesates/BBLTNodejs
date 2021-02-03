var routeLogin = require('./loginRouter');
var routeHome = require('./homeRouter');



module.exports = function(app){
    app.use('/login',routeLogin);
    app.use('/',routeHome);
}