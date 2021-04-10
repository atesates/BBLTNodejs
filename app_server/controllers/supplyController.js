//var enrollments = require('./enrollments.js')
let hlfOperations = require('../../hyperledgerOperations.js');
const path = require('path');
const fs = require('fs');
//init ledger
module.exports.callInitLedger = (req, res) => {
    hlfOperations.initLedger().then(() => {
        console.log('ledger initialized')
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
//Admin enrollments and User register and enrolments

module.exports.callCreateSupply = (req, res) => {
    hlfOperations.createSupply().then(() => {
        console.log('supply added')
        //console.log(res)
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

module.exports.callGetAllSupplyAndDemand = function (req, res) {
    //console.log('aaaaaaaaaaaa')
    hlfOperations.getAllSupplyAndDemand().then(result=>{
        console.log('getAllTransactions=' +  result )
      res.render('supplylist', { result: JSON.parse(result) });

    })
    // hlfOperations.getAllSupplyAndDemand(function (err, results) {
    //     console.log("results: "+ results)
    //     res.render('supplylist', { result: ["ahmet", "mehmet"] });
    // });
    //console.log('ssssssssssssss')

}

module.exports.indexGet = function (req, res) {
    console.log('supply')
    res.render('supply');


}

module.exports.callSupplylist = function (req, res) {
    console.log('supplylist')
    hlfOperations.getAllSupplyAndDemand(function (err, results) {

        console.log('getAllSupplyAndDemand')

        if (`${results}` !== '') {
            //console.log(results)    
            console.log('results')     
            res.render('supplylist', { result: ["ahmet", "mehmet"]  });
        }
        else {
            console.log('There is no records')
            res.redirect('supplylist');
            console.log('supplylist1')

        }
        console.log('supplylist1212')

    });
    console.log('supplylist2')

  console.log(res.message)
    res.render('supplylist',{ result: res });

}