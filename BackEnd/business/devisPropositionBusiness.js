var DevisProposition = require('../model/devisPropositionModel');
module.exports = {
    add : function (idPrestataire, prix, dateProposee) {
        var proposition = new DevisProposition({
            prestataire: idPrestataire,
            prix : prix,
            dateProposee : dateProposee,
            date : new Date()
        });
        proposition.save();
        return proposition._id;
    },
    getAll : function () {
        return DevisProposition.find({}).populate([{path : prestataire} , {path : devis}]);
    },
    getById : function (id) {
        return DevisProposition.find({_id : id}).populate([{path : prestataire} , {path : devis}]);
    },
    getByListIdDevis : function (listeIdDevis) {
        return DevisProposition.find({}).where('devis').in(listeIdDevis).populate({path : 'prestataire' ,
            populate : {path : 'utilisateur' , select : 'nom prenom' }
        });
    }
};
