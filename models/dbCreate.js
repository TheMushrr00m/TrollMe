var mongoose = require('mongoose');
var Users = require('./Users.js'),
	User = mongoose.model('Users', Users);

var user = new User({
	Nombre: 'John',
	Apellido: [{
		Paterno: 'Doe',
		Materno: ''
	}],
	NombreUsuario: 'Queen',
	Email: 'test@outlook.es',
	Contraseña: 'test',
	Edad: 40,
	País: 'México'
})
user.save(function (err) {
    if (err) {}
    console.log('Saved!!');
});

/*var user = new User({
	Nombre: 'Gabriel',
	Apellido: [{
		Paterno: 'Cueto',
		Materno: 'Báez'
	}],
	NombreUsuario: 'TheMushrr00m',
	Email: 'funji_2302@outlook.es',
	Contraseña: 'test',
	Edad: 20,
	País: 'México'
})
user.save(function (err) {
    if (err) {}
    console.log('Saved!!');
});*/

/*var user = new User({
	Nombre: 'Reyna',
	Apellido: [{
		Paterno: 'Reyes',
		Materno: 'Chablé'
	}],
	NombreUsuario: 'Queen',
	Email: 'test@outlook.es',
	Contraseña: 'test',
	Edad: 23,
	País: 'México'
})
user.save(function (err) {
    if (err) {}
    console.log('Saved!!');
});*/