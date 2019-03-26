/**
 * Created by Massil on 12/01/2017.
 */
var mongoose = require("mongoose");
//mongoose.set('useCreateIndex', true);
var autoIncrement = require('mongoose-auto-increment');
var dbconf = module.require("./dbconf");

var connectionString =
    dbconf.protocol
    + '://'+ dbconf.user+':'+dbconf.password+'@'+dbconf.server
    + ':' + dbconf.port
    + '/' + dbconf.dbname+'?authSource=admin';

var dbPromise = mongoose.createConnection(connectionString, { useNewUrlParser: true, useCreateIndex: true });

autoIncrement.initialize(dbPromise);

module.exports = dbPromise;