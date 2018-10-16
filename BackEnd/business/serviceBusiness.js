var fs = require('fs');

var Service = require('./../model/serviceModel');

module.exports = {
    add(service){
        this.getByName(service.nom).exec(function(err, result){
            if(result != null && result.length == 0){
                service.save();
            }
        });
    },
    update(service){
        this.getById(service._id).exec(function(err, result){
            if(result != null && result.length > 0){
                service.update();
            }
        })
    },
    getAll(){
        return Service.find({});
    },
    getById(id){
        return Service.findById(id);
    },
    getByName(name){
        return Service.find({name: name});
    },
    deleteImage(filename){
        const filepath = "./data/images/service" + filename;
        fs.unlink(filepath).exec();
    },
    delete(id){
        Service.deleteOne({_id : id}).exec();
    }
}