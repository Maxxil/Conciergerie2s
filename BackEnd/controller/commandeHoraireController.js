var router = require('express').Router();
var bodyParser = require('body-parser');

var commandeHoraireBusiness = require('./../business/commandeHoraireBusiness');
var CommandeHoraire = require('./../model/commandHoraireModel');
var prestataireBusiness = require('./../business/prestataireBusiness');

router.use(bodyParser.json());

router.get('/:token' , function (req, res) {
    var promise = commandeHoraireBusiness.getAll();
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.get('/:id/:token', function (req, res) {
    var promise = commandeHoraireBusiness.getById(req.params.id);
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
    commandeHoraireBusiness.updateStatus(idCommande,status,prestataireChoisi);
    res.json({
        success : true
    });
    res.end();
});

router.post('/prestataire/:token' , function (req, res) {
    var idCommande = req.body.idCommande;
    var idUtilisateur = req.body.idUtilisateur;
    console.log(idUtilisateur);
    prestataireBusiness.getByIdUtilisateur(idUtilisateur).exec(function(err, prestataire){
        console.log(prestataire[0]._id);
        commandeHoraireBusiness.addPrestataire(idCommande, prestataire[0]._id);
        res.json({
            success: true
        });
        res.end();
    });
});

router.put('/:token', function(req, res){
    console.log(req.body);
    var commande = new CommandeHoraire({
        client : req.body.idClient,
        prestation : req.body.idPrestation,
        prestataire : [],
        date : req.body.date,
        duree : req.body.duree,
        quantite : req.body.quantite,
        heure : req.body.heure,
        dateCreation : Date.now(),
        status : req.body.status
    });
    commandeHoraireBusiness.add(commande);
    res.json({
        success : true
    });
    res.end();
});

module.exports = router;