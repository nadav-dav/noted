var Schema = require('mongoose').Schema;
var rek = require("rekuire");
var conn = rek("MongoConnection");

var userSchema = new Schema({
    email       :  { type: String, match: /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/ },
    name        :  { type: String, match: /[a-zA-Z0-9\s]+/ },
    password    :  { type: String, match: /[a-zA-Z0-9\s]+/ },
    company     :  { type: String, match: /[a-zA-Z0-9\s]+/ },
    privileges  :  { type: String, match: /[a-zA-Z0-9\s]+/ },
    dateCreated :  { type: Date, default: Date.now },
    dateUpdated :  { type: Date, default: Date.now }
});

var Company = conn.model('users', userSchema);

module.exports = Company;