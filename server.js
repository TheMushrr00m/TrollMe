var app, bodyParser, express, favicon, port, routes, server_ip_address, session;

express = require('express');

app = express();

bodyParser = require('body-parser');

favicon = require('serve-favicon');

routes = require('./routes/routes');

session = require('express-session');

<<<<<<< HEAD
=======
mongoose = require('mongoose');

//usersSchema = require('./Users');

//Users = mongoose.model('users', usersSchema);
	
>>>>>>> a5606fa9a5a21eb5de128f7412d281f84259ae65
port = process.env.OPENSHIFT_NODEJS_PORT || 9000;

server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

app.use(express["static"](__dirname + '/www'));

app.use(bodyParser.urlencoded({
  extended: true
}));

//app.use(favicon(__dirname + '/www/favicon.ico'));

app.use(session({
  secret: 'trollme'

  /*ROUTES */
}));

app.get('/', routes.index);

app.get('/usuario', routes.home);

app.get('/registro', routes.registro);

app.post('/login', routes.login);

app.get('/trollme', routes.trollme);

app.all('*', routes.error);

app.listen(port, function() {
  return console.log("Listening on " + server_ip_address + ":" + port + "!");
});
