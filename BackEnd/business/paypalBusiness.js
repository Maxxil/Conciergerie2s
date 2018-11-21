var Paypal = require('./../model/paypalModel');

var paypal = require('paypal-rest-sdk');;
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
});

module.exports = {
    get: function () {
        return Paypal.find({});
    },
    update : function (paypal) {
        return Paypal.updateOne({} , paypal , {upsert : true});
    },
    createPayment : function(prestation, prix) {
        console.log(prestation);
    }
};