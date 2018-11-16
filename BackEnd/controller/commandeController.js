var router = require('express').Router();
var bodyParser = require('body-parser');

var commandeForfaitBusiness = require('./../business/commandeForfaitBusiness');
var commandeHoraireBusiness = require('./../business/commandeHoraireBusiness');
var devisBusiness = require('./../business/devisBusiness');
var CommandeForfait = require('./../model/commandeForfaitModel');

router.use(bodyParser.json());

router.get('/:idClient' , function (req, res) {
    var idClient = req.params.idClient;
    commandeForfaitBusiness.getByIdClient(idClient).exec(function (err,commandeForfait) {
        commandeHoraireBusiness.getByIdClient(idClient).exec(function (err,commandeHoraire) {
            devisBusiness.getByIdClient(idClient).exec(function (err,devis) {
                res.json({
                    success : true,
                    data : commandeHoraire.length + commandeForfait.length + devis.length
                });
                res.end();
            })
        })
    });
});


module.exports = router;