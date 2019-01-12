var router = require('express').Router();
var bodyParser = require('body-parser');

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
            console.log('jwt after decode: ',user);
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
    var promise = loginBusiness.existUser(req.body.nomUtilisateur.toLowerCase(), req.body.motDePasse);
    promise.exec(function(err,result){
        console.log('LOGIN jwt : ',result);
        if(result.length == 0){
           console.log('Utilisateur inconnu');
            res.json({
                success : false,
                error : Enums.Error.UTILISATEUR_NON_CONNU,
            });
        }
        else{ 
            
           
            var token = jwt.generateToken(result[0]);
           
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