//=======================================================================================================
//										DATABASE
var mongoose = require('mongoose'),
	urlDB = 'mongodb://localhost:27017/Trollme',
	usersModel = require('../models/Users'),
	Users = usersModel.Users;

// Enable the DB connections
mongoose.connect(urlDB, function(err){
	if(err) {
		console.log(err);
	}
	else {
		console.log('DB Connected!');
	}
});
//=======================================================================================================

//===========================================================
//					RUTAS GENERALES							#
//															#
//===========================================================
/*Maneja el código de la ruta '/'*/
exports.index = function(request, response) {
	response.render('index', { 
		title: 'Bienvenido a TrollMe',
		navFixed: true
	});
};

/*Maneja el código de la ruta '/login' POST*/
exports.login = function(request, response) {
	Users.find({
		NombreUsuario: request.params.name,
		Contraseña: request.params.pass
	}, function(error, docs) {
		if(error) {
			response.send('False');
		}
		else {
			response.redirect('/usuario');
		}
	});
};

/*Maneja el código de la ruta '/usuario'*/
exports.home = function(request, response) {
	response.render('home',{
		title: 'Bienvenido a tu Choza!',
		navFixed: false
	});
};
exports.trollme = function(request, response) {
	response.render('mall',{
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

/*Maneja el código de la ruta '/registro'*/
/*exports.registro = function(request, response) {
	response.render('register',{
		title: 'Crea tu cuenta en TrollMe',
		navFixed: true
	});
};*/