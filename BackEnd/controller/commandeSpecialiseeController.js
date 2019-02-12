var router = require('express').Router();
var bodyParser = require('body-parser');

var commandeSpecialiseeBusiness = require('../business/commandeSpecialiseeBusiness');
var CommandeSpecialisee = require('../model/commandSpecialiseeModel');
var prestataireBusiness = require('./../business/prestataireBusiness');

router.use(bodyParser.json());

router.get('/:token' , function (req, res) {
    var promise = commandeSpecialiseeBusiness.getAll();
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.get('/:id/:token', function (req, res) {
    var promise = commandeSpecialiseeBusiness.getById(req.params.id);
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.post('/' , function (req, res) {
    var idCommande = req.body.idCommande;
    var status = req.body.status;
    var prestataireChoisi = req.body.prestataireChoisi;
    commandeSpecialiseeBusiness.updateStatus(idCommande,status,prestataireChoisi);
    res.json({
        success : true
    });
    res.end();
});

router.post('/prestataire' , function (req, res) {
    var idCommande = req.body.idCommande;
    var idUtilisateur = req.body.idUtilisateur;
    prestataireBusiness.getByIdUtilisateur(idUtilisateur).exec(function(err, prestataire){
        commandeSpecialiseeBusiness.addPrestataire(idCommande, prestataire[0]._id);
        res.json({
            success: true
        });
        res.end();
    });
});

router.put('/', function(req, res){
    var commande = new CommandeSpecialisee({
        client : req.body.commande.idClient,
        prestation : req.body.commande.idPrestation,
        prestataire : [],
        date : req.body.commande.date,
        duree : req.body.commande.duree,
        quantite : req.body.commande.quantite,
        heure : req.body.commande.heure,
        dateCreation : Date.now(),
        status : req.body.commande.status
    });

    commandeSpecialiseeBusiness.add(commande);

    res.json({
        success : true
    });
    res.end();
});

module.exports = router;