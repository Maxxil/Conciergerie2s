var router = require('express').Router();
var bodyParser = require('body-parser');

var commandeForfaitBusiness = require('./../business/commandeForfaitBusiness');
var CommandeForfait = require('./../model/commandeForfaitModel');
var prestataireBusiness = require('./../business/prestataireBusiness');

router.use(bodyParser.json());

router.get('/:token' , function (req, res) {
    var promise = commandeForfaitBusiness.getAll();
    promise.exec(function (err, result) {
        console.log("Obtenir toutes les commandes forfait");
        console.log(result);
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.get('/:id/:token', function (req, res) {
    console.log("Obtenir commande forfait par Id " + req.params.id);
    var promise = commandeForfaitBusiness.getById(req.params.id);
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
    commandeForfaitBusiness.updateStatus(idCommande,status,prestataireChoisi);
    res.json({
        success : true
    });
    res.end();
});

router.post('/prestataire' , function (req, res) {
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

router.put('/', function(req, res){
    console.log(req.body);
    var commande = new CommandeForfait({
        client : req.body.commande.idClient,
        prestation : req.body.commande.idPrestation,
        prestataire : [],
        date : req.body.commande.date,
        heureDebut : req.body.commande.heureDebut,
        heureFin : req.body.commande.heureFin,
        dateCreation : Date.now(),
        quantite : req.body.commande.quantite,
        status : req.body.commande.status
    });
    commandeForfaitBusiness.add(commande);
    res.json({
        success : true
    });
    res.end();
});

module.exports = router;