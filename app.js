var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    User = require('./models/Users.js');

var port = process.env.OPENSHIFT_NODEJS_PORT || 9000,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'trollme' }));
/*app.use(function (req, res, next) {
    next();
});*/

/// ROUTES
app.get('/', function(request, response){
    console.log(__dirname + '/views');
    response.render('index');
});

app.get('/trollme', function(request, response){
    response.render('game');
});

app.get('/login', function(request, response){
    /*var obj = {};
    console.log('Solicitando!!');
    console.log('body: ' + JSON.stringify(request.body));*/
    response.render('login');
});

app.get('/home/:username', function(request, response){
    console.log(request.params.username)
    var user = userData.filter(function(user){
        if(request.params.username === user.username){
            response.render('home', user);
        }
    })[0];
});

app.get('/register', function(request, response){
    response.render('register');
});

app.all('*', function(request, response){
    response.render('404');
});

app.listen(port, server_ip_address, function(){
    console.log('Listening on %s:%d', server_ip_address);
});