var app, bodyParser, express, favicon, port, routes, server_ip_address;

express = require('express');

app = express();

favicon = require('serve-favicon');

bodyParser = require('body-parser');

routes = require('./controllers/routes');

port = process.env.OPENSHIFT_NODEJS_PORT || 9000;

server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express["static"](__dirname + '/www'));

app.use(favicon(__dirname + '/www/favicon.ico'));

app.set('view engine', 'jade');

app.set('views', __dirname + '/views');

app.get('/', routes.index);

app.post('/login', routes.login);

app.get('/registro', routes.registroGET);

app.post('/registro', routes.registroPOST);

app.get('/trollme', routes.trollme);

app.get('/:userName', routes.home);

app.all('*', routes.error);

app.listen(port, function() {
  return console.log("Listening on " + server_ip_address + ":" + port + "!");
});
