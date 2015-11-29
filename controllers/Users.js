var mongoose = require('mongoose'),
	urlDB = 'mongodb://localhost:27017/Trollme',
	usersModel = require('../models/Users'),
	Users;

mongoose.connect(urlDB, function(error) {
	if(error) {
		/*throw error;*/
		console.log('No se pudo conectar a la BD!');
	}
	else {
		console.log('Conectado a la BD!!');
	}
});
exports.setModel = function(model) {
	Users = model;
};
exports.index = function(request, response) {
	Users.find({}, function(error, docs) {
		if(error) {
			response.send('Ha surgido un error!');
		}
		else {
			response.render('users/index', {
				users: docs
			});
		}
	});
};
exports.create = function(request, response) {
	response.render('users/save', {
		put: false,
		action: '/users/',
		user: new Users({
			Nombre: '',
			Apellido: '',
			Contraseña: '',
			Edad: '',
			Email: '',
			Nombre: '',
			NombreUsuario: '',
			Pais: ''
		})
	});
};
exports.store = function(request, response) {
   var user = new Users({
			Nombre: '',
			Apellido: '',
			Contraseña: '',
			Edad: '',
			Email: '',
			Nombre: '',
			NombreUsuario: '',
			Pais: ''
		});
	users.save(function(error, documento) {
		if(error){
			response.send('Error al intentar registrar al usuario!.');
		}else{ 
			response.redirect('/users');
		}
	});
};
exports.show = function(request, response){
	Users.findById(request.params.id, function(error, doc){
		if(error){
			response.send('Error al intentar ver el usuario.');
		}else{
			response.render('users/show', {
				user: doc
			});
		};
   });
};
exports.edit = function(request, response){
	Users.findById(request.params.id, function(error, doc){
		if(error){
			res.send('Error al intentar ver el personaje.');
		}else{
			response.render('users/save', {
				put: true,
				action: '/users/' + request.params.id,
				user: doc
			});
		};
	});
};
exports.update = function(request, response){
	Users.findById(request.params.id, function(error, doc){
		if(error){
			response.send('Error al intentar modificar el usuario.');
		}else{
			var user = doc;
			user.nombre = request.body.nombre;
			user.apellido = request.body.apellido;
			user.save(function(error, documento){
				if(error){
					res.send('Error al intentar guardar el usuario.');
				}else{ 
					res.redirect('/users');
				};
			});
		};
	});
};
exports.destroy = function(request, response){
	Users.remove({_id: request.params.id}, function(error){
		if(error){
			response.send('Error al intentar eliminar el personaje.');
		}else{ 
			res.redirect('/personajes');
		}
	});
};