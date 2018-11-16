var CommandeHoraire = require('./../model/commandHoraireModel');

module.exports = {
    add : function (commande) {
        commande.save();
    },
    addPrestataire : function (idCommande, idPrestataire) {
        getById(idCommande).exec(function (err,result) {
            if(result != null || result.length == 1){
                result.prestataires.push(idPrestataire);
                result.save();
            }
        })
    },
    getById : function (idCommande) {
        return CommandeHoraire.find({_id : idCommande});
    },
    getAll : function () {
        return CommandeHoraire.find({}).sort('dateCreation',-1);
    }
};