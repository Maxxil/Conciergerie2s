var CommandeForfait = require('./../model/commandeForfaitModel');

module.exports = {
    add : function (commande) {
        console.log("Add forfait");
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
        return CommandeForfait.find({_id : idCommande});
    },
    getAll : function () {
        return CommandeForfait.find({}).populate('prestation client prestataires').sort([['dateCreation',-1]]);
    }
};