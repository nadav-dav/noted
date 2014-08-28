var mongoose = require('mongoose');

var mongo = mongoose.createConnection('mongodb://localhost');

module.exports = mongo;