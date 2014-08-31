var rek = require("rekuire");
var request = require("request");
var mongoose = require("mongoose");
var env = rek("ITEnvironment");
rek("asPromise");
var User = rek("User");
var UserPrivileges = rek("UserPrivileges");


var drivers = {};

    drivers.company = createDriverFor   (env.url+"/services/company");
    drivers.note    = createDriverFor   (env.url+"/services/note");
    drivers.vote    = createDriverFor   (env.url+"/services/vote");
    drivers.user    = createDriverFor   (env.url+"/services/user");

    drivers.security= createSecurityDrivers();
    drivers.cookies = createCookiesDrivers();
    drivers.database = createDatabaseDrivers();


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

function createSecurityDrivers(){
    return {
        accessRestrictedArea: function(){
            return request.get.asPromise(env.url+"/services/restricted")
                .spread(function(res, body){
                    return res;
                });
        },

        login: function(payload){
            return request.post.asPromise(env.url+"/services/login", {json: payload})
                .spread(function(res, body){
                    return res;
                });
        },

        logout: function(){
            return request.del.asPromise(env.url+"/services/logout")
                .spread(function(res, body){
                    return res;
                });
        }
    }
}

function createCookiesDrivers(){
    return {
        reset: function(){
            var j = request.jar();
            request = require("request").defaults({jar:j})
        }
    }
}

function createDatabaseDrivers(){
    return {
        createUser: function(privileges){
            privileges = privileges || UserPrivileges.NORMAL_USER
            var user = new User({
                email   :   "myemail@company.com",
                name    :   "Foo Bar",
                password:   "mypass",
                company :   new mongoose.Types.ObjectId(),
                privileges: privileges
            });

            return user.save.bind(user).asPromise()
                .then(function(results){
                    return results[0];
                })
        }
    }
}


module.exports = drivers;