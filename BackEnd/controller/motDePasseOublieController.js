var router = require('express').Router();
var bodyParser = require('body-parser');
var cache = require('memory-cache');

var utilisateurBusiness = require('./../business/utilisateurBusiness');
var emailBusiness = require('./../business/emailBusiness');

router.use(bodyParser.json());

router.post('/', function (req,res) {
    console.log("Email oublié");
    var email = req.body.email;
    console.log(email);
    utilisateurBusiness.existByEmail(email).exec(function (err,result) {
        if(result.length>0){
            var valeurEnvoye = Math.round(Math.random() * (9999-0) + 0);
            cache.put(email,valeurEnvoye,60*5*1000);
            emailBusiness.envoyerEmail(email,"Mot de passe oublié", "Voici le code pour renouveler votre mot de passe: "
                + valeurEnvoye+ ". Vous avez 5min pour l'utiliser. Dépassé ce délais, le code ne sera plus utilisable");
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
});

module.exports = router;