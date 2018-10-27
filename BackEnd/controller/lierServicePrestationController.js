var router = require('express').Router();
var bodyParser = require('body-parser');

var serviceBusiness = require('./../business/serviceBusiness');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

router.get('/' , function(req, res){
    var promise = serviceBusiness.getAllWithPrestation();
    promise.exec(function(err, result){
        console.log(result);
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
        console.log(result);
        if(result != null){
            res.json({
                success : true,
                errorEnum : errorEnum.error.AUCUNE_ERREUR,
                data : result.prestations
            });
        }
        res.end();
    })
});

router.post('/' , function(req , res){
    console.log(req.body);
    var promise = serviceBusiness.getById(req.body.idService);
    promise.exec(function(err, result){
        if(result != null ){
            result.prestations.push(req.body.idPrestation);
            result.save();
        }
    });
});

module.exports = router;