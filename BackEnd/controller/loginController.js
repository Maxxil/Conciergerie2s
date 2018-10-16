var router = require('express').Router();
var bodyParser = require('body-parser');

var loginBusiness = require('./../business/loginBusiness');
var jwt = require('./../helper/tokenHelper');

router.use(bodyParser.json());

router.get("/" , function (req, res) {

    res.end("coucou");
});

router.post("/", function (req, res) {
    var promise = loginBusiness.existUser(req.body.username, req.body.password);
    promise.exec(function(err,result){
        console.log(result);
        if(result == null){
            console.log("false");
            res.json({});
        }
        else{
            var token = jwt.generateToken(result);
            console.log(token);
            res.json({
                token: token
            });
        }
        res.end();
    })
});

module.exports = router;