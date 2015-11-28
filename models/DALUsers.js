var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectID =require('mongodb').ObjectID,
    server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1',
	port = process.env.OPENSHIFT_NODEJS_PORT || 9000,
    mongodb_connection_string = 'mongodb://127.0.0.1:27017/Trollme';

//  Openshift credentials
/*=================================================================================================================*/
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL + db_name;
}
if (process.env.OPENSHIFT_MONGO_DB_HOST) {
    mongodb_connection_string = 'mongodb://' + $OPENSHIFT_MONGODB_HOST + ':' + $OPENSHIFT_MONGO_DB_PORT + '/' + db_name;
}
//=================================================================================================================

function credentialsAreCorrect(credentials, db, callback) {
	var cursor = db.collection('users').find({ 
		NombreUsuario: credentials.name,
		Contraseña: credentials.pass 
	});
	cursor.each(function(err, doc) {
      	assert.equal(err, null);
      	if (doc != null) {
        	//console.dir(doc);
        	return true;
      	} else {
        	callback();
        	return false;
      	}
   	});
};

exports.checkLogin = function(credentials){
	MongoClient.connect(mongodb_connection_string, function(err, db) {
		assert.equal(null, err);
		credentialsAreCorrect(credentials, db, function() {
			db.close();
		});
	});
};