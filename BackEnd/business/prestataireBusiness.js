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
        return Prestataire.find({});
    },
    getById: function(id){
        return Prestataire.findById(id);
    }
}