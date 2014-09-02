var rek = require("rekuire");
var request = require("request");
var mongoose = require("mongoose");
var env = rek("ITEnvironment");
rek("asPromise");
var User = rek("User");
var UserPrivileges = rek("UserPrivileges");


var drivers = {};

createCrudDriverFor     (drivers, "company" , env.url + "/services/company");
createCrudDriverFor     (drivers, "note"    , env.url + "/services/note");
createCrudDriverFor     (drivers, "vote"    , env.url + "/services/vote");
createCrudDriverFor     (drivers, "user"    , env.url + "/services/user");

createSecurityDrivers   (drivers, "security");
createCookiesDrivers    (drivers, "cookies");
createDatabaseDrivers   (drivers, "database");
createVotingDrivers     (drivers, "voting");
createNoteSearchingDrivers(drivers, "note");
createUserSearchingDrivers(drivers, "user");


function createCrudDriverFor(drivers, namespace, endpoint) {
    var driver = drivers[namespace] = drivers[namespace] || {};
    driver.create = function (payload) {
        return request.post.asPromise(endpoint, {json: payload})
            .spread(function (res, body) {
                return res;
            });
    };
    driver.getById = function (id) {
        return request.get.asPromise(endpoint + "/" + id, {json: true})
            .spread(function (res, body) {
                return res;
            });
    };
    driver.update = function (id, changes) {
        return request.put.asPromise(endpoint + "/" + id, {json: changes})
            .spread(function (res, body) {
                return res;
            });
    }
    driver.delete = function (id, changes) {
        return request.del.asPromise(endpoint + "/" + id, {json: true})
            .spread(function (res, body) {
                return res;
            });
    }

}

function createSecurityDrivers(drivers, namespace) {
    var driver = drivers[namespace] = drivers[namespace] || {};

    driver.accessRestrictedArea = function () {
        return request.get.asPromise(env.url + "/services/restricted")
            .spread(function (res, body) {
                return res;
            });
    };

    driver.login = function (payload) {
        return request.post.asPromise(env.url + "/services/login", {json: payload})
            .spread(function (res, body) {
                return res;
            });
    };

    driver.logout = function () {
        return request.del.asPromise(env.url + "/services/logout")
            .spread(function (res, body) {
                return res;
            });
    };
}

function createCookiesDrivers(drivers, namespace) {
    var driver = drivers[namespace] = drivers[namespace] || {};
    driver.reset = function () {
        var j = request.jar();
        request = require("request").defaults({jar: j})
    }
}

function createDatabaseDrivers(drivers, namespace) {
    var driver = drivers[namespace] = drivers[namespace] || {};

    driver.createUser = function (privileges) {
        privileges = privileges || UserPrivileges.NORMAL_USER;
        var user = new User({
            email: "myemail@company.com",
            name: "Foo Bar",
            password: "mypass",
            company: new mongoose.Types.ObjectId(),
            privileges: privileges
        });

        return user.save.bind(user).asPromise()
            .then(function (results) {
                return results[0];
            })
    }
}

function createVotingDrivers(drivers, namespace) {
    var driver = drivers[namespace] = drivers[namespace] || {};
    driver.upvote = function (nodeId) {
        return request.post.asPromise(env.url + "/services/voting", {json: {type: 1, note: nodeId}})
            .spread(function (res, body) {
                return res;
            });
    };
    driver.downvote = function (nodeId) {
        return request.post.asPromise(env.url + "/services/voting", {json: {type: -1, note: nodeId}})
            .spread(function (res, body) {
                return res;
            });
    };
    driver.getUsersWhoVotedOn = function (noteId) {
        return request.get.asPromise(env.url + "/services/voting/note/" + noteId, {json: true})
            .spread(function (res, body) {
                return res;
            });
    };
    driver.getNotesVotedBy = function (userId) {
        return request.get.asPromise(env.url + "/services/voting/user/" + userId, {json: true})
            .spread(function (res, body) {
                return res;
            });
    };
}

function createNoteSearchingDrivers(drivers, namespace){
    var driver = drivers[namespace] = drivers[namespace] || {};
    driver.searchByGeo = function(location){
        return request.get.asPromise(env.url + "/services/note/location/"+location[0]+"/"+location[1], {json: true})
            .spread(function (res, body) {
                return res;
            });
    }
    driver.searchByUser = function(userId){
        return request.get.asPromise(env.url + "/services/note/user/"+userId, {json: true})
            .spread(function (res, body) {
                return res;
            });
    }
}


function createUserSearchingDrivers(drivers, namespace){
    var driver = drivers[namespace] = drivers[namespace] || {};
    driver.searchByCompany = function(company){
        return request.get.asPromise(env.url + "/services/user/company/:id", {json: true})
            .spread(function (res, body) {
                return res;
            });
    }
}




module.exports = drivers;