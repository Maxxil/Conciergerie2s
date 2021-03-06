var router = require('express').Router();
var bodyParser = require('body-parser');

var prestationBusiness = require('./../business/prestationBusiness');
var errorEnum = require('./../helper/errorEnum');
var Enums = require('./../helper/enums');

router.use(bodyParser.json());

router.post('/' , function(req , res){
    var promise = prestationBusiness.getById(req.body.idPrestation);
    promise.exec(function(err, result){
        if(result != null && result.prestataire.indexOf(req.body.idPrestataire) == -1){
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

router.get('/:token' , function (req,res) {
    var promise = prestationBusiness.getOnlyWithPrestataires();
    promise.exec(function (err , result) {
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        });
        res.end();
    })
});

router.get('/:id/:token', function (req, res) {
    var promise = prestationBusiness.getByIdWithPrestataire(req.body.id);
    promise.exec(function (err,result) {
        res.json({
            success: true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        })
    })
});

router.delete('/:idPrestation/:idPrestataire/:token', function (req,res) {
    var idPrestation = req.params.idPrestation;
    var idPrestataire = req.params.idPrestataire;
    prestationBusiness.deletePrestataire(idPrestation, idPrestataire);
    res.json({
        success :true
    });
    res.end();
});

module.exports = router;