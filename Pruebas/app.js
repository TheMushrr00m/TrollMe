var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
    io = require("socket.io")(server),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/////////////////////////////////////////7
//LOGIN CODE
///////////////////////////////////////
/*mongoose.connect('mongodb://localhost:27017/Trollme');
var db = mongoose.connection;
db.once('open', function (callback) {
	console.log('Connected to Database!!');
});
var userSchema = new mongoose.Schema({
    Nombre: String,
    Apellido: [{ 
        Paterno: String,
        Materno: String
        }],
    NombreUsuario: String,
    CreacionCuenta: { 
        type: Date,
        default: Date.now
    },
    Email: String,
    Contraseña: String,
    Edad: Number,
    País: String,
});
var conn = mongoose.model('User', userSchema);
var User = conn.

app.post('/login', function(request, response) {
	var name = request.body.name,
		pass = request.body.pass;
	console.log('Nombre: %s', name);
	console.log('Pass: %s', pass);
	console.log(request.data);
	User.findOne({ NombreUsuario: name }, function(err, user) {
		if(err) {
			return console.error(err);
		}
		console.log(user);
	});
	response.redirect('/login');
});

app.get('/login', function(request, response) {
	response.send('<h1>Welcome</h1>');
});*/

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/public/chat.html');
});

server.listen(8080, function() {
	console.log('Running on port: 8080');
})


/////////////////////////////////////////7
//LOGIN CODE
/////////////////////////////////////////
// Chat example
// Socket.io Code
var nicknames = {};
io.on('connection', function(socket) {

	socket.on('send message', function(message) {
		io.emit('new message', { 'message': message, 'nick': socket.nick });
	})

	socket.on('new user', function(nick, callback) {
		if(nick in nicknames) {
			callback(false);
		}
		else {
			callback(true);
			socket.nick = nick;
			nicknames[socket.nick] = 1;
			updateNicknames();
		}
	});

	socket.on('disconnect', function() {
		if(!socket.nick) return;
		delete nicknames[socket.nick];
		updateNicknames();
	});

	function updateNicknames() {
		io.emit('usernames', nicknames);
	}
});