var Devis = require('./../model/devisModel');

module.exports = {
    add : function (devis) {
        devis.save();
    },
    addPrestataire : function (idDevis, idPrestataire) {
        Devis.find({_id : idDevis}).exec(function (err,result) {
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
    getByIdPrestation : function (idPrestation) {
        return Devis.populate('prestation').find({'prestation._id' : idPrestation});
    },
    getByIdClient : function(idClient){
        return Devis.populate('client').find({'client._id' : idClient});
    },
    getByListIdPrestation : function (idsPrestations) {
        return Devis.find({'prestation' : {'$in' : idsPrestations}}).populate('prestation prestataires')
            .populate([{path : 'prestation' },{path : 'prestataires' , populate : {path: 'utilisateur' , select : '_id'}}]);
    },
    updateStatus : function (idCommande, status) {
        Devis.find({_id : idCommande}).exec(function (err, result) {
            result[0].status = status;
            result[0].save();
        })
    }
};