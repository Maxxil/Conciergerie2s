var router = require("express").Router();
var bodyParser = require('body-parser');

var tokenHelper = require('./../helper/tokenHelper');

router.use(bodyParser.json());

router.use('/', function (req,res,next) {
    //console.log("Middleware avec token");
    var url = req.originalUrl;
    var methode = req.method;
    //console.log(url);
    //console.log(methode);
    if(url != '/login' && methode != 'POST'){
        var split = url.split('/');
        var isAllowed = false;
        split.forEach(function (element) {
            if(tokenHelper.verifyToken(element)){
                isAllowed = true;
            }
        });
        //console.log("Est autorise : " + isAllowed);
        next();

    }
    else{
        next();

    }
});


router.use("/login", require('./loginController'));
router.use("/utilisateur" , require('./utilisateurController'));
router.use("/prestation" , require('./prestationController'));
router.use('/service' , require('./serviceController'));
router.use('/lierServicePrestation' , require('./lierServicePrestationController'));
router.use('/servicePrestation', require('./servicePrestationController'));
router.use('/lierPrestationPrestataire' , require('./lierPrestationPrestataire'));
router.use('/prestataire', require('./prestataireController'));
router.use('/validerPrestataire' , require('./validerPrestatire'));
router.use('/devaliderPrestataire', require('./devaliderPrestataire'));
router.use('/commandeForfait', require('./commandeForfaitController'));
router.use('/commandeHoraire', require('./commandeHoraireController'));
router.use('/devis' , require('./devisController'));
router.use('/commande' , require('./commandeController'));
router.use('/paypal', require('./paypalController'));

module.exports = router;