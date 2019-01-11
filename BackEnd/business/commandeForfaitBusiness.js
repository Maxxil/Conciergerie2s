var CommandeForfait = require('./../model/commandeForfaitModel');
var notificationBusiness = require('./../business/notificationBusiness');

module.exports = {
    add : function (commande) {
        commande.save().then(() => notificationBusiness.newCommande(commande));

    },
    addPrestataire : function (idCommande, idPrestataire) {
        CommandeForfait.find({_id : idCommande}).exec(function (err,result) {
            if(result != null || result.length == 1){
                result[0].prestataires.push(idPrestataire);
                result[0].save().then(() => notificationBusiness.propositionPrestataire(result[0]));  
            }
        })
    },
    getById : function (idCommande) {
        return CommandeForfait.find({_id : idCommande});
    },
    getByIdClient : function(idClient){
        return CommandeForfait.find({'client' : idClient})
            .populate([ {path : 'client'}, {path : 'prestation' }
                ,{path : 'prestataires' , populate : {path: 'utilisateur' , select : '_id'}}]).sort('-dateCreation');
    },
    getByIdPrestation : function (idPrestation) {
        return CommandeForfait.find({'prestation._id' : idPrestation}).populate('prestation').sort('-dateCreation');
    },
    getByListIdPrestation : function (idsPrestations) {
        return CommandeForfait.find({'prestation' : {'$in' : idsPrestations}})
            .populate([
                {path : 'prestation' },
                {path : 'client' , select : '_id nom prenom telephoneMobile ville codepostal email'}, 
                {path : 'prestataires' , populate : {path: 'client' , select : '_id nom prenom'}}                
            ]).sort('-dateCreation');
    },
    getAll : function () {
        return CommandeForfait.find({})
            .populate([
                {path : 'prestation'} , 
                {path : 'client'},
                {path : 'prestataireChoisi', populate :{path: 'utilisateur',  select : 'nom prenom'}},
                {path : 'prestataires',  populate: {path : 'utilisateur', select: 'nom prenom'}}])
            .sort('-dateCreation');
    },
    updateStatus : function (idCommande, status,prestataireChoisi) {
        CommandeForfait.find({_id : idCommande})
            .populate([ 
                    {path : 'client',  select : '_id nom prenom lastPlayerId'}, 
                    {path : 'prestataireChoisi', 
                        populate :{path: 'utilisateur',  select : '_id nom prenom lastPlayerId'} }
                    ]).exec(function (err, result) {

            commande = result[0];
            commande.status = status;
            commande.prestataireChoisi = prestataireChoisi;
            commande.save().then(() => notificationBusiness.prestataireChoisi(commande));  
        });
    }
};