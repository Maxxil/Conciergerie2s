var Prestation = require('./../model/prestationModel');

module.exports = {
    add : function(prestation){
        prestation.save();
    },
    getAll : function(){
        return Prestation.find({});
    },
    getById : function(id){
        return Prestation.find({_id : id});
    },
    update : function(prestation){
        this.getById(prestation._id).exec(function(err , result){
            if(result != null && result.length > 0){
                prestation.update();
            }
        });
    }
}