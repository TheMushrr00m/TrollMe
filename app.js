var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    User = require('./models/Users.js');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ secret: 'trollme' }));

/// ROUTES
app.get('/', function(request, response){
    console.log(__dirname + '/views');
    response.render('index');
});

app.get('/trollme', function(request, response){
    response.render('game');
});

app.get('/login', function(request, response){
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
    console.log('Listening on %s:%d and MongoDB: %s', server_ip_address, port, mongodb_connection_string);
});