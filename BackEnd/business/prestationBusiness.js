var Prestation = require('./../model/prestationModel');

module.exports = {
    add : function(prestation){
        prestation.save();
    },
    getAll : function(){
        return Prestation.find({});
    },
    getById : function(id){
        return Prestation.findById(id);
    },
    getByNom : function (nom) {
        return Prestation.find({nom : nom});
    },
    getByIdUtilisateurInPrestataire : function (prestationsResult, idUtilisateur) {
        var prestations = [];
        prestationsResult.forEach(function (prestation) {
            console.log("Prestation");
            console.log(prestation);
            if(prestation.prestataire.length > 0 )
            {
                prestation.prestataire.forEach(function(prestataire){
                    console.log("Prestataire");
                    console.log(prestataire);
                    if(prestataire.utilisateur._id == idUtilisateur){
                        prestations.push(prestation._id);
                    }
                });
            }
        });
        return prestations;
    },
    getWitlPrestataireAndUtilisateur : function () {
        return Prestation.find({}).where("prestataire").ne([])
            .populate({path : "prestataire" , populate : {path : "utilisateur"}})
    },
    getWithPrestataire : function () {
        return Prestation.find({}).populate('prestataire');
    },
    getOnlyWithPrestataires : function(){
        return Prestation.find({}).where("prestataire").ne([])
            .populate({path : "prestataire" , populate : {path : "utilisateur", select : "nom prenom"}})
    },
    getByIdWithPrestataire : function (id) {
        return Prestation.find({_id : id}).populate({
            path : "prestataire" , populate: {path : "utilisateur" , select:"nom prenom"}
        });
    },
    update : function(prestation){
        this.getById(prestation._id).exec(function(err , result){
            if(result != null && result.length > 0){
                prestation.update();
            }
        });
    },

};