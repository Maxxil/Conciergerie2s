var router = require("express").Router();

router.use("/login", require('./loginController'));
router.use("/signin" , require('./singinController'));
router.use('/service' , require('./serviceController'));

module.exports = router;