var Schema = require('mongoose').Schema;
var rek = require("rekuire");
var conn = rek("MongoConnection");
var ObjectId = Schema.ObjectId;

var voteSchema = new Schema({
    note        :  { type: ObjectId , required: true },
    user        :  { type: ObjectId , required: true },
    type        :  { type: Number   , required: true }
});

var Vote = conn.model('votes', voteSchema);

module.exports = Vote;