var router = require('express').Router();
var bodyParser = require('body-parser');

var devisBusiness = require('./../business/devisBusiness');
var Devis = require('./../model/devisModel');
var prestataireBusiness = require('./../business/prestataireBusiness');

router.use(bodyParser.json());

router.get('/:token' , function (req, res) {
    var promise = devisBusiness.getAll();
    promise.exec(function (err, result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.get('/:id/:token', function (req, res) {
    var promise = devisBusiness.getById(req.params.id);
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
    devisBusiness.updateStatus(idCommande,status,prestataireChoisi);
    res.json({
        success : true
    });
    res.end();
});

router.post('/prestataire/:token' , function (req, res) {
    var idCommande = req.body.idCommande;
    var idUtilisateur = req.body.idUtilisateur;
    prestataireBusiness.getByIdUtilisateur(idUtilisateur).exec(function(err, prestataire){
        console.log(prestataire);
        devisBusiness.addPrestataire(idCommande, prestataire[0]._id);
        res.json({
            success: true
        });
        res.end();
    });
});

router.put('/:token', function(req, res){
    var commande = new Devis({
        client : req.body.idClient,
        prestation : req.body.idPrestation,
        prestataire : [],
        information : req.body.information,
        heure : req.body.heure,
        date : req.body.date,
        dateCreation : Date.now(),
        status : req.body.status
    });
    devisBusiness.add(commande);
    res.json({
        success : true
    });
    res.end();
});

module.exports = router;