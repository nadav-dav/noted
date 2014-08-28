var rek = require("rekuire");
var request = require("request");
var Q = require("q");
var env = rek("ITEnvironment");


var drivers = {};
    drivers.company = {};
    drivers.company.create = function (payload){
        return Q.nfcall(request.post, env.url+"/services/company", {json: payload})
            .spread(function(res, body){
                return res;
            });
    };
    drivers.company.getCompanyById = function (id){
        return Q.nfcall(request.get, env.url+"/services/company/"+id, {json: true})
            .spread(function(res, body){
                return res;
            });
    };

module.exports = drivers;