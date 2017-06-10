var app = require('../express');
var mongoose = require('mongoose');

mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/assignment');

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');