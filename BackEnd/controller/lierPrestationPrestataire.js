var router = require('express').Router();
var bodyParser = require('body-parser');

var prestationBusiness = require('./../business/prestationBusiness');
var errorEnum = require('./../helper/errorEnum');
var Enums = require('./../helper/enums');

router.use(bodyParser.json());

router.post('/' , function(req , res){
    var promise = prestationBusiness.getById(req.body.idPrestation);
    promise.exec(function(err, result){
        console.log(result);
        console.log(result.prestataire.indexOf(req.body.idPrestation));
        if(result != null && result.prestataire.indexOf(req.body.idPrestation) == -1){
            result.prestataire.push(req.body.idPrestataire);
            result.save();
            res.json({
                success : true,
                error :Enums.Error.AUCUNE_ERREUR
            });
            res.end();
        }
        else{
            res.json({
                success : false,
                error : Enums.Error.PRESTATAIRE_EXISTANTE_DANS_PRESTATION
            });
            res.end();
        }
    });
});

router.get('/' , function (req,res) {
    console.log("Prestation only with prestataire");
    var promise = prestationBusiness.getOnlyWithPrestataires();
    promise.exec(function (err , result) {
        console.log(result);
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        });
        res.end();
    })
});

router.get('/:id', function (req, res) {
    var promise = prestationBusiness.getByIdWithPrestataire(req.body.id);
    promise.exec(function (err,result) {
        res.json({
            success: true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        })
    })
});

router.delete('/', function (req,res) {
    var idPrestation = req.body.idPrestation;
    var idPrestataire = req.body.idPrestataire;
    prestationBusiness.deletePrestataire(idPrestation, idPrestataire);
    res.json({
        success :true
    });
    res.end();
});

module.exports = router;