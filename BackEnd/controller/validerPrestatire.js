var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var prestataireBusiness = require('./../business/prestataireBusiness');
var utilisateurBusiness = require('./../business/utilisateurBusiness');
var Prestataire = require('./../model/prestataireModel');
var Status = require('./../helper/statusEnum');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

router.post('/:token', function(req, res){
    console.log("Validation prestataire");
    var promise = utilisateurBusiness.getById(req.body.id);
    promise.exec(function(err, result){
        console.log(result);
        if(result != null){
            result.status = Status.status.VALIDE;
            var prestataire = new Prestataire({
                prix : 0,
                utilisateur : result
            });
            console.log("Création prestataire");
            prestataireBusiness.add(prestataire);
            result.save();
        }
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR
        });
        res.end();
    });
});

module.exports = router;