express = require 'express'
config = require './config/config'
app = express()
bodyParser = require 'body-parser'
session = require 'express-session'

port = process.env.OPENSHIFT_NODEJS_PORT or 9000
server_ip_address = process.env.OPENSHIFT_NODEJS_IP or '127.0.0.1'

app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.use express.static __dirname + '/public'
app.use bodyParser.json()
app.use bodyParser.urlencoded extended: true
app.use session secret: 'trollme'

###ROUTES###
app.get '/', (request, response) ->
	response.render 'index'

app.get '/login', (request, response) ->
	response.render 'login'

app.get '/trollme', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/public/oscar-tests/test3.html'

app.get '/trollme2', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/public/oscar-tests/game1.html'

app.get '/trollme3', (request, response) ->
	###response.render 'trollme'###
	response.sendFile __dirname + '/public/oscar-tests/game1.html'

app.post '/login', (request, response) ->
	username = request.body.name
	pass = request.body.pass
	query = User.find 
		NombreUsuario: username, 
		Contraseña: pass
		(err, docs) -> 
			if err
				response.redirect 301, '/404'
			else
				if not request.session.userId
					request.session.userId = query.NombreUsuario
				response.redirect 301, '/home', username

app.get '/register', (request, response) ->
	response.render 200, 'register'

app.all '*', (request, response) ->
	response.render '404'

app.listen port, ->
	console.log "Listening on #{server_ip_address}:#{port}!" 