var router = require('express').Router();
var bodyParser = require('body-parser');
var paypal = require('paypal-rest-sdk');

var paypalBusiness = require('./../business/paypalBusiness');
var Enums = require('./../helper/enums');

router.use(bodyParser.json());

var clientId = "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM";
var secret = "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM";

/*
paypalBusiness.get().exec(function (err, result) {
    if(result.length > 0 ){
        clientId = result[0].clientId;
        secret = result[0].secret;
        paypal.configure({
            'mode': 'sandbox', //sandbox or live
            'client_id': clientId,
            'client_secret': secret
        });
    }
});
*/

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': clientId,
    'client_secret': secret
});

var amount = 0;

router.get('/', function (req, res) {
    paypalBusiness.get().exec(function (err, result) {
        console.log(result);
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.post('/' , function(req , res){
    paypalBusiness.update(req.body.paypal).then(function ( result) {
        console.log(result);
        res.json({
            success : result.ok
        });
        res.end();
    })
});

router.put('/createPayment', function (req, res) {
    console.log("Paiement");
    var prestation = req.body.prestation;
    amount = req.body.prix;
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4444/paypal/executePayment",
            "cancel_url": "http://localhost:4444/paypal/cancelPayment"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": prestation.toString(),
                    "sku": "item",
                    "price": amount,
                    "currency": "EUR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "EUR",
                "total": amount
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.json({
                success: false
            });
            res.end();
        } else {
            console.log("Create Payment Response");
            console.log(payment.links[1].href);
            res.json({
                success: true,
                data: payment.links[1].href
            });
            res.end();
        }
    });

});


router.get('/executePayment/', function (req, res) {

    var payerId = req.query.PayerID;
    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "EUR",
                "total": amount
            }
        }]
    };

    var paymentId = req.query.paymentId;

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(JSON.stringify(payment));
            res.json({
                success : true
            });
            res.end();
        }
    });
});

router.get('/cancelPayment', function (req, res) {
    console.log("cancel payment");
    res.json({
        success: false
    });
    res.end();
});
module.exports = router;