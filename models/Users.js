var db = require('./db/db.js');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
    Nombre: String,
    Apellido: [{ 
        Paterno: String,
        Materno: String
        }],
    NombreUsuario: String,
    CreacionCuenta: { 
        type: Date,
        default: Date.now
    },
    Email: String,
    Contraseña: String,
    Edad: Number,
    País: String,
});

module.exports = User;