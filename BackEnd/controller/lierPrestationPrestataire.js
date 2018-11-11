var router = require('express').Router();
var bodyParser = require('body-parser');

var prestationBusiness = require('./../business/prestationBusiness');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

router.post('/' , function(req , res){
    var promise = prestationBusiness.getById(req.body.idPrestation);
    promise.exec(function(err, result){
        if(result != null ){
            result.prestataire.push(req.body.idPrestataire);
            result.save();
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
})

module.exports = router;