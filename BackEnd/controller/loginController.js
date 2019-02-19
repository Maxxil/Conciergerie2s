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
                    _id: user._id,
                    role: user.role
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
    console.log("LOGIN");
    var promise = loginBusiness.existUser(req.body.nomUtilisateur, req.body.motDePasse);
    promise.exec(function(err,result){
        if(result.length == 0){
           console.log('Utilisateur inconnu');
            res.json({
                success : false,
                error : Enums.Error.UTILISATEUR_NON_CONNU
            });
        }
        else{
            console.log(req.body.motDePasse);
            console.log(result[0].motDePasse);
            var exist = bcrypt.compareSync(req.body.motDePasse, result[0].motDePasse);
            if(exist){
                console.log(exist);
                var token = jwt.generateToken(result[0]);
                res.json({
                    success : true,
                    error : errorEnum.error.AUCUNE_ERREUR,
                    data: token,
                    user : result
                });
            }
            else{
                console.log(exist);
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