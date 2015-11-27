express = require 'express'
app = express()
bodyParser = require 'body-parser'
favicon = require 'serve-favicon'
routes = require './routes/routes'
session = require 'express-session'

port = process.env.OPENSHIFT_NODEJS_PORT or 9000
server_ip_address = process.env.OPENSHIFT_NODEJS_IP or '127.0.0.1'

app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'
app.set 'superSecret', config.phrase
app.use express.static __dirname + '/www'
app.use bodyParser.urlencoded extended: true
app.use bodyParser.json()
app.use favicon __dirname + '/www/favicon.ico'
app.use session secret: 'trollme'

###ROUTES###
app.get '/', routes.index

app.get '/usuario', routes.home

app.get '/registro', routes.registro

app.post '/login', routes.login

app.get '/trollme', routes.trollme

app.all '*', routes.error

app.listen port, ->
  console.log "Listening on #{server_ip_address}:#{port}!"