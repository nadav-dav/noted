var rek = require("rekuire");
var makeSure = rek("makeSureMatchers");
var assert = require("assert");
var MongoConnection = rek("MongoConnection");

function testCRUD(testName, driver, data){
    var creationData = data.create;
    var updateData = data.update;
    if (!creationData || !updateData) throw new Error("Missing data");

    describe(testName, function () {
        beforeEach(function(){
            MongoConnection.connection.db.dropDatabase();
        });
        it(testName+": create and read", function (done) {

            driver.create(creationData)
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

        it(testName+": edit", function (done) {

            // Create
            driver.create(creationData)
                .then(storeResponseInScope)
                .then(function (res) {
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
                    assert.notEqual(data.dateCreated, data.dateUpdated);
                })
                .then(function(){done()})
                .catch(done);
        });


        it(testName+": delete", function (done) {

            // Create
            driver.create(creationData)
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
                    assert.equal(data[key], dataToCheck[key]);
                }
            }
        }

        function assertDeleted(res){
            assert.equal(res.body, null);
        }

        function getDocumentById() {
            return driver.getById(id);
        }
    });
}

module.exports = testCRUD;