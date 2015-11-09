var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectId;
var urlDB = 'mongodb://localhost:27017/Game_Makers'; //Si la BD 'test' no existe, MongoDB la crea.

var insertDocument = function(db, callback) {
   db.collection('users').insertOne( {
      "address" : {
         "street" : "2 Avenue",
         "zipcode" : "10075",
         "building" : "1480",
         "coord" : [ -73.9557413, 40.7720266 ]
      },
      "borough" : "Manhattan",
      "cuisine" : "Italian",
      "grades" : [
         {
            "date" : new Date("2014-10-01T00:00:00Z"),
            "grade" : "A",
            "score" : 11
         },
         {
            "date" : new Date("2014-01-16T00:00:00Z"),
            "grade" : "B",
            "score" : 17
         }
      ],
      "name" : "Vella",
      "restaurant_id" : "41704620"
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