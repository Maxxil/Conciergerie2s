var Prestataire = require('./../model/prestataireModel');

module.exports = {
    add : function(prestataire){
        prestataire.save();
    },
    update : function(prestataire){
        Prestataire.findById(prestataire._id).exec(function(err , result){
            if(result != null && result.length > 0){
                prestataire.save();
            }
        });
    },
    getAll : function(){
        return Prestataire.find({}).populate({path : 'utilisateur', select: 'nom prenom'});
    },
    getById: function(id){
        return Prestataire.findById(id);
    }
};