var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://127.0.0.1:27017/project'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds127982.mlab.com:27982/heroku_5x0dts4n';
}

var db = mongoose.createConnection(connectionString);

db.mongoose = mongoose;

module.exports = db;