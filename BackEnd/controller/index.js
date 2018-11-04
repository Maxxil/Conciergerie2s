var router = require("express").Router();

router.use("/login", require('./loginController'));
router.use("/utilisateur" , require('./utilisateurController'));
router.use("/prestation" , require('./prestationController'));
router.use('/service' , require('./serviceController'));
router.use('/lierServicePrestation' , require('./lierServicePrestationController'));
router.use('/lierPrestationPrestation' , require('./lierPrestationPrestataire'));
router.use('/prestataire', require('./prestataireController'));

module.exports = router;