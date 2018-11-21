var router = require('express').Router();
var bodyParser = require('body-parser');

var serviceBusiness = require('./../business/serviceBusiness');
var errorEnum = require('./../helper/errorEnum');
var Enums = require('./../helper/enums');

router.use(bodyParser.json());

router.get('/' , function(req, res){
    var promise = serviceBusiness.getAllWithPrestation();
    promise.exec(function(err, result){
        res.json({
            success: true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        });
        res.end();
    });
});

router.get('/:idService' , function(req, res){

    var promise = serviceBusiness.getByIdWithPrestations(req.params.idService);
    promise.exec(function(err, result){
        if(result != null){
            res.json({
                success : true,
                errorEnum : errorEnum.error.AUCUNE_ERREUR,
                data : result
            });
        }
        res.end();
    })
});

router.post('/' , function(req , res){
    var promise = serviceBusiness.getById(req.body.idService);
    promise.exec(function(err, result){
        if(result != null && result.prestations.indexOf(req.body.idPrestation) == -1){
            result.prestations.push(req.body.idPrestation);
            result.save();
            res.json({
                success : true,
                error: Enums.Error.AUCUNE_ERREUR
            });
            res.end();
        }
        else{
            res.json({
                success : false,
                error : Enums.Error.PRESTATION_EXISTANTE_DANS_SERVICE
            });
            res.end();
        }
    });
});

router.delete('/', function (req, res) {
   var idService = req.body.idService;
   var idPrestation = req.body.idPrestation;
   serviceBusiness.deletePrestation(idService, idPrestation);
   res.json({
       success : true
   });
   res.end();
});

module.exports = router;