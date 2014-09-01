var rek = require("rekuire");
var UserPrivileges = rek("UserPrivileges");

function createCrudApi (router, path, dao, options){
    options = options || {};
    var securityHook = options.securityHook;
    var preprocessInsertedData = options.preprocessInsertedData || function(p){return p};

    // CREATE
    router.post(path, function(req, res){
        securityHook(req, res)
            .fail(respondRejected(res))
            .then(function(){
                var payload = preprocessInsertedData(req.body, req.session);
                    payload = clearUndefinedValues(payload);
                return dao.save(payload)
            })
            .spread(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    // READ
    router.get(path+"/:id", function(req, res){
        var id = req.param("id");
        securityHook(req, res)
            .fail(respondRejected(res))
            .then(function(){
                return dao.findOne(id);
            })
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    //UPDATE
    router.put(path+"/:id", function(req, res){
        var id = req.param("id");
        dao.findOne(id)
            .then(function(item){
                return securityHook(req, res, item)
            })
            .fail(respondRejected(res))
            .then(function(){
                var payload = preprocessInsertedData(req.body, req.session);
                    payload = clearUndefinedValues(payload);
                    payload.dateUpdated = Date.now();
                return dao.update(id, payload)
            })
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    // DELETE
    router.delete(path+"/:id", function(req, res){
        var id = req.param("id");
        dao.findOne(id)
            .then(function(item){
                return securityHook(req, res, item)
            })
            .fail(respondRejected(res))
            .then(function(){
                return dao.remove(id);
            })
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    // HELPERS
    // ===========================================
    function respondSuccessfullyTo(res){
        return function(result){
            res.status(200).json(result);
        }
    }

    function respondFailureTo(res){
        return function(e){
            try{
                res.status(500).json({});
                console.error("ERROR:" + (e.stack || e));
            }catch(e){

            }
        }
    }

    function respondRejected(res){
        return function(){
            res.status(403).json({});
        }
    }

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