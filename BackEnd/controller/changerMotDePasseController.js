var router = require('express').Router();
var bodyParser = require('body-parser');
var cache = require('memory-cache');
var bcrypt = require('bcrypt');

var utilisateurBusiness = require('./../business/utilisateurBusiness');
var jwt = require('./../helper/tokenHelper');

router.use(bodyParser.json());

router.post('/', function (req,res) {
    console.log("Changer mot de passe");
    var email = req.body.email;
    var code = req.body.code;
    var motDePasse = req.body.motDePasse;
    console.log(cache.get(email));
    if(code == cache.get(email)){
        console.log("Code correct");
        utilisateurBusiness.existByEmail(email).exec(function (err,result) {
            console.log("************** Changer mot de passe");
            console.log(result);
            if(result.length>0){
                var utilisateur = result[0];
                utilisateur.motDePasse = bcrypt.hashSync( motDePasse, 10);
                console.log('Hash post mot de passe oublie');
                utilisateurBusiness.update(utilisateur).then(function (resultUpdate) {
                    console.log(resultUpdate);
                    res.json({
                        success :resultUpdate.ok
                    });
                    res.end();
                })

            }
            else{
                res.json({
                    success :false
                });
                res.end();
            }
        })
    }
    else{
        console.log("Code erroné");
        res.json({
            success :false
        });
        res.end();
    }

});

router.post('/profile', function (req,res) {
    var token = req.body.token;
    var tokenVerify = jwt.verifyToken(token);
    if(tokenVerify)
    {
        jwt.decode(token, function (utilisateur) {
            utilisateurBusiness.getById(utilisateur._id).exec(function (err,result) {
                if(bcrypt.compareSync(req.body.ancienMotDePasse, result[0].motDePasse)){
                    result[0].motDePasse = bcrypt.hashSync(req.body.nouveauMotDePasse, 10);
                    utilisateurBusiness.update(result[0]).then(function (resultUpdate) {
                        res.json({
                            success : resultUpdate.ok
                        });
                        res.end();
                    });
                }
                else{
                    res.json({
                        success : false
                    });
                    res.end();
                }

            })
        });
    }
    else{
        res.json({
            success : false
        });
        res.end();

    }
});

module.exports = router;