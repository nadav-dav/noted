var rek = require("rekuire");
var MongoConnection = rek("MongoConnection");
var Q = require("q");

module.exports = function(){



    var collections = ['notes','votes','companies','users'];
    collections.forEach(function(collection){
//        MongoConnection.connection.collections[collection].drop();
    });

    return Q.all([
        Q(rek("Note").remove({}).exec()),
        Q(rek("Vote").remove({}).exec()),
        Q(rek("Company").remove({}).exec()),
        Q(rek("User").remove({}).exec())
    ]).then(function(){});

//    MongoConnection.connection.db.dropDatabase();
};