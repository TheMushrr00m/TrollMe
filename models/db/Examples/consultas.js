var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var urlDB = 'mongodb://localhost:27017/test'; 

// Consulta todos los documentos en la colección 'restaurantes'
/*var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurantes').find( );
   cursor.each(function(err, doc) {
      assert.equal(null, err);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

// Consulta por un campo especifico.
/*
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurantes').find( { "borough": "Manhattan" } );
   cursor.each(function(err, doc) {
      assert.equal(null, err);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

// Consulta por un campo embebido en un documento
/*.
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurantes').find( { "address.zipcode": "10075" } );
   cursor.each(function(err, doc) {
      assert.equal(null, err);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

// Consulta por un campo en un 'Arreglo'
/*
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurantes').find( { "grades.grade": "B" } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

//Operador Mayor que (>) en Mongo es ($gt)
/*
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurantes').find( { "grades.score": { $gt: 30 } } );
   cursor.each(function(err, doc) {
      assert.equal(null, err);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

//Operador Menor que (<) en Mongo es ($lt)
/*
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurantes').find( { "grades.score": { $lt: 30 } } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

//Operaciones con el operador AND 
// En mongo se utiliza una coma (,) para separar las condiciones
/*
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find(
     { "cuisine": "Italian", "address.zipcode": "10075" }
   );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

//Operaciones con el operador OR, se utiliza el operador ($or)
/*
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find(
       { $or: [ { "cuisine": "Italian" }, { "address.zipcode": "10075" } ] }
   );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};*/

//Ordenando resultados
//El valor 1 establece que será en orden ASC, si quisieramos en DESC sería con -1.
var findRestaurants = function(db, callback) {
   var cursor =db.collection('restaurants').find().sort( { "borough": 1, "address.zipcode": 1 } );
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         console.dir(doc);
      } else {
         callback();
      }
   });
};

MongoClient.connect(urlDB, function(err, db) {
  assert.equal(null, err);
  findRestaurants(db, function() {
      db.close();
  });
});