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
        return CommandeHoraire.find({}).populate('prestation').populate('client').sort([['dateCreation',-1]]);
    },
    getByIdClient : function(idClient){
        return CommandeHoraire.populate('client').find({'client._id' : idClient});
    },
    getByIdPrestation : function (idPrestation) {
        return CommandeHoraire.find({'prestation._id' : idPrestation});
    },
    getByListIdPrestation : function (idsPrestations) {
        return CommandeHoraire.find({'prestation' : {'$in' : idsPrestations}}).populate('prestation');
    },
    updateStatus : function (idCommande, status) {
        CommandeHoraire.find({_id : idCommande}).exec(function (err, result) {
            result[0].status = status;
            result[0].save();
        })
    }
};