var rek = require("rekuire");
var request = require("request");
var env = rek("ITEnvironment");
rek("asPromise");


var drivers = {};

    drivers.company = createDriverFor   (env.url+"/services/company");
    drivers.user    = createDriverFor   (env.url+"/services/user");
    drivers.note    = createDriverFor   (env.url+"/services/note");
    drivers.vote    = createDriverFor   (env.url+"/services/vote");




function createDriverFor(endpoint){
    return {
        create: function (payload){
            return request.post.asPromise(endpoint, {json: payload})
                .spread(function(res, body){
                    return res;
                });
        },
        getById: function (id){
            return request.get.asPromise(endpoint+"/"+id, {json: true})
                .spread(function(res, body){
                    return res;
                });
        },
        update: function (id, changes){
            return request.put.asPromise(endpoint+"/"+id, {json: changes})
                .spread(function(res, body){
                    return res;
                });
        },
        'delete': function (id, changes){
            return request.del.asPromise(endpoint+"/"+id, {json: true})
                .spread(function(res, body){
                    return res;
                });
        }
    }
}


module.exports = drivers;