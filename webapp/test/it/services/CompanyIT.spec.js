var rek = require("rekuire");
var makeSure = rek("makeSureMatchers");
var companyDrivers = rek("drivers").company;
var assert = require("assert");

describe("CompanyIT", function () {
    var companyName = "myCompany";
    var companyId, dateCreated, dateUpdated;

    it("should be able to create and read a company", function (done) {

        companyDrivers.create("My Company")
            .then(makeSure.statusCodeIs(200))
            .then(makeSure.responseObjectContainsKey("_id"))
            .then(storeResponseInScope)
            .then(function () {
                return companyDrivers.getById(companyId);
            })
            .then(makeSure.statusCodeIs(200))
            .then(storeResponseInScope)
            .then(function(){
                assert.equal(companyName, "My Company");
            })
            .then(function(){done()})
            .catch(done);
    });

    it("should be able to edit a company data", function (done) {

        // Create
        companyDrivers.create("Some Company Name")
            .then(storeResponseInScope)
            .then(function (res) {
                assert.equal(dateCreated, dateUpdated);
            })

            // Assert
            .then(function () { return companyDrivers.getById(companyId); })
            .then(makeSure.statusCodeIs(200))
            .then(storeResponseInScope)
            .then(function(){
                assert.equal(companyName, "Some Company Name");
            })

            // Update
            .then(function(){return companyDrivers.update(companyId, {name:"Another Company Name"}); })
            .then(makeSure.statusCodeIs(200))

            // Assert
            .then(function () { return companyDrivers.getById(companyId); })
            .then(storeResponseInScope)
            .then(function(){
                assert.equal(companyName, "Another Company Name");
                assert.notEqual(dateCreated, dateUpdated);
            })
            .then(function(){done()})
            .catch(done);
    });


    it("should be able to delete a company", function (done) {

        // Create
        companyDrivers.create("Some Company Name")
            .then(function (res) { companyId = res.body._id; })

            // Assert
            .then(function () { return companyDrivers.getById(companyId); })
            .then(function(res){ assert.equal(res.body.name, "Some Company Name");})

            // DELETE
            .then(function(){return companyDrivers.delete(companyId); })

            // Assert
            .then(function () { return companyDrivers.getById(companyId); })
            .then(makeSure.statusCodeIs(200))
            .then(function(res){ assert.equal(res.body, null); })
            .then(function(){done()})
            .catch(done);
    });




    function storeResponseInScope(res){
        companyName = res.body.name;
        dateCreated = res.body.dateCreated;
        dateUpdated = res.body.dateUpdated;
        companyId = res.body._id;
    }
});