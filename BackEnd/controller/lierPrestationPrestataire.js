var router = require('express').Router();
var bodyParser = require('body-parser');

var prestationBusiness = require('./../business/prestationBusiness');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

router.post('/' , function(req , res){
    var promise = prestationBusiness.getById(req.body.idPrestation);
    promise.exec(function(err, result){
        if(result != null ){
            result.prestataire.push(res.body.idPrestataire);
            result.save();
        }
    });
});

router.get('/' , function (req,res) {
    var promise = prestationBusiness.getWithPrestataire();
    promise.exec(function (err , result) {
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        });
        res.end();
    })
});

module.exports = router;