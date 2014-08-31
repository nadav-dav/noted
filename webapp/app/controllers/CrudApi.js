var rek = require("rekuire");
var UserPrivileges = rek("UserPrivileges");

function createCrudApi (router, path, Model, options){
    options = options || {};
    var securityHook = options.securityHook;
    var preprocessInsertedData = options.preprocessInsertedData || function(p){return p};

    // CREATE
    router.post(path, function(req, res){
        securityHook(req, res)
            .fail(respondRejected(res))
            .then(function(){
                var payload = preprocessInsertedData(req.body);
                payload = clearUndefinedValues(payload);
                var model = new Model(payload);
                return model.save.bind(model).asPromise()
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
                return Model.findOne.bind(Model).asPromise({_id: id})
            })
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    //UPDATE
    router.put(path+"/:id", function(req, res){
        var id = req.param("id");
        Model.findOne.bind(Model).asPromise({_id: id})
            .then(function(item){
                return securityHook(req, res, item)
            })
            .fail(respondRejected(res))
            .then(function(){
                var payload = preprocessInsertedData(req.body);
                payload = clearUndefinedValues(payload);
                payload.dateUpdated = Date.now();
                return Model.update.bind(Model).asPromise({_id: id} , payload)
            })
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    // DELETE
    router.delete(path+"/:id", function(req, res){
        var id = req.param("id");
        Model.findOne.bind(Model).asPromise({_id: id})
            .then(function(item){
                return securityHook(req, res, item)
            })
            .fail(respondRejected(res))
            .then(function(){
                return Model.remove.bind(Model).asPromise({_id: id});
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

    function privilegesMustBeAtLeast(allowedPrivileges, req, res, fn){
        if (req.session.user && req.session.user.privileges >= allowedPrivileges){
            fn();
        } else {
            res.status(403).send();
        }
    }

    // ===========================================
}

module.exports = {
    create: createCrudApi
};