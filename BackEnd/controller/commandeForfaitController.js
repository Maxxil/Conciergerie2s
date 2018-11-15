var router = require('express').Router();
var bodyParser = require('body-parser');

var commandeForfaitBusiness = require('./../business/commandeForfaitBusiness');
var CommandeForfait = require('./../model/commandeForfaitModel');

router.use(bodyParser.json());

router.get('/' , function (req, res) {
    var promise = commandeForfaitBusiness.getAll();
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.get('/:id', function (req, res) {
    var promise = commandeForfaitBusiness.getById(req.params.id);
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.put('/', function(req, res){
    console.log(commandeForfaitBusiness);
    var commande = new CommandeForfait({
        client : req.body.idUtilisateur,
        prestation : req.body.idPrestation,
        prestataire : [],
        date : req.body.date,
        heureDebut : req.body.heureDebut,
        heureFin : req.body.heureFin,
        dateCreation : Date.now()
    });
    commandeForfaitBusiness.add(commande);
    res.json({
        success : true
    });
    res.end();
});

module.exports = router;