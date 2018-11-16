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
    getByIdClient : function(idClient){
        return CommandeForfait.populate('client').find({'client._id' : idClient});
    },
    getAll : function () {
        return CommandeForfait.find({}).populate('prestation').populate('client').populate('prestataires').sort([['dateCreation',-1]]);
    },
    updateStatus : function (idCommande, status) {
        getById(idCommande).exec(function (err, result) {
            result[0].status = status;
            result[0].save();
        })
    }
};