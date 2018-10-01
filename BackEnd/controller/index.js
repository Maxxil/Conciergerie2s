var router = require("express");

router.use("/login", require('./loginController'));
router.use("/signin" , require('./singinController'));

module.exports = router;