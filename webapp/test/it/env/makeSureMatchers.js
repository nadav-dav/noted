var rek = require("rekuire");
var match = rek("responseMatchers");
var assert = require("assert");

var makeSure = {};
makeSure.statusCodeIs = function (expectedStatusCode) {
    return function (res) {
        match(res).haveStatusCode(expectedStatusCode);
        return res;
    }
};

makeSure.hasTemporaryRedirectTo = function (url) {
    return function (res) {
        match(res).hasTemporaryRedirectTo(url);
        return res;
    }
};

makeSure.haveCookie = function (cookieName, expectedCookieValue) {
    return function (res) {
        match(res).hasCookie(cookieName, expectedCookieValue);
        return res;
    }
};

makeSure.responseBodyIs = function(expectedBody){
    return function(res){
        if (typeof expectedBody === "function"){
            expectedBody = expectedBody();
        }
        var prettyExpected = JSON.stringify(expectedBody, null, 2);
        var prettyBody = JSON.stringify(res.body, null, 2);
        assert.deepEqual(res.body, expectedBody, "Body expected to be: \n"+prettyExpected+"\nBut got: \n"+prettyBody);
        return res;
    }
};

makeSure.responseObjectContainsKey = function(expectedKey){
    return function(res){
        var obj = res.body;
        if (typeof res === "string"){
            try {
                obj = JSON.parse(res.body);
            } catch(e) {
                assert.fail("Can't parse response body");
            }
        }


        assert(obj[expectedKey] !== undefined, "Body response expected to have key ['"+expectedKey+"']");
        return res;
    }
};

makeSure.responseBodyContains = function(expectedBody){
    return function(res){
        var found = res.body.indexOf(expectedBody) !== -1;
        assert(found,"Expected request body to contain \""+expectedBody+"\",\n but not found in: \n"+res.body);
        return res;
    }
};


module.exports = makeSure;