var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var db = require('../config/db');

var notification = new mongoose.Schema({
    utilisateur: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    status : 'Number',
    message: String,
    icon: String,
    type: 'Number',
    refId: String,
    date : "Date",
    readBy : [{type : Schema.Types.ObjectId, ref : 'Utilisateur', default : []}],
    archiveBy : [{type : Schema.Types.ObjectId, ref : 'Utilisateur', default : []}],
});

module.exports = db.model("Notification" , notification);