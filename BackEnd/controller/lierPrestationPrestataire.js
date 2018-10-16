var router = require('express').Router();
var bodyParser = require('body-parser');

var prestationBusiness = require('./../business/prestationBusiness');

router.use(bodyParser.json());

router.post('/' , function(req , res){
    var promise = prestationBusiness.getById(req.params.idPrestation);
    promise.exec(function(err, result){
        if(result != null ){
            result.prestataire.push(res.params.idPrestataire);
            result.save();
        }
    });
});

module.exports = router;