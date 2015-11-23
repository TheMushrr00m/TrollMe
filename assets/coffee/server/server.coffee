express = require 'express'
app = express()
bodyParser = require 'body-parser'
session = require 'express-session'
io = require 'socket.io'
mongoose = require 'mongoose'
usersSchema = require './Users'
Users = mongoose.model 'users', usersSchema

port = process.env.OPENSHIFT_NODEJS_PORT or 9000
server_ip_address = process.env.OPENSHIFT_NODEJS_IP or '127.0.0.1'

app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.use express.static __dirname + '/www'
app.use bodyParser.urlencoded extended: true
app.use session secret: 'trollme'

###ROUTES###
app.get '/', (request, response) ->
	response.render 'index', 
		title: 'Bienvenido a TrollMe'
		navFixed: true

app.get '/home', (request, response) ->
	response.render 'home',
		title: 'Bienvenido a tu choza!'
		navFixed: false

app.get '/login', (request, response) ->
	response.render 'login'

app.get '/trollme', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/www/oscar-tests/test3.html'

app.get '/trollme2', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/public/oscar-tests/game1.html'

app.get '/trollme3', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/public/oscar-tests/game1.html'

app.post '/login', (request, response) ->
	console.log request.body
	username = request.body.name
	pass = request.body.pass
	console.log Users.findOne
		NombreUsuario: 'TheMushrr00m',
		(err, user) ->
			if err
				return console.error err
			console.log user
	response.end()

app.get '/register', (request, response) ->
	response.render 'register'

app.all '*', (request, response) ->
	response.render '404'

app.listen port, ->
	console.log "Listening on #{server_ip_address}:#{port}!" 