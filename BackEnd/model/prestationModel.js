var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = require('./../config/db');

var prestation = new mongoose.Schema({
    image : 'String',
    nom : 'String',
    description: 'String',
    prestataire : [{type: Schema.Types.ObjectId, ref:'Prestataire'}],
    details: ['String'],
    prix: 'Number',
    forfait: 'Number',
    typeprix: 'Number',// specialisee ou forfait ou sur devis
    typePrestationSpecialisee: 'Number'
});

module.exports = db.model("Prestation" , prestation);