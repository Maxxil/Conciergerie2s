var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var prestation = new mongoose.Schema({
    image : 'String',
    nom : 'String',
    description: 'String',
    prestataire : [{type: Schema.Types.ObjectId, ref:'Prestataire'}],
});

module.exports = mongoose.model("Prestation" , prestation);