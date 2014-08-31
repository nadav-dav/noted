var rek = require("rekuire");
var request = require("request");
var env = rek("ITEnvironment");
rek("asPromise");

var companyEndpoint = env.url+"/services/company";

var drivers = {};

    drivers.company = {
        create: function (payload){
            return request.post.asPromise(companyEndpoint, {json: payload})
                .spread(function(res, body){
                    return res;
                });
        },
        getById: function (id){
            return request.get.asPromise(companyEndpoint+"/"+id, {json: true})
                .spread(function(res, body){
                    return res;
                });
        },
        update: function (id, changes){
            return request.put.asPromise(companyEndpoint+"/"+id, {json: changes})
                .spread(function(res, body){
                    return res;
                });
        },
        'delete': function (id, changes){
            return request.del.asPromise(companyEndpoint+"/"+id, {json: true})
                .spread(function(res, body){
                    return res;
                });
        }
    };


module.exports = drivers;