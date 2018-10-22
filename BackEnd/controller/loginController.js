var router = require('express').Router();
var bodyParser = require('body-parser');

var loginBusiness = require('./../business/loginBusiness');
var jwt = require('./../helper/tokenHelper');
var errorEnum = require('./../helper/errorEnum');

router.use(bodyParser.json());

router.get("/:token" , function (req, res) {
    var tokenVerify = jwt.verifyToken(req.params.token);
    res.json({
        success : true,
        error : errorEnum.error.AUCUNE_ERREUR,
        data: req.params.token,
        user : jwt.decode(req.params.token)
    });
    res.end();
});

router.post("/", function (req, res) {
    var promise = loginBusiness.existUser(req.body.username, req.body.password);
    promise.exec(function(err,result){
        console.log(result);
        if(result == null || result == []){
            console.log("false");
            res.json({
                success : false,
                error : errorEnum.error.AUCUNE_ERREUR,
                data: token,
                user : result
            });
        }
        else{
            var token = jwt.generateToken(result);
            console.log(token);
            res.json({
                success : true,
                error : errorEnum.error.AUCUNE_ERREUR,
                data: token,
                user : result
            });
        }
        res.end();
    })
});

module.exports = router;