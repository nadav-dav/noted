var rek = require("rekuire");
var request = require("request");
var Q = require("q");
var env = rek("ITEnvironment");


var drivers = {};

    drivers.company = {
        create: function (name){
            var payload = {
                name: name
            };
            return Q.nfcall(request.post, env.url+"/services/company", {json: payload})
                .spread(function(res, body){
                    return res;
                });
        },
        getById: function (id){
            return Q.nfcall(request.get, env.url+"/services/company/"+id, {json: true})
                .spread(function(res, body){
                    return res;
                });
        },
        update: function (id, changes){
            return Q.nfcall(request.put, env.url+"/services/company/"+id, {json: changes})
                .spread(function(res, body){
                    return res;
                });
        },
        'delete': function (id, changes){
            return Q.nfcall(request.del, env.url+"/services/company/"+id, {json: true})
                .spread(function(res, body){
                    return res;
                });
        },
    };


module.exports = drivers;