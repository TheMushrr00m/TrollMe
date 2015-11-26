/*Maneja el código de la ruta '/'*/
exports.index = function(request, response) {
	breadCrumbs = {
		Inicio: {
			address: '/',
			test: 'Inicio'
		}
	};
	response.render('index', { 
		title: 'Bienvenido a TrollMe',
		navFixed: true,
		breadcrumbs: breadCrumbs 
	});
};

/*Maneja el código de la ruta '/usuario'*/
exports.home = function(request, response) {
	breadCrumbs = {
		Inicio: {
			address: '/',
			test: 'Inicio'
		},
		Perfil: {
			address: '/usuario',
			text: 'Página de usuario'
		}
	};
	response.render('home',{
		title: 'Bienvenido a tu Choza!',
		navFixed: false,
		breadcrumbs: breadCrumbs
	});
};

/*Maneja el código de la ruta '/registro'*/
exports.registro = function(request, response) {
	breadCrumbs = {
		Inicio: {
			address: '/',
			test: 'Inicio'
		},
		Registro: {
			address: '/registro',
			text: 'Creación de Cuenta'
		}
	};
	response.render('register',{
		title: 'Crea tu cuenta en TrollMe',
		navFixed: true,
		breadcrumbs: breadCrumbs
	});
};

/*Maneja el código de la ruta '/login' POST*/
exports.login = function(request, response) {
	var data = request.body;
	console.log('Credenciales: ', data);
	Users.findOne({
		NombreUsuario: data.name,
		Contraseña: data.pass
	}, function(err, doc) {
		if(err) { return console.error('Error: ', err); }
		else {
			console.log('Doc: ', doc);
			return response.redirect('/');
		}
	});
};

/*Maneja el código de la tura /trollme  
TODO: Pasarlo a plantillas de JADE
*/
exports.trollme = function(request, response) {
	breadCrumbs = {
		Inicio: {
			address: '/',
			test: 'Inicio'
		},
		TrollMe: {
			address: '/trollme',
			text: 'Lugar Equivocado'
		}
	};
	// Fix para mostrar temporalmente el archivo :V
	//=============================================
	var path = __dirname;
	path = path.replace('routes', 'www/oscar-tests/test3.html');
	//=============================================
	response.sendFile(path);
};

/*Maneja el código de cualquier otra ruta (Error 404) */
exports.error = function(request, response) {
	breadCrumbs = {
		Inicio: {
			address: '/',
			test: 'Inicio'
		},
		Perdido: {
			address: '' + request.url,
			text: 'Lugar Equivocado'
		}
	};
	response.render('404',{
		title: 'Crea tu cuenta en TrollMe',
		navFixed: true,
		breadcrumbs: breadCrumbs
	});
};