var express = require("express");
var cors = require("cors");
var app = express();

var envConfig = require("./config/environnement");
var utilisateurBusiness = require('./business/utilisateurBusiness');
var notificationBusiness = require('./business/notificationBusiness');
var roleEnum = require("./helper/roleEnum");
var db = require('./config/db');


var port = envConfig.getListeningPort();
var domains = [
    'http://localhost:8100'
];

var corsOptions = {
    origin: '*',
    allowedHeaders : 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true
};

app.use(cors());
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,text/plain, */*');
    next();
});
app.use('/service/image' , express.static(__dirname + '/data/images/service'));
app.use('/prestation/image' , express.static(__dirname + '/data/images/prestation'));

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

       // notificationBusiness.sendPush();


    });
    
});
