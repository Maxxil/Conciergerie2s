var router = require('express').Router();
var bodyParser = require('body-parser');
var cache = require('memory-cache');
var bcrypt = require('bcrypt');

var utilisateurBusiness = require('./../business/utilisateurBusiness');

router.use(bodyParser.json());

router.post('/', function (req,res) {
    console.log("Changer mot de passe");
    var email = req.body.email;
    var code = req.body.code;
    var motDePasse = req.body.motDePasse;
    console.log(cache.get(email))
    if(code == cache.get(email)){
        console.log("Code correct");
        utilisateurBusiness.existByEmail(email).exec(function (err,result) {
            console.log(result);
            if(result.length>0){
                var utilisateur = result[0];
                utilisateur.motDePasse = motDePasse;
                utilisateurBusiness.update(result[0]);
                res.json({
                    success :true
                });
                res.end();
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

module.exports = router;