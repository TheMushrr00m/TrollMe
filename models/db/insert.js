var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var urlDB = 'mongodb://localhost:27017/Game_Makers'; //Si la BD 'test' no existe, MongoDB la crea.

var insertDocument = function(db, callback) {
   db.collection('users').insertOne( {
      "user" : "TheMushrr00m",
      "password" : "testlala",
   }, function(err, result) {
    assert.equal(err, null);
    console.log("Documento insertado en la colección 'restaurantes'");
    callback(result);
  });
};

MongoClient.connect(urlDB, function(err, db) {
  assert.equal(null, err);
  insertDocument(db, function() {
      db.close();
  });
});