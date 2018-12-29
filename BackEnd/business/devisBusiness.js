var Devis = require('./../model/devisModel');
var notificationBusiness = require('./../business/notificationBusiness');
module.exports = {
    add : function (devis) {
        devis.save().then(() => notificationBusiness.newDevis(devis));              
    },
    addProposition : function (idDevis, idProposition) {
        Devis.find({_id : idDevis}).exec(function (err,result) {
            if(result != null || result.length == 1){
                if(result[0].propositions == [])
                {
                    result[0].propositions = [];
                }
                result[0].propositions.push(idProposition);
                result[0].save();
            }
        })
    },
    getById : function (idDevis) {
        return Devis.find({_id : idDevis});
    },
    getAll : function () {
        return Devis.find({}).populate([{path : 'prestation'} , {path : 'client'},
            {
                path : 'propositions',
                populate:
                    {
                        path : 'prestataire' ,
                        populate : {
                            path : 'utilisateur', select: 'nom prenom'
                        }
                    }
            }]).sort('-dateCreation');
    },
    getByIdPrestation : function (idPrestation) {
        return Devis.find({'prestation._id' : idPrestation}).populate('prestation').sort('-dateCreation');
    },
    getByIdClient : function(idClient){
        return Devis.find({'client' : idClient}).populate('client')
            .populate([
                {path : 'client'}, {path : 'prestation' },
                {
                    path : 'propositions' , populate :
                    {
                        path : 'prestataire' , populate : {path: 'utilisateur' , select : '_id'}
                    }

                }]).sort('-dateCreation');
    },
    getByListIdPrestation : function (idsPrestations) {
        return Devis.find({'prestation' : {'$in' : idsPrestations}})
            .populate([{path : 'prestation' }, {
                path: "propositions", populate: {
                    path: 'prestataire', populate: {path: 'utilisateur', select: '_id'}
                }
            }]).sort('-dateCreation');
    },
    updateStatus : function (idCommande, status, prestataireChoisi) {
        Devis.find({_id : idCommande}).exec(function (err, result) {
            result[0].status = status;
            result[0].prestataireChoisi = prestataireChoisi;
            result[0].save();
        })
    },
    selectIds : function (devis) {
        var out = [];
        devis.forEach(function(element){
            out.push(element._id);
        });
        return out;
    }
};