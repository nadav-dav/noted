var Schema = require('mongoose').Schema;
var rek = require("rekuire");
var conn = rek("MongoConnection");
var ObjectId = Schema.ObjectId;

var voteSchema = new Schema({
    note        :  { type: ObjectId , required: true },
    user        :  { type: ObjectId , required: true },
    type        :  { type: Number   , required: true }
});

voteSchema.index({ user: 1 });
voteSchema.index({ note: 1 });

var Vote = conn.model('votes', voteSchema);

module.exports = Vote;