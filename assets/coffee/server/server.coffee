express = require 'express'
app = express()
bodyParser = require 'body-parser'
favicon = require 'serve-favicon'
session = require 'express-session'
mongoose = require 'mongoose'
usersSchema = require './Users'
Users = mongoose.model 'users', usersSchema

port = process.env.OPENSHIFT_NODEJS_PORT or 9000
server_ip_address = process.env.OPENSHIFT_NODEJS_IP or '127.0.0.1'

app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.use express.static __dirname + '/www'
app.use bodyParser.urlencoded extended: true
app.use favicon __dirname + '/www/favicon.ico'
app.use session secret: 'trollme'

###ROUTES###
app.get '/', (request, response) ->
	breadcrumbs =
		Inicio: 
			address: '/'
			text: 'Inicio'
	response.render 'index', 
		title: 'Bienvenido a TrollMe'
		navFixed: true
		breadcrumbs: breadcrumbs

app.get '/home', (request, response) ->
	breadcrumbs =
		Inicio: 
			addres: '/'
			text: 'Inicio'
		Perfil:
			address: '/home'
			text: 'Perfil de Usuario'
	response.render 'home',
		title: 'Bienvenido a tu choza!'
		navFixed: false
		breadcrumbs: breadcrumbs

app.post '/login', (request, response) ->
	console.log request.body
	username = request.body.name
	pass = request.body.pass
	Users.findOne
		NombreUsuario: 'TheMushrr00m',
		(err, user) ->
			if err
				console.error err
				return url: '/'
			###console.log user###
			response.send 
				url: '/home'

app.get '/trollme', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/www/oscar-tests/test3.html'

app.get '/trollme2', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/public/oscar-tests/game1.html'

app.get '/trollme3', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/public/oscar-tests/game1.html'

app.get '/register', (request, response) ->
	response.render 'register'

app.all '*', (request, response) ->
	response.render '404'

app.listen port, ->
	console.log "Listening on #{server_ip_address}:#{port}!" 