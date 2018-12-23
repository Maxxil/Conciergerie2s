var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var prestationBusiness = require('./../business/prestationBusiness');
var Prestation = require('./../model/prestationModel');
var errorEnum = require('./../helper/errorEnum');
var Enums = require('./../helper/enums');

router.use(bodyParser.json());

//var filename = '';
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        if(file != null){
            cb(null, './data/images/prestation');
        }
    },
    filename : function(req, file,cb){
        if(file != null){
            var datetimestamp = Date.now();
            //filename = ;
            cb(null,file.fieldname + '-' + datetimestamp + '.jpg');
        }
    }
});

var upload = multer({
    storage : storage
});


router.get('/:token' , function(req , res){
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

router.get('/:id/:token' , function(req , res){
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
    var prestation = JSON.parse(req.body.prestation);
    prestationBusiness.update(prestation).then(function(result){
        res.json({
            success : result.ok
        });
        res.end();
    })
});

router.post('/image', upload.single('file'), function (req, res) {
    var prestation = JSON.parse(req.body.prestation);
    var filename = "";
    if(req.file != null){
        filename = req.file.filename;
    }
    prestationBusiness.getById(prestation._id).exec(function(err,result){
        if(result != null){
            result.image = filename;
            result.nom = prestation.nom;
            result.description= prestation.description;
            result.prix= prestation.prix;
            result.typeprix= prestation.typeprix;
            result.forfait= prestation.forfait;
            result.details= prestation.details;
            prestationBusiness.update(result).then(function (success) {
                res.json({
                    success : success.ok
                });
                res.end();
            }).catch(function (error) {
                res.json({
                    success: false
                });
                res.end();
            })
        }
    });
});

router.post('/byIdUtilisateur' , function (req, res) {
    var idUtilisateur = req.body.idUtilisateur;
    prestationBusiness.getByIdUtilisateurInPrestataire(idUtilisateur).exec(function (err,result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    })
});

router.put('/' , upload.single('file'), function(req, res){
    try{
        var filename = "";
        if(req.file != null){
            filename = req.file.filename;
        }
        var promise = prestationBusiness.getByNom(req.body.nom);
        promise.exec(function (err,result) {
            if(result == null || result.length == 0){
                var prestation = new Prestation({
                    image : filename,
                    nom : req.body.nom,
                    description: req.body.description,
                    prix: req.body.prix,
                    typeprix: req.body.typeprix,
                    forfait: req.body.forfait,
                    prestataire : [],
                    details: req.body.details
                });
                prestationBusiness.add(prestation);
                res.json({
                    success : true
                });
            }
            else{
                res.json({
                    success : false,
                    error : Enums.Error.PRESTATION_DEJA_EXISTANTE
                });
            }
            res.end();
        })
    }
    catch(ex){
        res.json({
            success: false,
            error: errorEnum.error.PRESTATION_INSERT_ERROR
        });
        res.end();
    }
});

router.delete('/:idPrestation/:idPrestataire/:token' , function (req, res) {
    prestationBusiness.deletePrestataire(req.params.idPrestation, req.params.idPrestataire);
    res.json({
        success : true
    });
    res.end();
});

router.delete('/:id/:token' , function (req, res) {
    var id = req.params.id;
    prestationBusiness.getById(id).exec(function (err,result) {
        if(result != null){
            prestationBusiness.deleteImage(result.image);
            prestationBusiness.delete(id);
            res.json({
                success : true
            });
            res.end();
        }
        else{
            res.json({
                success : false
            });
        }

        res.end();
    })
    
});


module.exports = router;