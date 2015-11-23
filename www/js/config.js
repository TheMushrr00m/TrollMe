var config, dbName, env, path, rootPath;

path = require('path');

rootPath = path.normalize(__dirname + '/..');

env = process.env.NODE_ENV || 'development';

dbName = 'Trollme';

config = {
  development: {
    root: rootPath,
    app: {
      name: 'Trollme'
    },
    port: 9000,
    db: "mongodb://127.0.0.1:27017/" + dbName
  },
  test: {
    root: rootPath,
    app: {
      name: 'Trollme'
    },
    port: 9000,
    db: "mongodb://127.0.0.1:27017/" + dbName
  },
  production: {
    root: rootPath,
    app: {
      name: 'Trollme'
    },
    port: 9000,
    db: "mongodb://127.0.0.1:27017/" + dbName
  }
};

module.exports = config[env];
