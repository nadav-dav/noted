var rek = require("rekuire");
var drivers = rek("drivers");
var makeSure = rek("makeSureMatchers");
var mongoose = require("mongoose");
var ResetDatabase = rek("ResetDatabase");

describe("Login IT", function () {

    beforeEach(function(){
        drivers.cookies.reset();
        ResetDatabase();
    });

    it("Should be able to login", function (done) {
        drivers.user.create(user)
            .then(drivers.security.accessRestrictedArea)
            .then(makeSure.statusCodeIs(403))
            .then(function(){
                return drivers.security.login({
                    email   : user.email,
                    password: user.password
                })
            })
            .then(makeSure.statusCodeIs(200))
            .then(drivers.security.accessRestrictedArea)
            .then(makeSure.statusCodeIs(200))
            .then(function(){done()})
            .catch(done);
    });

    it("Should be able to logout", function (done) {
        drivers.user.create(user)
            .then(function(){
                return drivers.security.login({
                    email   : user.email,
                    password: user.password
                })
            })
            .then(makeSure.statusCodeIs(200))
            .then(drivers.security.accessRestrictedArea)
            .then(makeSure.statusCodeIs(200))
            .then(drivers.security.logout)
            .then(drivers.security.accessRestrictedArea)
            .then(makeSure.statusCodeIs(403))
            .then(function(){done()})
            .catch(done);
    });

    var user = {
        email   :   "myemail@company.com",
        name    :   "Foo Bar",
        password:   "mypass",
        company :   new mongoose.Types.ObjectId(),
        privileges: "super-user"
    }
});