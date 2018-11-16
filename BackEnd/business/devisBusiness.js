var Devis = require('./../model/devisModel');

module.exports = {
    add : function (devis) {
        devis.save();
    },
    addPrestataire : function (idDevis, idPrestataire) {
        getById(idDevis).exec(function (err,result) {
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
        return Devis.find({}).sort('dateCreation',-1);
    }
};