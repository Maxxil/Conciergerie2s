var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var Status = require('./../helper/statusEnum');
var errorEnum = require('./../helper/errorEnum');
var prestationBusiness = require('./../business/prestationBusiness');

router.use(bodyParser.json());

router.get('/' , function (req, res) {
    var promise = prestationBusiness.getWithPrestataire();
    promise.exec(function (err ,result) {
        console.log(result);
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        });
        res.end();
    });
});

router.get('/:id' , function(req,res){
    console.log("PRESTATION INFORMATION ID");
    var promise = prestationBusiness.getByIdWithPrestataire(req.params.id);
    promise.exec(function (err,result) {
        console.log(result);
        res.json({
            success : true,
            error : errorEnum.error.AUCUNE_ERREUR,
            data : result
        });
        res.end();
    })
});

module.exports = router;