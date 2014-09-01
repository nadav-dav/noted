var rek = require("rekuire");
var makeSure = rek("makeSureMatchers");
var assert = require("assert");
var ResetDatabase = rek("ResetDatabase");
var drivers = rek("drivers");
var UserPrivileges = rek("UserPrivileges");

function testCRUD(testName, driver, data){
    var creationData = data.create;
    var updateData = data.update;
    var privileges = data.userPrivileges;

    describe(testName, function () {
        beforeEach(function(done){
            drivers.cookies.reset();
            ResetDatabase().then(done);
        });

        // =======================
        //  CREATE AND READ TEST
        // =======================


        it(testName+": create and read", function (done) {
            createdAndLoginUserWith(privileges)
                .then(function(){ return driver.create(creationData) })
                .then(makeSure.statusCodeIs(200))
                .then(makeSure.responseObjectContainsKey("_id"))
                .then(storeResponseInScope)
                .then(getDocumentById)
                .then(makeSure.statusCodeIs(200))
                .then(storeResponseInScope)
                .then(assertDataContains(creationData))
                .then(function(){done()})
                .catch(done);
        });

        it(testName+": create and read without privileges", function (done) {
            createdAndLoginUserWith(UserPrivileges.lowerThan(privileges))
                .then(function(){ return driver.create(creationData) })
                .then(makeSure.statusCodeIs(403))
                .then(function(){done()})
                .catch(done);
        });




        // =======================
        //  EDIT TEST
        // =======================

        it(testName+": edit", function (done) {

            // Create
            createdAndLoginUserWith(privileges)
                .then(function(){ return driver.create(creationData) })
                .then(storeResponseInScope)
                .then(function (res) {
                    if (data.dateCreated && data.dateUpdated)
                        assert.equal(data.dateCreated, data.dateUpdated);
                })

                // Assert
                .then(getDocumentById)
                .then(makeSure.statusCodeIs(200))
                .then(storeResponseInScope)
                .then(assertDataContains(creationData))

                // Update
                .then(function(){return driver.update(id, updateData)})
                .then(makeSure.statusCodeIs(200))

                // Assert
                .then(getDocumentById)
                .then(storeResponseInScope)
                .then(assertDataContains(updateData))
                .then(function(){
                    if (data.dateCreated && data.dateUpdated)
                        assert.notEqual(data.dateCreated, data.dateUpdated);
                })
                .then(function(){done()})
                .catch(done);
        });


        // =======================
        //  DELETE TEST
        // =======================

        it(testName+": delete", function (done) {

            // Create
            createdAndLoginUserWith(privileges)
                .then(function(){ return driver.create(creationData) })
                .then(storeResponseInScope)

                // Assert
                .then(getDocumentById)
                .then(assertDataContains(creationData))

                // DELETE
                .then(function(){return driver.delete(id); })
                .then(makeSure.statusCodeIs(200))

                // Assert
                .then(getDocumentById)
                .then(assertDeleted)
                .then(function(){done()})
                .catch(done);
        });

        var data, id;
        function storeResponseInScope(res){
            data = res.body;
            id = res.body._id;
        }

        function assertDataContains(dataToCheck){
            return function(){
                var keys = Object.keys(dataToCheck);
                for(var i=0; i<keys.length; i++){
                    var key = keys[i];
                    var value = data[key];
                    if (typeof value === 'object'){
                        assert.deepEqual(data[key], dataToCheck[key], "Failed to assert field "+key);
                    }else {
                        assert.equal(data[key], dataToCheck[key], "Failed to assert field "+key+"\n"+data[key]+" != "+dataToCheck[key]);
                    }

                }
            }
        }

        function assertDeleted(res){
            assert.equal(res.body, null);
        }

        function getDocumentById() {
            return driver.getById(id);
        }

        function createdAndLoginUserWith(privileges){
            var user;
            return drivers.database.createUser(privileges)
                .then(function(newUser){
                    user = newUser;
                    console.log("LOGIN")
                    return drivers.security.login({email: user.email, password: user.password})
                })
                .then(function(){
                    return user;
                })
        }
    });
}

module.exports = testCRUD;