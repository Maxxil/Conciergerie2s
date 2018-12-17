var router = require('express').Router();
var bodyParser = require('body-parser');

var serviceBusiness = require('./../business/serviceBusiness');
var errorEnum = require('./../helper/errorEnum');
var Enums = require('./../helper/enums');

router.use(bodyParser.json());

router.get('/', function (req,res) {
    res.end("coucou");
});

router.get('/:idService/:token' , function(req, res){
    console.log("Lier service prestation");
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

module.exports = router;