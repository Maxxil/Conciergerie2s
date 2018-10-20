var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var prestataireBusiness = require('./../business/prestataireBusiness');
var Prestataire = require('./../model/prestataireModel');
var Status = require('./../helper/statusEnum');

router.use(bodyParser.json());

router.post('/:id', function(req, res){
    var promise = prestataireBusiness.getById(req.params.id);
    promise.exec(function(err, result){
        if(result != null){
            result.status = Status.Valide;
            result.save();
        }
        res.end();
    });
});

module.exports = router;