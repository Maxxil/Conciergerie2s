var router = require('express').Router();
var bodyParser = require('body-parser');
var paypal = require('paypal-rest-sdk');

var paypalBusiness = require('./../business/paypalBusiness');
var Enums = require('./../helper/enums');
var appSettings = require('./../config/appSettings');

router.use(bodyParser.json());

/*var clientId = "EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM";
//var clientId = "AdXkPhOhJVr8EH2R6Xl7fZFaVgwVW6AhNB80GbWds_N9jypYh9hpfYLkzQMn-keg2InmRhWPhgkWKC-Y";
var secret = "EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM";
//var secret = "ECf30juZefwSJd5Irfm60vllZsY6-qv5TW2JsSxNy1zPjNKrciCq6LlfaL4UY87ngDW1VpoAQi51ulzS";

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': clientId,
    'client_secret': secret
});
*/
paypalBusiness.get().exec(function (err, result) {
    if(result.length > 0 ){
        clientId = result[0].clientId;
        secret = result[0].secret;
        if(clientId != '' && secret != '')
        {
            paypal.configure({
                'mode': 'sandbox', //sandbox or live
                'client_id': clientId,
                'client_secret': secret
            });
        }
    }
});




var amount = 0;

router.get('/', function (req, res) {
    paypalBusiness.get().exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.post('/' , function(req , res){
    paypalBusiness.update(req.body.paypal).then(function ( result) {
        res.json({
            success : result.ok
        });
        res.end();
    })
});

router.put('/createPayment', function (req, res) {
    var prestation = req.body.prestation;
    amount = req.body.prix;
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": appSettings.paypalSuccess,
            "cancel_url": appSettings.paypalCancel
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": prestation.toString(),
                    "sku": "item",
                    "price": amount, // mettre ici le prix unitaire de la prestation
                    "currency": "EUR",
                    "quantity": 1  // mettre ici la quantité commandée
                }]
                // rajouter shipping_address
                // rajouter shipping_phone_number
            },
            "amount": {
                "currency": "EUR",
                "total": amount // garder ici le montant qui correspond auy prix * quantite
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            console.error(error);
            res.json({
                success: false
            });
            res.end();
        } else {
            
            console.log('Payment create');
            console.log('-----------------------------');
            console.log(payment);
            res.json({
                success: true,
                data: payment.links[1].href
            });
            res.end();
        }
    });

});


router.get('/executePayment', function (req, res) {

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
            throw error;
        } else {
            console.log('Payment execute');
            console.log('-----------------------------');
            console.log(payment);
            // essayer de stocker dans la commande sur mongo la référence du payment généré par paypal
            res.json({
                success : true
            });
            res.end();
        }
    });
});

router.get('/cancelPayment', function (req, res) {
    
    console.log('Payment cancel');
    console.log('-----------------------------');
    res.json({
        success: false
    });
    res.end();
});
module.exports = router;