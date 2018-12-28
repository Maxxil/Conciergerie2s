var router = require('express').Router();
var bodyParser = require('body-parser');

var commandeForfaitBusiness = require('./../business/commandeForfaitBusiness');
var commandeHoraireBusiness = require('./../business/commandeHoraireBusiness');
var devisBusiness = require('./../business/devisBusiness');
var devisPropositionBusiness = require('./../business/devisPropositionBusiness');
var prestationBusiness = require('./../business/prestationBusiness');

router.use(bodyParser.json());

router.get('/:idClient/:token' , function (req, res) {
    var idClient = req.params.idClient;

    commandeForfaitBusiness.getByIdClient(idClient).exec(function (err,commandeForfait) {
        commandeHoraireBusiness.getByIdClient(idClient).exec(function (err,commandeHoraire) {
            devisBusiness.getByIdClient(idClient).exec(function (err,devis) {
                devisPropositionBusiness.getByListIdDevis(devisBusiness.selectIds(devis)).exec(function(err,devisPropositions){
                    console.log("Devis propositions");
                    console.log(devisPropositions);
                    res.json({
                        success : true,
                        data : {
                            commandeHoraire : commandeHoraire,
                            commandeForfait : commandeForfait,
                            devis : devis,
                            devisProposition : devisPropositions
                        }
                    });
                    res.end();
                })

            })
        })
    });
});

router.post('/ByIdUtilisateur' , function (req, res) {
    var idUtilisateur  = req.body.idUtilisateur;
    console.log('Route Commande ByIdutilsiateur', idUtilisateur);
    
    var prestations = [];
    prestationBusiness.getWitlPrestataireAndUtilisateur(idUtilisateur).exec(function(err,prestationsResult){
        prestations = prestationBusiness.getByIdUtilisateurInPrestataire(prestationsResult, idUtilisateur);
        console.log(prestations);
        if(prestations.length > 0)
        {
            commandeForfaitBusiness.getByListIdPrestation(prestations).exec(function (err, commandeForfait) {
                commandeHoraireBusiness.getByListIdPrestation(prestations).exec(function (err, commandeHoraire) {
                    devisBusiness.getByListIdPrestation(prestations).exec(function (err,devis) {
                        res.json({
                            success : true,
                            data : {
                                commandeHoraire : commandeHoraire,
                                commandeForfait : commandeForfait,
                                devis : devis
                            }
                        });
                        res.end();
                    });
                });
            });
        }
        else{
            res.json({
                success : false
            });
            res.end();
        }

    });

});

module.exports = router;