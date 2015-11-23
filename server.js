var Users, app, bodyParser, express, favicon, mongoose, port, server_ip_address, session, usersSchema;

express = require('express');

app = express();

bodyParser = require('body-parser');

favicon = require('serve-favicon');

session = require('express-session');

mongoose = require('mongoose');

usersSchema = require('./Users');

Users = mongoose.model('users', usersSchema);

port = process.env.OPENSHIFT_NODEJS_PORT || 9000;

server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

app.use(express["static"](__dirname + '/www'));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(favicon(__dirname + '/www/favicon.ico'));

app.use(session({
  secret: 'trollme'

  /*ROUTES */
}));

app.get('/', function(request, response) {
  var breadcrumbs;
  breadcrumbs = {
    Inicio: {
      address: '/',
      text: 'Inicio'
    }
  };
  return response.render('index', {
    title: 'Bienvenido a TrollMe',
    navFixed: true,
    breadcrumbs: breadcrumbs
  });
});

app.get('/home', function(request, response) {
  var breadcrumbs;
  breadcrumbs = {
    Inicio: {
      address: '/',
      text: 'Inicio'
    },
    Perfil: {
      address: '/home',
      text: 'Perfil de Usuario'
    }
  };
  return response.render('home', {
    title: 'Bienvenido a tu choza!',
    navFixed: false,
    breadcrumbs: breadcrumbs
  });
});

app.post('/login', function(request, response) {
  var data;
  console.log(request.body);
  data = request.body;
  return console.log(Users.findOne({
    NombreUsuario: data.name
  }, function(err, user) {
    console.log(user);
    if (err) {
      console.error(err);
      return {
        url: '/'
      };
    }
    return response.send({
      url: '/home'
    });
  }));
});

app.get('/registro', function(request, response) {
  var breadcrumbs;
  breadcrumbs = {
    Inicio: {
      address: '/',
      text: 'Inicio'
    },
    Perfil: {
      address: '/registro',
      text: 'Registro de usuario'
    }
  };
  return response.render('register', {
    breadcrumbs: breadcrumbs
  });
});

app.get('/trollme', function(request, response) {

  /*response.render 'trollme' */
  return response.sendFile(__dirname + '/www/oscar-tests/test3.html');
});

app.all('*', function(request, response) {
  var breadcrumbs;
  breadcrumbs = {
    Inicio: {
      address: '/',
      text: 'Inicio'
    },
    Perdido: {
      address: '' + request.url,
      text: 'Lugar equivocado'
    }
  };
  return response.render('404', {
    navFixed: true,
    breadcrumbs: breadcrumbs
  });
});

app.listen(port, function() {
  return console.log("Listening on " + server_ip_address + ":" + port + "!");
});
