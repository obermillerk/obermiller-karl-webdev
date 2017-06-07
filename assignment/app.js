var app = require('../express');
var mongoose = require('mongoose');

console.log(mongoose.connections);

require('./services/user.service.server');
require('./services/website.service.server');
require('./services/page.service.server');
require('./services/widget.service.server');