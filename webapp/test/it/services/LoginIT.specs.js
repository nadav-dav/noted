var rek = require("rekuire");
var drivers = rek("drivers");
var makeSure = rek("makeSureMatchers");
var ResetDatabase = rek("ResetDatabase");

describe("Login IT", function () {

    var user;
    beforeEach(function(done){
        drivers.cookies.reset();
        ResetDatabase().then(done);
    });

    it("Should be able to login", function (done) {
        drivers.database.createUser()
            .then(storeUserInScope)
            .then(drivers.security.accessRestrictedArea)
            .then(makeSure.statusCodeIs(403))
            .then(loginAsUser)
            .then(makeSure.statusCodeIs(200))
            .then(drivers.security.accessRestrictedArea)
            .then(makeSure.statusCodeIs(200))
            .then(function(){done()})
            .catch(done);
    });

    it("Should be able to logout", function (done) {
        drivers.database.createUser()
            .then(storeUserInScope)
            .then(loginAsUser)
            .then(makeSure.statusCodeIs(200))
            .then(drivers.security.accessRestrictedArea)
            .then(makeSure.statusCodeIs(200))
            .then(drivers.security.logout)
            .then(drivers.security.accessRestrictedArea)
            .then(makeSure.statusCodeIs(403))
            .then(function(){done()})
            .catch(done);
    });

    function storeUserInScope(newUser){
        user = newUser;
    }

    function loginAsUser(){
        return drivers.security.login({
            email   : user.email,
            password: user.password
        })
    }
});