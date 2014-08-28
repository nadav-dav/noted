var Schema = require('mongoose').Schema;
var ObjectId = Schema.ObjectId;
var rek = require("rekuire");
var conn = rek("MongoConnection");
var mongoose = rek("mongoose");

var companySchema = new Schema({
    name        :  { type: String, match: /[a-zA-Z0-9\s]/ },
    dateCreated :  { type: Date, default: Date.now },
    dateUpdated :  { type: Date, default: Date.now }
});

var Company = conn.model('companies', companySchema);

module.exports = Company;