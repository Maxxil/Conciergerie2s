var Devis = require('./../model/devisModel');

module.exports = {
    add : function (devis) {
        devis.save();
    },
    addPrestataire : function (idDevis, idPrestataire) {
        Devis.find({_id : idDevis}).exec(function (err,result) {
            if(result != null || result.length == 1){
                result[0].prestataires.push(idPrestataire);
                result[0].save();
            }
        })
    },
    getById : function (idDevis) {
        return Devis.find({_id : idDevis});
    },
    getAll : function () {
        return Devis.find({}).populate([{path : 'prestation'} , {path : 'client'},
            {path : 'prestataires',populate: {path : 'utilisateur', select: 'nom prenom'}}]).sort([['dateCreation',-1]]);
    },
    getByIdPrestation : function (idPrestation) {
        return Devis.find({'prestation._id' : idPrestation}).populate('prestation');
    },
    getByIdClient : function(idClient){
        return Devis.find({'client' : idClient}).populate('client')
            .populate([ {path : 'client'}, {path : 'prestation' }
                        ,{path : 'prestataires' , populate : {path: 'utilisateur' , select : '_id'}}]);
    },
    getByListIdPrestation : function (idsPrestations) {
        return Devis.find({'prestation' : {'$in' : idsPrestations}}).populate('prestation prestataires')
            .populate([{path : 'prestation' },{path : 'prestataires' , populate : {path: 'utilisateur' , select : '_id'}}]);
    },
    updateStatus : function (idCommande, status, prestataireChoisi) {
        Devis.find({_id : idCommande}).exec(function (err, result) {
            result[0].status = status;
            result[0].prestataireChoisi = prestataireChoisi;
            result[0].save();
        })
    }
};