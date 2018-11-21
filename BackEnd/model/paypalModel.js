var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var paypal = new mongoose.Schema({
    clientId : 'String',
    secret : 'String'
});

module.exports = mongoose.model("Paypal" , paypal);