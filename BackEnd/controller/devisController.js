var router = require('express').Router();
var bodyParser = require('body-parser');

var devisBusiness = require('./../business/devisBusiness');
var Devis = require('./../model/devisModel');
var prestataireBusiness = require('./../business/prestataireBusiness');
var devisPropositionBusiness = require('./../business/devisPropositionBusiness');
var notificationBusiness = require('./../business/notificationBusiness');
router.use(bodyParser.json());

router.get('/:token' , function (req, res) {
    var promise = devisBusiness.getAll();
    promise.exec(function (err, result) {
        console.log(result);
        res.json({
            success : true,
            data : result
        });
        res.end();
    });

});

router.get('/:id/:token', function (req, res) {
    var promise = devisBusiness.getById(req.params.id);
    promise.exec(function (err, result) {
        console.log("GET BY ID - DEVIS");
        console.log(result);
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
    devisBusiness.updateStatus(idCommande,status,prestataireChoisi);
    res.json({
        success : true
    });
    res.end();
});

router.post('/prestataire' , function (req, res) {
    var idCommande = req.body.idCommande;
    var idUtilisateur = req.body.idUtilisateur;
    var proposition = req.body.proposition;
    prestataireBusiness.getByIdUtilisateur(idUtilisateur).exec(function(err, prestataire){
        var idProposition = devisPropositionBusiness.add(prestataire[0]._id, proposition.prix, proposition.dateProposee);
        devisBusiness.addProposition(idCommande, idProposition);
        res.json({
            success: true
        });
        res.end();
    });
});

router.put('/', function(req, res){
    var commande = new Devis({
        client : req.body.commande.idClient,
        prestation : req.body.commande.idPrestation,
        prestataire : [],
        information : req.body.commande.information,
        heure : req.body.commande.heure,
        date : req.body.commande.date,
        dateCreation : Date.now(),
        status : req.body.commande.status
    });
    let promise = devisBusiness.add(commande);
    promise.then(function(elt) {
        notificationBusiness.newDevis(elt);
    });
    res.json({
        success : true
    });
    res.end();
});

module.exports = router;