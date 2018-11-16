var router = require('express').Router();
var bodyParser = require('body-parser');

var commandeHoraireBusiness = require('./../business/commandeHoraireBusiness');
var CommandeHoraire = require('./../model/commandHoraireModel');

router.use(bodyParser.json());

router.get('/' , function (req, res) {
    var promise = commandeHoraireBusiness.getAll();
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.get('/:id', function (req, res) {
    var promise = commandeHoraireBusiness.getById(req.params.id);
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.put('/', function(req, res){
    console.log(req.body);
    var commande = new CommandeHoraire({
        client : req.body.idClient,
        prestation : req.body.idPrestation,
        prestataire : [],
        date : req.body.date,
        duree : req.body.duree,
        heure : req.body.heure,
        dateCreation : Date.now()
    });
    commandeHoraireBusiness.add(commande);
    res.json({
        success : true
    });
    res.end();
});

module.exports = router;