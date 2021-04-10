//var enrollments = require('./enrollments.js')
let hlfOperations = require('../../hyperledgerOperations.js');

//Admin enrollments and User register and enrolments

module.exports.callEnrollInit = (req, res)=> {
    hlfOperations.enrollInit().then(() => {
        console.log('enrollments complete')
        return res.status(200).json({
            status: 'ok'
        });
    })
    .catch(e => {
        console.log('create event error: \n');
        console.log(e);
        console.log(e.stack);
        return res.status(500).json({
          status: 'error',
          message: 'An error occurred trying to process your request',
      });
    })
}

module.exports.indexGet = function (req, res) {
    console.log('wallet')
    res.render('wallet');
    
}

