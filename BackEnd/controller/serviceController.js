var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require("multer");

var loginBusiness = require('./../business/loginBusiness');
var jwt = require('./../helper/tokenHelper');
var serviceBusiness = require('./../business/serviceBusiness');
var Service = require('./../model/serviceModel');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

//var filename = '';
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        if(file != null){
            cb(null, './data/images/service');
        }
    },
    filename : function(req, file,cb){
        //filename = "";
        if(file != null){
            var datetimestamp = Date.now();
            //filename = file.fieldname + '-' + datetimestamp + '.jpg';
            cb(null,file.fieldname + '-' + datetimestamp + '.jpg');
        }
    }
});

var upload = multer({
    storage : storage
});

router.get('/:token', function(req, res){
    serviceBusiness.getAll().exec(function(err, result){
        res.json({
            data : result
        });
        res.end();
    })

});

router.get('/:id/:token', function(req, res){
    serviceBusiness.getById(res.params.id).exec(function(err, result){
        res.json({
            data : result
        });
        res.end();
    })
});

router.post('/' , function(req, res){
    serviceBusiness.update(req.body.service).then(function(result){
        res.json({
            success : true
        });
        res.end();
    })
});

router.post('/image' , upload.single('file') , function(req, res){
    var service = JSON.parse(req.body.service);
    var filename = "";
    if(req.file != null){
        filename = req.file.filename;
    }
    serviceBusiness.getById(service._id).exec(function(err, result){
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
    console.log("Filename : " + filename);
    console.log("Ajout service");
    var filename = "";
    if(req.file != null){
        filename = req.file.filename;
    }
    console.log(filename);

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

router.delete('/:_id/:token', function(req, res){
    console.log("Suppression service");
    serviceBusiness.getById(req.params._id).exec(function(err, result){
        serviceBusiness.deleteImage(result.image);
        serviceBusiness.delete(req.params._id);
        res.json({
            success: true
        });
        res.end();
    });
});

module.exports = router;