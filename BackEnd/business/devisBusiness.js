var Devis = require('./../model/devisModel');

module.exports = {
    add : function (devis) {
        devis.save();
    },
    addPrestataire : function (idDevis, idPrestataire) {
        getById(idDevis).exec(function (err,result) {
            if(result != null || result.length == 1){
                result.prestataires.push(idPrestataire);
                result.save();
            }
        })
    },
    getById : function (idDevis) {
        return Devis.find({_id : idDevis});
    },
    getAll : function () {
        return Devis.find({}).populate('prestation client').sort([['dateCreation',-1]]);
    },
    getByIdClient : function(idClient){
        return CommandeForfait.populate('client').find({'client._id' : idClient});
    },
    updateStatus : function (idCommande, status) {
        Devis.find({_id : idCommande}).exec(function (err, result) {
            result[0].status = status;
            result[0].save();
        })
    }
};