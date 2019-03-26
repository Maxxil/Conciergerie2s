var bcrypt = require('bcrypt');
var db = require('./config/db');

var utilisateur = require('./model/utilisateureModel');
var utilisateurBusiness = require('./business/utilisateurBusiness');

utilisateur.find({}).exec(function (err,result) {
    result.forEach(function(user){
        console.log(user.motDePasse);
        if(user.motDePasse != null){
            var hash = bcrypt.hashSync(user.motDePasse,10);
            user.motDePasse = hash;
            utilisateurBusiness.update(user).exec();
        }
    });
    process.exit(1);
});