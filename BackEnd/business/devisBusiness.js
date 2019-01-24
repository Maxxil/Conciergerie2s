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
                result[0].save().then(() => notificationBusiness.propositionPrestataireSurDevis(result[0]));  
            }
        })
    },
    getById : function (idDevis) {
        return Devis.find({_id : idDevis}).populate([{path : 'prestation'} , {path : 'client'}, {path: 'prestataireChoisi'},
        {
            path : 'propositions',
            populate:
                {
                    path : 'prestataire' ,
                    populate : {
                        path : 'utilisateur', select: 'nom prenom'
                    }
                }
        }]);
    },
    getAll : function () {
        return Devis.find({}).populate([
            {path : 'prestation'} , 
            {path : 'client'}, 
            {path: 'prestataireChoisi', populate :{path: 'utilisateur',  select : 'nom prenom'}},
            {path : 'propositions',populate:{
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
                {path : 'client'}, {path : 'prestation' }, {path: 'prestataireChoisi'},
                {
                    path : 'propositions' , populate :
                    {
                        path : 'prestataire' , populate : {path: 'utilisateur' , select : '_id'}
                    }

                }]).sort('-dateCreation');
    },
    getByListIdPrestation : function (idsPrestations) {
        return Devis.find({'prestation' : {'$in' : idsPrestations}})
            .populate([{path : 'prestation' },{path : 'client' , select : '_id nom prenom telephoneMobile ville codepostal email'}, {
                path: "propositions", populate: {
                    path: 'prestataire', populate: {path: 'client', select: '_id nom prenom'}
                }
            }]).sort('-dateCreation');
    },
    updateStatus : function (idCommande, status, prestataireChoisi) {
        Devis.find({_id : idCommande}).populate('prestataireChoisi').exec(function (err, result) {
            
            object =  result[0];
            object.status = status;
            object.prestataireChoisi = prestataireChoisi;
            object.save().then(() => notificationBusiness.prestataireChoisi(object));
        })
    },
    updateC2S: function (idCommande, prix, date) {
        console.log('-----------------------');
        console.log('UPDATE C2S');
        console.log('-----------------------');
        Devis.find({_id : idCommande}).exec(function (err, result) {
            console.log(err);
            result[0].prixC2S = prix;            
            result[0].dateC2S = date;     
            result[0].byC2S = 1;
            result[0].status = 2;
            result[0].save().then(() => notificationBusiness.prestataireC2SChoisi(result[0]));
        })

    },
    updateStatusDevis : function (idCommande, status) {
        console.log('Update status devis');
        Devis.find({_id : idCommande}).exec(function (err, result) {
            result[0].status = status;   
            result[0].modepaiement = 'paypal';   
            result[0].save().then(() => notificationBusiness.devisEvent(result[0]));
        })
    },
    updateModePaiement : function (idCommande, modepaiement) {
        console.log('Update mode paiement devis');
        Devis.find({_id : idCommande}).exec(function (err, result) {
            result[0].modepaiement = modepaiement;            
            result[0].save().then(() => notificationBusiness.devisEvent(result[0]));
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