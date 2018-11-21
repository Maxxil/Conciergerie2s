var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var prestationBusiness = require('./../business/prestationBusiness');
var Prestation = require('./../model/prestationModel');
var errorEnum = require('./../helper/errorEnum');
var Enums = require('./../helper/enums');

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
    var prestation = req.body.prestation;
    prestationBusiness.update(prestation).then(function(result){
        res.json({
            data : result.ok
        });
        res.end();
    })
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

router.delete('/' , function (req, res) {
   prestationBusiness.deletePrestataire(req.body.idPrestation, req.body.idPrestataire);
   res.json({
       success : true
   });
   res.end();
});


module.exports = router;