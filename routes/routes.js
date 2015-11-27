/*Maneja el código de la ruta '/'*/
exports.index = function(request, response) {
	response.render('index', { 
		title: 'Bienvenido a TrollMe',
		navFixed: true
	});
};

/*Maneja el código de la ruta '/usuario'*/
exports.home = function(request, response) {
	response.render('home',{
		title: 'Bienvenido a tu Choza!',
		navFixed: false
	});
};

/*Maneja el código de la ruta '/registro'*/
exports.registro = function(request, response) {
	response.render('register',{
		title: 'Crea tu cuenta en TrollMe',
		navFixed: true
	});
};

/*Maneja el código de la ruta '/login' POST*/
exports.login = function(request, response) {
	var data = request.body;
	console.log('Credenciales: ', data);
	if(DALUsers.checkLogin(data)) {
		response.send('True');
	}
	else {
		response.send('False');
	}
};

/*Maneja el código de la ruta /trollme  
TODO: Pasarlo a plantillas de JADE
*/
exports.trollme = function(request, response) {
	response.render('trollme');
};

/*Maneja el código de cualquier otra ruta (Error 404) */
exports.error = function(request, response) {
	response.render('404',{
		title: 'Crea tu cuenta en TrollMe',
		navFixed: true
	});
};