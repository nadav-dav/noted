var rek = require("rekuire");
var makeSure = rek("makeSureMatchers");
var companyDrivers = rek("drivers").company;
var assert = require("assert");
var Q = require("Q");

Q.fcall

describe("CompanyIT", function () {
    it("should add a company", function (done) {
        var companyId = "";
        var companyName = "myCompany";
        var companyData = {
            name: companyName
        };

        companyDrivers.create(companyData)
            .then(makeSure.statusCodeIs(200))
            .then(makeSure.responseObjectContainsKey("_id"))
            .then(function (res) { companyId = res.body._id; })
            .then(function () {
                return companyDrivers.getCompanyById(companyId);
            })
            .then(makeSure.statusCodeIs(200))
            .then(function(res){
                var result = res.body;
                assert.equal(result._id, companyId);
                assert.equal(result.name, companyName);
            })
            .then(function(){done()})
            .catch(done)
    });
});

function call(){
    var fn = arguments[0];
    var args = Array.prototype.slice.call(arguments).splice(1);
    return function(){
        return fn.call(fn, args);
    }
}

