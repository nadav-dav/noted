var rek = require("rekuire");
var UserPrivileges = rek("UserPrivileges");
var Respond = rek("Respond");

function createCrudApi (router, path, dao, options){
    options = options || {};
    var securityHook = options.securityHook;
    var preprocessInsertedData = options.preprocessInsertedData || function(p){return p};

    // CREATE
    router.post(path, function(req, res){
        securityHook(req, res)
            .fail(Respond.rejectedTo(res))
            .then(function(){
                var payload = preprocessInsertedData(req.body, req.session);
                    payload = clearUndefinedValues(payload);
                return dao.save(payload)
            })
            .spread(Respond.successfullyTo(res))
            .catch(Respond.failureTo(res));
    });

    // READ
    router.get(path+"/:id", function(req, res){
        var id = req.param("id");
        securityHook(req, res)
            .fail(Respond.rejectedTo(res))
            .then(function(){
                return dao.findOne(id);
            })
            .then(Respond.successfullyTo(res))
            .catch(Respond.failureTo(res));
    });

    //UPDATE
    router.put(path+"/:id", function(req, res){
        var id = req.param("id");
        dao.findOne(id)
            .then(function(item){
                return securityHook(req, res, item)
            })
            .fail(Respond.rejectedTo(res))
            .then(function(){
                var payload = preprocessInsertedData(req.body, req.session);
                    payload = clearUndefinedValues(payload);
                    payload.dateUpdated = Date.now();
                return dao.update(id, payload)
            })
            .then(Respond.successfullyTo(res))
            .catch(Respond.failureTo(res));
    });

    // DELETE
    router.delete(path+"/:id", function(req, res){
        var id = req.param("id");
        dao.findOne(id)
            .then(function(item){
                return securityHook(req, res, item)
            })
            .fail(Respond.rejectedTo(res))
            .then(function(){
                return dao.remove(id);
            })
            .then(Respond.successfullyTo(res))
            .catch(Respond.failureTo(res));
    });

    // HELPERS
    // ===========================================

    function clearUndefinedValues(obj){
        var keys = Object.keys(obj);
        for( var i=0; i<keys.length; i++){
            var key = keys[i];
            if (obj[key] === undefined){
                delete obj[key];
            }
        }
        return obj;
    }

    // ===========================================
}

module.exports = {
    create: createCrudApi
};