var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();

var envConfig = require("./config/environnementconf");

var port = envConfig.getListeningPort();
var domain = {

};

var corsOptions = {
    origin: domains,
    allowedHeaders : 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true
};

app.use(cors(corsOptions));
app.use('/project/image' , express.static(__dirname + '/data/images/projects'));
app.use('/article/image' , express.static(__dirname + '/data/images/articles'));

app.use('/' , require('./controller'));

app.listen(port, function() {
    console.log("API is running on port: " + port);
});
