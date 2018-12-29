var CommandeHoraire = require('./../model/commandHoraireModel');
var enums = require('./../helper/enums');

module.exports = {
    add : function (commande) {
       return commande.save();
    },
    addPrestataire : function (idCommande, idPrestataire) {
        CommandeHoraire.find({_id : idCommande}).exec(function (err,result) {
            if(result != null || result.length == 1){
                result[0].prestataires.push(idPrestataire);
                result[0].status = enums.CommandeStatus.EN_COURS_VALIDATION;
                result[0].save();
               
            }
        })
    },
    getById : function (idCommande) {
        return CommandeHoraire.find({_id : idCommande});
    },
    getAll : function () {
        return CommandeHoraire.find({}).populate([{path : 'prestation'} , {path : 'client'},
            {path : 'prestataires', populate: {path : 'utilisateur', select: 'nom prenom'}}]).sort([['dateCreation',-1]]);
    },
    getByIdClient : function(idClient){
        return CommandeHoraire.find({'client' : idClient})
            .populate([ {path : 'client'}, {path : 'prestation' }
                ,{path : 'prestataires' , populate : {path: 'utilisateur' , select : '_id'}}]);;
    },
    getByIdPrestation : function (idPrestation) {
        return CommandeHoraire.find({'prestation._id' : idPrestation});
    },
    getByListIdPrestation : function (idsPrestations) {
        return CommandeHoraire.find({'prestation' : {'$in' : idsPrestations}}).populate('prestation prestataires')
            .populate([{path : 'prestation' },{path : 'prestataires' , populate : {path: 'utilisateur' , select : '_id'}}]);
    },
    updateStatus : function (idCommande, status,prestataireChoisi) {
        CommandeHoraire.find({_id : idCommande}).exec(function (err, result) {
            result[0].status = status;
            result[0].prestataireChoisi = prestataireChoisi
            result[0].save();
        })
    }
};