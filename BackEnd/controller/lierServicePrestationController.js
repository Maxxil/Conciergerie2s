var router = require('express').Router();
var bodyParser = require('body-parser');

var serviceBusiness = require('./../business/serviceBusiness');

router.use(bodyParser.json());

router.post('/' , function(req , res){
    var promise = serviceBusiness.getById(req.params.idService);
    promise.exec(function(err, result){
        if(result != null ){
            result.prestations.push(res.params.idPrestation);
            result.save();
        }
    });
});

module.exports = router;