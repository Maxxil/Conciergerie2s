var router = require('express').Router();
var bodyParser = require('body-parser');

var commandeForfaitBusiness = require('./../business/commandeForfaitBusiness');
var CommandeForfait = require('./../model/commandeForfaitModel');
var prestataireBusiness = require('./../business/prestataireBusiness');

router.use(bodyParser.json());

router.get('/:token' , function (req, res) {
    var promise = commandeForfaitBusiness.getAll();
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.get('/:id/:token', function (req, res) {
    var promise = commandeForfaitBusiness.getById(req.params.id);
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.post('/:token' , function (req, res) {
    var idCommande = req.body.idCommande;
    var status = req.body.status;
    var prestataireChoisi = req.body.prestataireChoisi;
    commandeForfaitBusiness.updateStatus(idCommande,status,prestataireChoisi);
    res.json({
        success : true
    });
    res.end();
});

router.post('/prestataire/:token' , function (req, res) {
    var idCommande = req.body.idCommande;
    var idUtilisateur = req.body.idUtilisateur;
    prestataireBusiness.getByIdUtilisateur(idUtilisateur).exec(function(err, prestataire){
        commandeForfaitBusiness.addPrestataire(idCommande, prestataire[0]._id);
        res.json({
            success: true
        });
        res.end();
    });
});

router.put('/:token', function(req, res){
    console.log(commandeForfaitBusiness);
    var commande = new CommandeForfait({
        client : req.body.idClient,
        prestation : req.body.idPrestation,
        prestataire : [],
        date : req.body.date,
        heureDebut : req.body.heureDebut,
        heureFin : req.body.heureFin,
        dateCreation : Date.now(),
        quantite : req.body.quantite,
        status : req.body.status
    });
    commandeForfaitBusiness.add(commande);
    res.json({
        success : true
    });
    res.end();
});

module.exports = router;