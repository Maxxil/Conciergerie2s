var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var prestataireBusiness = require('./../business/prestataireBusiness');
var utilisateurBusiness = require('./../business/utilisateurBusiness');
var Prestataire = require('./../model/prestataireModel');
var Status = require('./../helper/statusEnum');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

router.post('/', function(req, res){
    console.log("Validation prestataire");
    var promise = utilisateurBusiness.getById(req.body.id);
    promise.exec(function(err, result){
        console.log(result[0]);
        if(result != null){
            result[0].status = Status.status.VALIDE;
            var prestataire = new Prestataire({
                prix : 0,
                utilisateur : result[0]
            });
            console.log("Création prestataire");
            prestataireBusiness.add(prestataire);
            result[0].save();
            //utilisateurBusiness.update(result[0]);
        }
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR
        });
        res.end();
    });
});

module.exports = router;