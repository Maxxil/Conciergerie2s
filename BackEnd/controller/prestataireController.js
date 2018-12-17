var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var prestataireBusiness = require('./../business/prestataireBusiness');
var utilisateurBusiness = require('./../business/utilisateurBusiness');
var errorEnum = require('./../helper/errorEnum');
var Prestataire = require('./../model/prestataireModel');
var Status = require('./../helper/statusEnum');

router.use(bodyParser.json());

router.get('/:token' , function(req,res){
    var promise = prestataireBusiness.getAll();
    promise.exec(function(err , result){
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        });
        res.end();
    })
});

router.get('/valides/:token', function(req, res){
    var promise = utilisateurBusiness.getAllPrestataireValides();
    promise.exec(function (err,result) {
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        });
        res.end();
    })
});

router.post('/', function (req, res) {
    var prestataire = req.body.prestataire;
    prestataireBusiness.update(prestataire).then(function (result) {
        res.json({
            success : result.ok
        });
        res.end();
    });
});

module.exports = router;