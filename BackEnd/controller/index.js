var router = require("express").Router();

router.use("/login", require('./loginController'));
router.use("/utilisateur" , require('./utilisateurController'));
router.use("/prestation" , require('./prestationController'));
router.use('/service' , require('./serviceController'));
router.use('/lierServicePrestation' , require('./lierServicePrestationController'));
router.use('/lierPrestationPrestataire' , require('./lierPrestationPrestataire'));
router.use('/prestataire', require('./prestataireController'));
router.use('/validerPrestataire' , require('./validerPrestatire'));
router.use('/devaliderPrestataire', require('./devaliderPrestataire'));
router.use('/prestataireInformation' , require('./prestataireInformationController'));
router.use('/prestationInformation', require('./prestationInformationController'));

module.exports = router;