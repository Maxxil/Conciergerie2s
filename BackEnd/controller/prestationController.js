var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var prestationBusiness = require('./../business/prestationBusiness');
var Prestation = require('./../model/prestationModel');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

var filename = '';
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './data/images/prestation');
    },
    filename : function(req, file,cb){
        var datetimestamp = Date.now();
        filename = file.fieldname + '-' + datetimestamp + '.jpg';
        cb(null,filename);
    }
});

var upload = multer({
    storage : storage
});


router.get('/' , function(req , res){
    var promise = prestationBusiness.getAll();
    promise.exec(function(err, result){
        if(result != null && result.length > 0){
            res.json({
                data : result
            })
            res.end();
        }
    })
});

router.get('/:id' , function(req , res){
    var promise = prestationBusiness.getById(req.params.id);
    promise.exec(function(err, result){
        if(result != null && result.length > 0){
            res.json({
                data : result
            });
            res.end();
        }
    })
});

router.post('/' , function(req, res){
    var prestation = new Prestation({
        image : filename,
        nom : req.body.nom,
        description: req.body.description,
        prix: req.body.prix,
        typeprix: req.body.typeprix,
        prestataire : []
    });
    prestationBusiness.update(prestation).exec(function(err, result){
        res.json({
            data : result
        });
        res.end();
    })
});

router.put('/' , upload.single('file'), function(req, res){
    try{
        var prestation = new Prestation({
            image : filename,
            nom : req.body.nom,
            description: req.body.description,
            prix: req.body.prix,
            typeprix: req.body.typeprix,
            prestataire : [],
            details: req.body.details
        });
        prestationBusiness.add(prestation);
        res.json({
            success : true
        });
    }
    catch(ex){
        res.json({
            success: false,
            error: errorEnum.error.PRESTATION_INSERT_ERROR
        });
    }
    
    res.end();
});


module.exports = router;