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
			address: '/'
			text: 'Inicio'
		Perfil:
			address: '/home'
			text: 'Perfil de Usuario'
	response.render 'home',
		title: 'Bienvenido a tu choza!'
		navFixed: false
		breadcrumbs: breadcrumbs

app.post '/login', (request, response) ->
	data = request.body
	console.log 'Credenciales!!'
	console.log data.name
	console.log data.pass
	Users.findOne
		NombreUsuario: data.name
		Contraseña: data.pass
	, (err, doc) ->
		if err
			console.log 'Error: ', err
		console.log 'Docs: ', doc
		response.redirect '/'

app.get '/registro', (request, response) ->
	breadcrumbs =
		Inicio: 
			address: '/'
			text: 'Inicio'
		Perfil:
			address: '/registro'
			text: 'Registro de usuario'
	response.render 'register',
		breadcrumbs: breadcrumbs

app.get '/trollme', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/www/oscar-tests/test3.html'

app.all '*', (request, response) ->
	breadcrumbs =
		Inicio: 
			address: '/'
			text: 'Inicio'
		Perdido:
			address: '' + request.url
			text: 'Lugar equivocado'
	response.render '404',
		navFixed: true
		breadcrumbs: breadcrumbs


app.listen port, ->
	console.log "Listening on #{server_ip_address}:#{port}!" 