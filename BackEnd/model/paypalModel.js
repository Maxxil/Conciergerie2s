var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = require('./../config/db');

var paypal = new mongoose.Schema({
    clientId : 'String',
    secret : 'String'
});

module.exports = db.model("Paypal" , paypal);