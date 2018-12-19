var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = require('./../config/db');

var devisProposition = new mongoose.Schema({
    prestataire : {type : Schema.Types.ObjectId, ref : 'Prestataire'},
    devis : {type : Schema.Types.ObjectId, ref : 'Devis'},
    prix : 'Number',
    dateProposee : 'Date',
    date : 'Date'
});


module.exports = db.model("DevisProposition" , devisProposition);