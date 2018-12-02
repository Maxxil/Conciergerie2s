var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");

var loginBusiness = require('./../business/loginBusiness');
var jwt = require('./../helper/tokenHelper');
var serviceBusiness = require('./../business/serviceBusiness');
var Service = require('./../model/serviceModel');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

var filename = '';
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './data/images/service');
    },
    filename : function(req, file,cb){
        console.log(file);
        var datetimestamp = Date.now();
        filename = file.fieldname + '-' + datetimestamp + '.jpg';
        cb(null,filename);
    }
});

var upload = multer({
    storage : storage
});

router.get('/', function(req, res){
    serviceBusiness.getAll().exec(function(err, result){
        res.json({
            data : result
        });
        res.end();
    })
});

router.get('/:id', function(req, res){
    serviceBusiness.getById(res.params.id).exec(function(err, result){
        res.json({
            data : result
        });
        res.end();
    })
});

router.post('/' , function(req, res){
    console.log("Mise a jour sans image");
    serviceBusiness.update(req.body.service).then(function(result){
        console.log(result);
        res.json({
            success : true
        });
        res.end();
    })
});

router.post('/image' , upload.single('file') , function(req, res){
    console.log("Mise a jour avec image");
    var service = JSON.parse(req.body.service);
    serviceBusiness.getById(service._id).exec(function(err, result){
        console.log(result);
        if(err)
        {
            res.json({
                success : false,
                error : errorEnum.error.SERVICE_INSERT_ERROR
            });
            res.end();
        }
        else{
            console.log(result.image);
            serviceBusiness.deleteImage(result.image);
            console.log(filename);
            result.nom = service.nom;
            result.description = service.description;
            result.image = filename;
            serviceBusiness.update(result).then(function() {
                    res.json({
                        success: true,
                        error: errorEnum.error.AUCUNE_ERREUR
                    })
                    res.end();
                }
            ).catch(function () {
                res.json({
                    success: false,
                    error: errorEnum.error.SERVICE_INSERT_ERROR
                });
                res.end();
            })


        }
    });
});

router.put('/' , upload.single('file'), function(req, res){
    var service = new Service({
        nom : req.body.nom,
        description : req.body.description,
        image : filename
    });

    serviceBusiness.add(service);
    res.json({
        success : true,
        error : errorEnum.error.AUCUNE_ERREUR
    });
    res.end();
});

router.delete('/:_id', function(req, res){
    console.log("Suppression service");
    serviceBusiness.getById(req.params._id).exec(function(err, result){
        console.log(result);
        serviceBusiness.deleteImage(result.image);
        serviceBusiness.delete(req.params._id);
        res.json({
            success: true
        });
        res.end();
    });
});

module.exports = router;