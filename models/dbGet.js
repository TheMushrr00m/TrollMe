var mongoose = require('mongoose');
var Users = require('./Users.js'),
	User = mongoose.model('Users', Users);

// Gets all Documents into Database
/*var query = User.find({});
query.exec(function (err, docs) {
	if (err) {}
	console.log(docs + "\n");
});*/
var query = User.find({NombreUsuario: 'TheMushrr00m', Contraseña:'test'}, function (err, docs) {
	if (err) {}
	console.log('Logueado!!');
	console.log(docs);
});