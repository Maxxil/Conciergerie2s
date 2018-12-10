var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./../config/db');

var service = new mongoose.Schema({
    nom: 'String',
    description : 'String',
    image : 'String',
    prestations : [{type : Schema.Types.ObjectId, ref:'Prestation'}]
});

module.exports = db.model("Service", service);