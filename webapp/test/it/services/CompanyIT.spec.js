var rek = require("rekuire");
var makeSure = rek("makeSureMatchers");
var companyDrivers = rek("drivers").company;
var assert = require("assert");

describe("CompanyIT", function () {
    var companyId = "";
    var companyName = "myCompany";

    it("should be able to create and read a company", function (done) {

        companyDrivers.create(companyName)
            .then(makeSure.statusCodeIs(200))
            .then(makeSure.responseObjectContainsKey("_id"))
            .then(function (res) { companyId = res.body._id; })
            .then(function () {
                return companyDrivers.getById(companyId);
            })
            .then(makeSure.statusCodeIs(200))
            .then(function(res){
                var result = res.body;
                assert.equal(result._id, companyId);
                assert.equal(result.name, companyName);
            })
            .then(function(){done()})
            .catch(done);
    });

    it("should be able to edit a company data", function (done) {

        // Create
        companyDrivers.create("Some Company Name")
            .then(function (res) { companyId = res.body._id; })

            // Assert
            .then(function () { return companyDrivers.getById(companyId); })
            .then(function(res){ assert.equal(res.body.name, "Some Company Name");})

            // Update
            .then(function(){return companyDrivers.update(companyId, {name:"Another Company Name"}); })

            // Assert
            .then(function () { return companyDrivers.getById(companyId); })
            .then(function(res){ assert.equal(res.body.name, "Another Company Name"); })
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
            .then(function(res){ assert.equal(res.body, null); })
            .then(function(){done()})
            .catch(done);
    });
});