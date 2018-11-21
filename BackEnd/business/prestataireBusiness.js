var Prestataire = require('./../model/prestataireModel');

module.exports = {
    add : function(prestataire){
        prestataire.save();
    },
    update : function(prestataire){
        return Prestataire.updateOne({_id : prestataire._id}, prestataire, {upsert : true});
    },
    getAll : function(){
        return Prestataire.find({}).populate({path : 'utilisateur', select: 'nom prenom'});
    },
    getById: function(id){
        return Prestataire.findById(id);
    },
    getByIdUtilisateur : function (idUtilisateur) {
        return Prestataire.find({utilisateur : idUtilisateur});
    }
};