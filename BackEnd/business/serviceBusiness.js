var fs = require('fs');

var Service = require('./../model/serviceModel');

module.exports = {
    add: function(service){
        this.getByName(service.nom).exec(function(err, result){
            if(result != null && result.length == 0){
                service.save();
            }
        });
    },
    update: function(service){
        this.getById(service._id).exec(function(err, result){
            if(result != null && result.length > 0){
                service.update();
            }
        })
    },
    getAll: function(){
        return Service.find({});
    },
    getById: function(id){
        return Service.findById(id);
    },
    getByIdWithPrestations: function(id){
        return this.getById(id).populate('prestations');
    },
    getByName: function(name){
        return Service.find({name: name});
    },
    getAllWithPrestation : function(){
        return Service.find({}).where('prestations').ne([]).populate('prestations');
    },
    deleteImage: function(filename){
        const filepath = "./data/images/service" + filename;
        fs.unlink(filepath).exec();
    },
    delete: function(id){
        Service.deleteOne({_id : id}).exec();
    },
    addPrestation: function(idService, idPrestation){
        var promise = getById(idService);
        promise.exec(function (err, result) {
            if(result != null && result != []){
                if(result.prestations == null){
                    result.prestations = [idPrestation];
                }else{
                    result.prestations.push(idPrestation)
                }
                result.save();
            }

        })
    }
};