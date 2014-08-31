var rek = require("rekuire");
var drivers = rek("drivers");
var makeSure = rek("makeSureMatchers");
var ResetDatabase = rek("ResetDatabase");

describe("Login IT", function () {

    var user;
    beforeEach(function(){
        drivers.cookies.reset();
        ResetDatabase();
    });

    it("Should be able to login", function (done) {
        drivers.database.createUser()
            .then(function(newUser){
                user = newUser;
            })
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
        drivers.database.createUser()
            .then(function(newUser){
                user = newUser;
            })
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
});