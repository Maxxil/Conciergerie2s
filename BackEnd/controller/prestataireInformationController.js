var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var prestataireBusiness = require('./../business/prestataireBusiness');
var utilisateurBusiness = require('./../business/utilisateurBusiness');
var Prestataire = require('./../model/prestataireModel');
var Status = require('./../helper/statusEnum');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

router.get('/:id' , function(req,res){
    var promise = prestataireBusiness.getById(req.params.id);
    promise.exec(function (err,result) {
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        });
        res.end();
    })
});

module.exports = router;