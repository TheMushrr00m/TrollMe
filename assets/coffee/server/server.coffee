express = require 'express'
app = express()
favicon = require 'serve-favicon'
bodyParser = require 'body-parser'
routes = require './controllers/routes'
port = process.env.OPENSHIFT_NODEJS_PORT or 9000
server_ip_address = process.env.OPENSHIFT_NODEJS_IP or '127.0.0.1'

app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.use bodyParser.urlencoded extended: true
app.use express.static __dirname + '/www'
app.use favicon __dirname + '/www/favicon.ico'

app.get '/', routes.index
app.get '/usuario', routes.home
app.get '/registro', routes.registroGET
app.post '/registro', routes.registroPOST
app.post '/login', routes.login
app.get '/trollme', routes.trollme
app.all '*', routes.error

app.listen port, ->
  console.log "Listening on #{server_ip_address}:#{port}!"