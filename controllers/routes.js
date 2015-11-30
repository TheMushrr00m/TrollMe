var mongoose = require('mongoose'),
	mongodb_connection_string = 'mongodb://localhost:27017/Trollme',
	usersModel = require('../models/Users'),
	Users = usersModel.Users;
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + 'Trollme';
}
// Enable the DB connections
mongoose.connect(mongodb_connection_string, function(err, resp){
	if(err) {
		console.log(err);
	}
	else {
		console.log('DB Connected!');
	}
});
/*Maneja el código de la ruta '/'*/
exports.index = function(request, response) {
	response.render('index', { 
		title: 'Bienvenido a TrollMe',
		navFixed: true
	});
};
/*Maneja el código de la ruta '/registro' mediante POST */
exports.registroPOST = function(request, response) {
	console.log(request.body);
	var user = new Users({
		Apellido: request.body.lastname,
		Contraseña: request.body.pass,
		Edad: request.body.age,
		Email: request.body.email,
		Nombre: request.body.name,
		NombreUsuario: request.body.username,
		Pais: request.body.country
	});
	user.save(function(err) {
		if(err) {}
		console.log('saved');
		response.redirect('/');
	});
};
/*Maneja el código de la ruta '/login' POST */
exports.login = function(request, response) {
	console.log(request.body);
	Users.findOne({
		NombreUsuario: request.body.name,
		Contraseña: request.body.pass
	}, function(error, doc) {
		if(error) {
			response.json(null);
		}
		else {
			console.log(doc);
			response.json(doc);
		}
	});
};
/*Maneja el código de la ruta '/registro' mediante GET*/
exports.registroGET = function(request, response) {
	response.render('register',{
		title: 'Crea tu cuenta en TrollMe',
		navFixed: true
	});
};
/*Maneja el código de la ruta '/usuario'*/
exports.home = function(request, response) {
	response.render('home',{
		title: 'Bienvenido a tu Choza!',
		navFixed: false,
		userName: request.params.userName,
		picture: 'images/profilePictures/anon.png'
	});	
};
exports.trollme = function(request, response) {
	response.render('trollme',{
		title: 'Trolling | Now',
		navFixed: true
	});
};
/*Maneja el código de cualquier otra ruta (Error 404) */
exports.error = function(request, response) {
	response.render('404',{
		title: 'Crea tu cuenta en TrollMe',
		navFixed: true
	});
};