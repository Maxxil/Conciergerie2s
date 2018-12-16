var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var bcrypt = require('bcrypt');

var utilisateurBusiness = require('./../business/utilisateurBusiness');
var notificationBusiness = require('./../business/notificationBusiness');
var Utilisateur = require('./../model/utilisateureModel');
var Enums = require('./../helper/enums');
const saltRounds = 10;

var filename = '';
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        if(file != null){
            cb(null, './data/images/utilisateur');
        }
    },
    filename : function(req, file,cb){
        if(file != null){
            var datetimestamp = Date.now();
            filename = file.fieldname + '-' + datetimestamp + '.jpg';
            cb(null,filename);
        }
    }
});

var upload = multer({
    storage : storage
});

router.use(bodyParser.json());

router.get('/:token', function (req, res) {
    var promise = utilisateurBusiness.getAll();
    promise.exec(function (err, result) {
        res.json({
            success : true,
            error : Enums.Error.AUCUNE_ERREUR,
            data : result
        });
    })
});

router.get('/id=:id/:token', function (req, res) {
    console.log("Utilisateur");
    console.log(req.params.id);
    var promise = utilisateurBusiness.getById(req.params.id);
    promise.exec(function(err,utilisateur){
        console.log(utilisateur);
        res.json({
            success: true,
            data : utilisateur
        });
        res.end();
    })
});

router.get('/prestataire/:token' , function (req, res) {
    console.log("Prestataire");
    var promise = utilisateurBusiness.getAllPrestataire();
    promise.exec(function (err,result) {
        res.json({
            success : true,
            data : result
        });
        res.end();
    });
});
/*
router.put('/:token' , upload.single('image'),function(req, res){


    bcrypt.hash(req.body.motDePasse , saltRounds, function (err,hash) {

        if (err) {
            console.log(err);
            res.json({
                success: false
            });
            res.end();
        }
        else {

            var utilisateur = new Utilisateur({
                nom: req.body.nom,
                prenom: req.body.prenom,
                nomUtilisateur: req.body.nomUtilisateur,
                motDePasse: hash,
                image: filename,
                role: req.body.role,
                status: req.body.status,
                addresse: req.body.addresse,
                telephoneMobile: req.body.telephoneMobile,
                telephoneFix: req.body.telephoneFix,
                email: req.body.email,
                siret: req.body.siret,
                entreprise: req.body.entreprise,
                codepostal: req.body.codepostal,
                ville: req.body.ville,
                historique: []
            });
            utilisateurBusiness.create(utilisateur);
            res.json({
                success: true
            });
            res.end();
        }

    });
    */
router.put('/:token' , upload.single('image'),function(req, res){
    var utilisateur = new Utilisateur({
        nom: req.body.nom,
        prenom: req.body.prenom,
        nomUtilisateur : req.body.nomUtilisateur,
        motDePasse: req.body.motDePasse,
        image: filename,
        role: req.body.role,
        status: req.body.status,
        addresse: req.body.addresse,
        telephoneMobile: req.body.telephoneMobile,
        telephoneFix: req.body.telephoneFix,
        email : req.body.email,
        siret: req.body.siret,
        entreprise: req.body.entreprise,
        codepostal: req.body.codepostal,
        ville: req.body.ville,
        historique : []
    });
    utilisateurBusiness.create(utilisateur);
    notificationBusiness.newUtilisateur(utilisateur);
    res.json({
        success : true
    });
    res.end();

});

router.post('/image/:token' , upload.single('image') , function (req , res) {
    console.log("Enregistrement");
    var id = req.body.utilisateur._id;
    utilisateurBusiness.getById(id).exec(function (err,result) {
        console.log(result);
        fs.remove('./../data/images/utilisateur/' + result.image);
        result = req.body.utilisateur;
        result.image = filename;
        result.save();
        res.json({
            success : true
        });
        res.end();
    });
});

router.post('/:token', function (req , res) {
    console.log("Enregistrement");
    utilisateurBusiness.update(req.body.utilisateur).then(function(result) {
        console.log(result);
        res.json({
            success : result.ok
        });
        res.end();
    });
});

module.exports = router;