var mongoose = require('mongoose');
var UsersSchema = mongoose.Schema({
    Apellido:      { type: String, required: true },
    Contraseña:    { type: String, required: true },
    Edad:          { type: Number, required: true },
    Email:         { type: String, required: true },
    Nombre:        { type: String, required: true },
    NombreUsuario: { type: String, required: true },
    País:          { type: String, required: true },
    Foto:          { type: String },
});

exports.Users = mongoose.model('users', UsersSchema);