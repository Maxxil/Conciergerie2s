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
    var service = new Service({
        name : req.params.name,
        description : req.params.description
    });
    serviceBusiness.update(service).then(function(result){
        res.json({
            data : result.ok
        });
        res.end();
    })
});

router.post('/image' , upload.single('file') , function(req, res){
    serviceBusiness.getById(req.params._id).exec(function(err, result){
        if(err)
        {
            res.json({
                success : false,
                error : errorEnum.error.SERVICE_INSERT_ERROR
            });
            res.end();
        }
        else{
            serviceBusiness.deleteImage(result.image);
            var service = new Service({
                nom : req.params.name,
                description : req.params.description,
                image : filename,
                prestations : []
            });
            serviceBusiness.add(service);
            res.json({
                success : true,
                error : errorEnum.error.AUCUNE_ERREUR
            })
            res.end();
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

router.delete('/', function(req, res){
    serviceBusiness.getById(req.params._id).exec(function(err, result){
        serviceBusiness.deleteImage(result.image);
        serviceBusiness.delete(_id);
    });
});

module.exports = router;