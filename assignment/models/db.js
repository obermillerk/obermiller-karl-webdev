var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://127.0.0.1:27017/assignment'; // for local
if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137271.mlab.com:37271/heroku_k795p235';
}

var db = mongoose.createConnection(connectionString);

db.mongoose = mongoose;

module.exports = db;