var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var urlDB = 'mongodb://localhost:27017/test'; 


//Remueve todos los documentos que coincidan
/*
var removeRestaurants = function(db, callback) {
   db.collection('restaurantes').deleteMany(
      { "borough": "Manhattan" },
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};*/

//Removiendo solo un documento.
/*
var removeRestaurants = function(db, callback) {
   db.collection('restaurantes').deleteOne(
      { "borough": "Manhattan" },
      function(err, results) {
         console.log(results);
         callback();
      }
   );
};*/

//Y para remover absolutamente todos los documentos.
/*
var removeRestaurants = function(db, callback) {
   db.collection('restaurantes').deleteMany( {}, function(err, results) {
      console.log(results);
      callback();
   });
};*/

// Para dropear la colección
var dropRestaurants = function(db, callback) {
   db.collection('restaurantes').drop( function(err, response) {
      console.log(response)
      callback();
   });
};

MongoClient.connect(urlDB, function(err, db) {
  assert.equal(null, err);

  removeRestaurants(db, function() {
      db.close();
  });
});