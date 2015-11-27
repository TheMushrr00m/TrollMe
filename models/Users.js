var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

exports.Users = new Schema({
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