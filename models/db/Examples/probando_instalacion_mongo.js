/*Mongo y Node
> npm install mongodb*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var urlDB = 'mongodb://localhost:27017/test';
MongoClient.connect(urlDB, function(err, db){
    assert.equal(null, err);
    console.log("Conectado al servidor correctamente.");
    db.close();
});

