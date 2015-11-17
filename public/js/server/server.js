var app, bodyParser, config, express, port, server_ip_address, session;

express = require('express');

config = require('./config/config');

app = express();

bodyParser = require('body-parser');

session = require('express-session');

port = process.env.OPENSHIFT_NODEJS_PORT || 9000;

server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.set('views', __dirname + '/views');

app.set('view engine', 'jade');

app.use(express["static"](__dirname + '/public'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'trollme'

  /*ROUTES */
}));

app.get('/', function(request, response) {
  return response.render('index');
});

app.get('/login', function(request, response) {
  return response.render('login');
});

app.get('/trollme', function(request, response) {

  /*response.render 'trollme' */
  return response.sendFile(__dirname + '/public/oscar-tests/test3.html');
});

app.get('/trollme2', function(request, response) {

  /*response.render 'trollme' */
  return response.sendFile(__dirname + '/public/oscar-tests/game1.html');
});

app.get('/trollme3', function(request, response) {

  /*response.render 'trollme' */
  return response.sendFile(__dirname + '/public/oscar-tests/game1.html');
});

app.post('/login', function(request, response) {
  var pass, query, username;
  username = request.body.name;
  pass = request.body.pass;
  return query = User.find({
    NombreUsuario: username,
    Contraseña: pass
  }, function(err, docs) {
    if (err) {
      return response.redirect(301, '/404');
    } else {
      if (!request.session.userId) {
        request.session.userId = query.NombreUsuario;
      }
      return response.redirect(301, '/home', username);
    }
  });
});

app.get('/register', function(request, response) {
  return response.render(200, 'register');
});

app.all('*', function(request, response) {
  return response.render('404');
});

app.listen(port, function() {
  return console.log("Listening on " + server_ip_address + ":" + port + "!");
});
