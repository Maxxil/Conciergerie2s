var router = require('express').Router();
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var loginBusiness = require('./../business/loginBusiness');
var jwt = require('./../helper/tokenHelper');
var errorEnum = require('./../helper/errorEnum');
var Enums = require('./../helper/enums');
var User = require('./../model/utilisateureModel');

router.use(bodyParser.json());

router.get("/:token" , function (req, res) {
    var tokenVerify = jwt.verifyToken(req.params.token);
    if(tokenVerify)
    {
        jwt.decode(req.params.token, function(user){
            res.json({
                success : true,
                error : Enums.Error.AUCUNE_ERREUR,
                data: req.params.token,
                user : [new User({
                    nomUtilisateur: user.nomUtilisateur,
                    _id: user._id
                })]
            });
            res.end();
        });

    }
    else{

        res.json({
            success : false,
            error : Enums.Error.UTILISATEUR_NON_CONNU
        });
        res.end();
    }

});

router.post("/", function (req, res) {
    var promise = loginBusiness.existUser(req.body.nomUtilisateur, req.body.motDePasse);
    promise.exec(function(err,result){

        if(result.length == 0){
            res.json({
                success : false,
                error : Enums.Error.UTILISATEUR_NON_CONNU,
            });
        }
        else{
            var exist = bcrypt.compareSync(req.body.motDePasse, result[0].motDePasse);
            if(exist){
                var token = jwt.generateToken(result[0]);
                res.json({
                    success : true,
                    error : errorEnum.error.AUCUNE_ERREUR,
                    data: token,
                    user : result
                });
            }
            else{
                res.json({
                    success : false,
                    error : Enums.Error.UTILISATEUR_NON_CONNU,
                });
            }
        }
        res.end();
    })
});

module.exports = router;