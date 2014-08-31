var rek = require("rekuire");
var MongoConnection = rek("MongoConnection");

module.exports = function(){
    var Note = rek("Note").remove({});
    var Vote = rek("Vote").remove({});
    var Company = rek("Company").remove({});
    var User = rek("User").remove({});
    var collections = ['notes','votes','companies','users'];
    collections.forEach(function(collection){
        MongoConnection.connection.collections[collection].drop();
    });

//    MongoConnection.connection.db.dropDatabase();
};