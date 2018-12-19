var DevisProposition = require('../model/devisPropositionModel');
module.exports = {
    add : function (idPrestataire, idDevis, prix, dateProposee) {
        var proposition = new DevisProposition({
            prestataire: idPrestataire,
            devis : idDevis,
            prix : prix,
            dateProposee : dateProposee,
            date : new Date()
        });
        proposition.save();
    },
    getAll : function () {
        return DevisProposition.find({}).populate([{path : prestataire} , {path : devis}]);
    },
    getById : function (id) {
        return DevisProposition.find({_id : id}).populate([{path : prestataire} , {path : devis}]);
    }
};
