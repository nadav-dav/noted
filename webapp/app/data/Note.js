var Schema = require('mongoose').Schema;
var rek = require("rekuire");
var conn = rek("MongoConnection");
var ObjectId = Schema.ObjectId;

var noteSchema = new Schema({
    company     :  { type: ObjectId , required: true },
    user        :  { type: ObjectId , required: true },
    email       :  { type: String, required: true},
    upvotes     :  { type: Number , default: 0 },
    downvotes   :  { type: Number , default: 0 },
    hint        :  { type: String, required: false},
    text        :  { type: String, required: true},
    location    :  { type: [Number], index: "2d", required: true},
    dateCreated :  { type: Date, default: Date.now },
    dateUpdated :  { type: Date, default: Date.now }
});

noteSchema.index({ company: 1, location  : "2d" });
noteSchema.index({ company: 1 });
noteSchema.index({ user: 1 });

var Note = conn.model('notes', noteSchema);

module.exports = Note;