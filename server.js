var Users, app, bodyParser, express, io, mongoose, port, server_ip_address, session, usersSchema;

express = require('express');

app = express();

bodyParser = require('body-parser');

session = require('express-session');

io = require('socket.io');

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

app.use(session({
  secret: 'trollme'

  /*ROUTES */
}));

app.get('/', function(request, response) {
  return response.render('index', {
    title: 'Bienvenido a TrollMe',
    navFixed: true
  });
});

app.get('/home', function(request, response) {
  return response.render('home', {
    title: 'Bienvenido a tu choza!',
    navFixed: false
  });
});

app.get('/login', function(request, response) {
  return response.render('login');
});

app.get('/trollme', function(request, response) {

  /*response.render 'trollme' */
  return response.sendFile(__dirname + '/www/oscar-tests/test3.html');
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
  var pass, username;
  console.log(request.body);
  username = request.body.name;
  pass = request.body.pass;
  console.log(Users.findOne({
    NombreUsuario: 'TheMushrr00m'
  }, function(err, user) {
    if (err) {
      return console.error(err);
    }
    return console.log(user);
  }));
  return response.end();
});

app.get('/register', function(request, response) {
  return response.render('register');
});

app.all('*', function(request, response) {
  return response.render('404');
});

app.listen(port, function() {
  return console.log("Listening on " + server_ip_address + ":" + port + "!");
});
