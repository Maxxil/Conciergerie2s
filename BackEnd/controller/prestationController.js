var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var prestationBusiness = require('./../business/prestationBusiness');
var Prestation = require('./../model/prestationModel');

var filename = '';
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './data/images/prestation');
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

router.use(bodyParser.json());

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

router.put('/' , upload.single('image'), function(req, res){
    console.log(filename);
    var prestation = new Prestation({
        image : filename,
        nom : req.body.nom,
        description: req.body.description,
        prestataire : []
    });
    prestationBusiness.add(prestation);
    res.json({
        success : true
    });
    res.end();
});

module.exports = router;