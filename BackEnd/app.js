var express = require("express");
var cors = require("cors");
var app = express();

var envConfig = require("./config/environnement");
var utilisateurBusiness = require('./business/utilisateurBusiness');
var roleEnum = require("./helper/roleEnum");
var db = require('./config/db');


var port = envConfig.getListeningPort();
var domains = {

};

var corsOptions = {
    origin: domains,
    allowedHeaders : 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true
};

app.use(cors(corsOptions));
app.use('/service/image' , express.static(__dirname + '/data/images/service'));
app.use('/article/image' , express.static(__dirname + '/data/images/articles'));

app.use('/' , require('./controller'));

app.listen(port, function() {
    console.log("API is running on port: " + port);

    utilisateurBusiness.any().exec(function(err, result){
        if(result == null || result.length == 0)
        {
            console.log("Ajour de l'admin");
            var user = {
                nomUtilisateur : "admin",
                motDePasse : "admin",
                role : roleEnum.role.ADMIN
            };
            utilisateurBusiness.create(user);
        }
    });
    
});
