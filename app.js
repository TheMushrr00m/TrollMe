var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var port = process.env.OPENSHIFT_NODEJS_PORT || 9000,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
    dbName = 'Trollme',
    mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + dbName;

    //  Openshift credentials
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
/*if (process.env.OPENSHIFT_MONGO_DB_HOST) {
    mongodb_connection_string = 'mongodb://' + $OPENSHIFT_MONGODB_HOST + ':' + $OPENSHIFT_MONGO_DB_PORT + '/' + db_name;
}*/

mongoose.connect(mongodb_connection_string);
var Cat = mongoose.model('Cat', { name: String });
var kitty = new Cat({ name: 'Misifu' });
kitty.save(function (err) {
    if (err) {}
    console.log('Meow');
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// Test Data
var userData = [
    {username: 'TheMushrr00m'},
    {username: 'Tux0n'},
    {username: 'Queen'},
    {username: 'P0seidon'},
];
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