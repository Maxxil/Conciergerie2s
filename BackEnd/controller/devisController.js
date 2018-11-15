var router = require('express').Router();
var bodyParser = require('body-parser');

var devisBusiness = require('./../business/devisBusiness');
var Devis = require('./../model/devisModel');

router.use(bodyParser.json());

router.get('/' , function (req, res) {
    var promise = devisBusiness.getAll();
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.get('/:id', function (req, res) {
    var promise = devisBusiness.getById(req.params.id);
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.put('/', function(req, res){
    var commande = new Devis({
        client : req.body.idClient,
        prestation : req.body.idPrestation,
        prestataire : [],
        information : req.body.information,
        heure : req.body.heure,
        date : req.body.date,
        dateCreation : Date.now()
    });
    devisBusiness.add(commande);
    res.json({
        success : true
    });
    res.end();
});

module.exports = router;