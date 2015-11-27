var MongoClient = require('mongodb').MongoClient,
	assert = require('assert'),
	ObjectID =require('mongodb').ObjectID,
	port = process.env.OPENSHIFT_NODEJS_PORT || 9000,
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

exports.connectionDB = function(method) {
	MongoClient.connect(url, function(err, db) {
		assert.equal(null, err);
	  	method(db, function() {
	  		db.close();
	  	});
	});
};