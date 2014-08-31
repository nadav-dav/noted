var Schema = require('mongoose').Schema;
var rek = require("rekuire");
var conn = rek("MongoConnection");
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    email       :  { type: String, unique: true, required: true, match: /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/ },
    name        :  { type: String, required: true, match: /[a-zA-Z0-9\-\_\s]+/ },
    password    :  { type: String, required: true, match: /[a-zA-Z0-9\-\_\s]+/ },
    privileges  :  { type: Number, required: true},
    company     :  { type: ObjectId , required: true },
    dateCreated :  { type: Date, default: Date.now },
    dateUpdated :  { type: Date, default: Date.now }
});

userSchema.index({ email    : 1 });
userSchema.index({ company  : 1 });

var User = conn.model('users', userSchema);

module.exports = User;