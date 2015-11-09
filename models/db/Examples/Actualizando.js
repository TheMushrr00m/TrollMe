var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var urlDB = 'mongodb://localhost:27017/test'; 

// Actualizamos con 'updateOne' el primer documento que coincida con la condición.
//$set establecemos los campos a modificar
//$currentDate actualiza el campo lastModified con la fecha actual
/*
var updateRestaurants = function(db, callback) {
   db.collection('restaurantes').updateOne(
      { "name" : "Vella" },
      {
        $set: { "cuisine": "American (New)" },
        $currentDate: { "lastModified": true } // Crea el campo lastModified
      }, function(err, results) {
      console.log(results);
      callback();
   });
};*/

//Actualiza un campo embebido
/*
var updateRestaurants = function(db, callback) {
   db.collection('restaurantes').updateOne(
      { "restaurant_id" : "41704620" },
      { $set: { "address.street": "East 31st Street" } },
      function(err, results) {
        console.log(results);
        callback();
   });
};*/

//Actualizando multiples documentos
/*
var updateRestaurants = function(db, callback) {
   db.collection('restaurantes').updateMany(
      { "address.zipcode": "10016", cuisine: "Other" },
      {
        $set: { cuisine: "Category To Be Determined" },
        $currentDate: { "lastModified": true }
      }
      ,
      function(err, results) {
        console.log(results);
        callback();
   });
};*/

//Reemplazar un documento por completo
//Excepto el campo '_id', se debe pasar un documento nuevo como segundo parametro
//El documento reemplazado puede contener diferentes campos del documento original.
// En el nuevo documento puedes omitir el campo '_id' ya que se mantiene el viejo, 
//Pero si se incluye, debe tener el mismo valor del anterior documento.
var updateRestaurants = function(db, callback) {
   db.collection('restaurantes').replaceOne(
      { "restaurant_id" : "41704620" },
      {
        "name" : "Vella 2",
        "address" : {
           "coord" : [ -73.9557413, 40.7720266 ],
           "building" : "1480",
           "street" : "2 Avenue",
           "zipcode" : "10075"
        }
      },
      function(err, results) {
        console.log(results);
        callback();
   });
};

MongoClient.connect(urlDB,  function(err, db) {
  assert.equal(null, err);

  updateRestaurants(db, function() {
      db.close();
  });
});