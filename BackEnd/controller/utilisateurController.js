var router = require('express').Router();
var bodyParser = require('body-parser');
var multer = require('multer');

var utilisateurBusiness = require('./../business/utilisateurBusiness');
var Utilisateur = require('./../model/utilisateureModel');

var filename = '';
var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, './data/images/utilisateur');
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

router.use(bodyParser.json());

router.put('/' , upload.single('image'),function(req, res){
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
        historique : []
    });
    utilisateurBusiness.create(utilisateur);
    res.end();
});

module.exports = router;