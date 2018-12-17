var Prestation = require('./../model/prestationModel');
var fs = require('fs');
var path = require('path');

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
        return Prestation.updateOne({_id : prestation._id} , prestation , {upsert : true});
    },
    delete : function(id){
      Prestation.deleteOne({_id : id}).exec();
    },
    deleteImage: function(filename){
        if(filename != ''){
            const filepath = "./data/images/prestation/" + filename;
            fs.exists(filepath, function (exist) {
                if(exist){
                    console.log("Exist");
                    fs.unlink(filepath);
                }
            });
        }

    },
    deletePrestataire : function (idPrestation , idPrestataire) {
        Prestation.find({_id : idPrestation}).exec(function (err,prestation) {
            const index = prestation.prestataire.indexOf(idPrestataire);
            prestation.prestataire.slice(index,1);
            prestation.save();
        })
    }
};