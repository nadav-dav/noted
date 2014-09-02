var mongoose = require('mongoose');

var conn;
if(process.env.NODE_ENV === "production"){
    conn = mongoose.connect('mongodb://localhost/noted');
}else {
    conn = mongoose.connect('mongodb://localhost/test');
}


module.exports = conn;