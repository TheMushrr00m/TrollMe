var mongoose = require('mongoose');
var UsersSchema = mongoose.Schema({
    Apellido:      { type: String},
    Contraseña:    { type: String },
    Edad:          { type: String },
    Email:         { type: String },
    Nombre:        { type: String },
    NombreUsuario: { type: String },
    País:          { type: String },
    Foto:          { type: String, default: 'images/profilePictures/anon.png' },
});

exports.Users = mongoose.model('users', UsersSchema);