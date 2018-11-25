var CommandeForfait = require('./../model/commandeForfaitModel');

module.exports = {
    add : function (commande) {
        commande.save();
    },
    addPrestataire : function (idCommande, idPrestataire) {
        CommandeForfait.find({_id : idCommande}).exec(function (err,result) {
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
        return CommandeForfait.find({'client' : idClient})
            .populate([ {path : 'client'}, {path : 'prestation' }
                ,{path : 'prestataires' , populate : {path: 'utilisateur' , select : '_id'}}]);;
    },
    getByIdPrestation : function (idPrestation) {
        return CommandeForfait.find({'prestation._id' : idPrestation}).populate('prestation');
    },
    getByListIdPrestation : function (idsPrestations) {
        return CommandeForfait.find({'prestation' : {'$in' : idsPrestations}})
            .populate([{path : 'prestation' },{path : 'prestataires' , populate : {path: 'utilisateur' , select : '_id'}}])
    },
    getAll : function () {
        return CommandeForfait.find({})
            .populate([{path : 'prestation'} , {path : 'client'},
                {path : 'prestataires',  populate: {path : 'utilisateur', select: 'nom prenom'}}])
            .sort([['dateCreation',-1]]);
    },
    updateStatus : function (idCommande, status,prestataireChoisi) {
        CommandeForfait.find({_id : idCommande}).exec(function (err, result) {
            result[0].status = status;
            result[0].prestataireChoisi = prestataireChoisi;
            result[0].save();
        })
    }
};