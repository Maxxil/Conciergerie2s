var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commandeForfait = new mongoose.Schema({
    client: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    prestation : {type : Schema.Types.ObjectId, ref : 'Prestation'},
    prestataires : [{type : Schema.Types.ObjectId, ref : 'Prestataire'}],
    date : 'Date',
    heureDebut : 'String',
    heureFin : 'String',
    dateCreation : 'Date',
    status : 'number'
});

module.exports = mongoose.model("CommandeForfait" , commandeForfait);