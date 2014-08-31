var mongoose = require('mongoose');

var mongo = mongoose.connect('mongodb://localhost');

module.exports = mongo;