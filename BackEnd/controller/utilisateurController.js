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

//var filename = '';
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        if(file != null){
            cb(null, './data/images/utilisateur');
        }
    },
    filename : function(req, file,cb){
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

router.get('/:id/:token', function (req, res) {

   // console.log('UtilistaeurController : GET Utilisateir '+req.params.id)
    var promise = utilisateurBusiness.getById(req.params.id);
    promise.exec(function(err,utilisateur){
        res.json({
            success: true,
            data : utilisateur
        });
        res.end();
    })
});

router.get('/prestataire/:token' , function (req, res) {
   // console.log('UtilistaeurController : GET AllPrestataire ');
    var promise = utilisateurBusiness.getAllPrestataire();
    promise.exec(function (err,result) {        
        res.json({
            success : true,
            data : result
        });
        res.end();
    });
});

router.put('/' , upload.single('image'),function(req, res){
    console.log("PUT UTILISATEUR");
    var filename = "";
    if(req.file != null){
        filename = req.file.filename;
    }
    var hash = bcrypt.hashSync(req.body.utilisateur.motDePasse,saltRounds);
    var utilisateur = new Utilisateur({
        nom: req.body.utilisateur.nom,
        prenom: req.body.utilisateur.prenom,
        nomUtilisateur : req.body.utilisateur.nomUtilisateur.toLowerCase(),
        motDePasse: hash,
        image: filename,
        role: req.body.utilisateur.role,
        status: req.body.utilisateur.status,
        addresse: req.body.utilisateur.addresse,
        telephoneMobile: req.body.utilisateur.telephoneMobile,
        telephoneFix: req.body.utilisateur.telephoneFix,
        email : req.body.utilisateur.email,
        siret: req.body.utilisateur.siret,
        entreprise: req.body.entreprise,
        codepostal: req.body.utilisateur.codepostal,
        ville: req.body.utilisateur.ville,
        historique : []
    });
    utilisateurBusiness.existByUsernameOrEmail(utilisateur).exec(function(err,existant){
        if(existant.length > 0){
            console.log("UTILISATEUR EXISTANT")
            res.json({
                success : false
            });
            res.end();
        }
        else{
            utilisateurBusiness.create(utilisateur);
            notificationBusiness.newUtilisateur(utilisateur);
            res.json({
                success : true
            });
            res.end();
        }
    })
});

router.post('/image' , upload.single('image') , function (req , res) {
    console.log("UPDATE UTILISATEUR AVEC IMAGE");
    var id = req.body.utilisateur._id;
    var filename = "";
    if(req.file != null){
        filename = req.file.filename;
    }
    utilisateurBusiness.getById(id).exec(function (err,result) {
        fs.remove('./../data/images/utilisateur/' + result.image);
        console.log(req.body.utilisateur);
        result = req.body.utilisateur;

        console.log('Hash post utilisateur image');
        result.image = filename;
        result.save();
        res.json({
            success : true
        });
        res.end();
    });
});

router.post('/', function (req , res) {
    console.log('Hash post utilisateur');
    var utilisateur =req.body.utilisateur;
    utilisateurBusiness.update(utilisateur).then(function(result) {
        res.json({
            success : result.ok
        });
        res.end();
    });
});


router.post('/playerid', function (req , res) {
    console.log('UPDATE PlayerId');
    var utilisateur =req.body.utilisateur;
    console.log(utilisateur);
    utilisateurBusiness.update(utilisateur).then(function(result) {
        res.json({
            success : result.ok
        });
        res.end();
    });
});

module.exports = router;