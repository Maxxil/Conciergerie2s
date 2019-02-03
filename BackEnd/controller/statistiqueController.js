var router = require('express').Router();
var bodyParser = require('body-parser');

var statistiqueBusiness = require('../business/statistiqueBusiness');
var devisBusiness = require('../business/devisBusiness');

router.use(bodyParser.json());

router.get('/dashboard' , function(req , res){
    console.log('Statistique');
    var stats = {};
    stats.data = {};
    var promise = statistiqueBusiness.devisC2S();
    promise.exec(function(err, c2s){           
        stats.success = true;
        stats.data.devisC2s = c2s.pop();        
      //  res.json(stats);
        //res.end();
        promise =  statistiqueBusiness.devis()
        promise.exec(function(err, devispresta) {
            var montantPrestataire = 0;
            var nbPaiement = 0;
            devispresta.forEach(element => {
                console.log("Prestataire choisi ",element.prestataireChoisi);
                console.log(element.propositions);
                let proposition = element.propositions.filter(x => x.prestataire.toString() == element.prestataireChoisi._id.toString()).pop();
                console.log(proposition);
                if(proposition) {
                montantPrestataire+= proposition.prix;
                nbPaiement++;
                }
            });

            stats.data.devisPresta = { 
                total: montantPrestataire,
                count: nbPaiement
            };

            promise = statistiqueBusiness.cmdHoraire();

            promise.exec(function(err, cmdHoraires) {
                var montantHoraires = 0;                
                cmdHoraires.forEach(element => {
                    montantHoraires+= (element.quantite * element.prestation.prix);                    
                });

                stats.data.commandeUnites = { 
                    total: montantHoraires,
                    count: cmdHoraires.length
                };

                promise = statistiqueBusiness.cmdForfait();

                promise.exec(function(err, cmdForfaits) {
                    var montantForfait = 0;                
                    cmdForfaits.forEach(element => {
                        montantForfait+= (element.quantite * element.prestation.prix);                    
                    });

                    stats.data.commandeForfaits = { 
                        total: montantForfait,
                        count: cmdForfaits.length
                    };

                    promise = statistiqueBusiness.devisByStatus();

                    promise.exec(function(err, devisbyStatus) {
                        stats.data.devisbyStatus = devisbyStatus;

                        promise = statistiqueBusiness.cmdUnitesByStatus();

                        promise.exec(function(err, cmdUbyStatus) {
                            stats.data.commandeUnites.status = cmdUbyStatus;

                            promise = statistiqueBusiness.cmdForfaitByStatus();

                            promise.exec(function(err, cmdFbyStatus) {
                                stats.data.commandeForfaits.status = cmdFbyStatus;
                                
                                promise = statistiqueBusiness.utilisateurs();

                                promise.exec(function(err, utilisateurs) {
                                    stats.data.utilisateurs = utilisateurs;
                                    res.json(stats);
                                    res.end();
                                });
                            });
                        });                        
                    });
                });
            });
        });
                
    });
});

module.exports = router;