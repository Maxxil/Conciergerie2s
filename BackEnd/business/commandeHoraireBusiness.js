var CommandeHoraire = require('./../model/commandHoraireModel');
var notificationBusiness = require('./../business/notificationBusiness');
var enums = require('./../helper/enums');

module.exports = {
    add : function (commande) {

        var promise = commande.save();

        promise.then(function (elt) {
            notificationBusiness.newCommande(elt);
        });
       
    },
    addPrestataire : function (idCommande, idPrestataire) {
        CommandeHoraire.find({_id : idCommande}).exec(function (err,result) {
            if(result != null || result.length == 1){
                result[0].prestataires.push(idPrestataire);
                result[0].status = enums.CommandeStatus.EN_COURS_VALIDATION;
                result[0].save().then(() => notificationBusiness.propositionPrestataire(result[0]));  
               
            }
        })
    },
    getById : function (idCommande) {
        return CommandeHoraire.find({_id : idCommande});
    },
    getAll : function () {
        return CommandeHoraire.find({})  .populate([
            {path : 'prestation'} , 
            {path : 'client'},
            {path : 'prestataireChoisi', populate :{path: 'utilisateur',  select : 'nom prenom'}},
            {path : 'prestataires',  populate: {path : 'utilisateur', select: 'nom prenom'}}])
        .sort('-dateCreation');
    },
    getByIdClient : function(idClient){
        return CommandeHoraire.find({'client' : idClient})
            .populate([ {path : 'client'}, {path : 'prestation' }
                ,{path : 'prestataires' , populate : {path: 'utilisateur' , select : '_id'}}]).sort('-dateCreation');
    },
    getByIdPrestation : function (idPrestation) {
        return CommandeHoraire.find({'prestation._id' : idPrestation}).sort('-dateCreation');
    },
    getByListIdPrestation : function (idsPrestations) {
        return CommandeHoraire.find({'prestation' : {'$in' : idsPrestations}}) .populate([
            {path : 'prestation' },
            {path : 'client' , select : '_id nom prenom telephoneMobile ville codepostal email'}, 
            {path : 'prestataires' , populate : {path: 'client' , select : '_id nom prenom'}}                
        ]).sort('-dateCreation');
    },
    updateStatus : function (idCommande, status,prestataireChoisi) {
        CommandeHoraire.find({_id : idCommande}) .populate([ 
            {path : 'client',  select : '_id nom prenom lastPlayerId'}, 
            {path : 'prestataireChoisi', 
                populate :{path: 'utilisateur',  select : '_id nom prenom lastPlayerId'} }
            ]).exec(function (err, result) {

                commande = result[0];
                commande.status = status;
                commande.prestataireChoisi = prestataireChoisi;
                commande.save().then(() => notificationBusiness.prestataireChoisi(commande)); 
        })
    }
};