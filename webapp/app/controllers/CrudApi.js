function createCrudApi (router, path, Model, options){
    options = options || {};
    preprocessInsertedData = options.preprocessInsertedData || function(p){return p};

    // CREATE
    router.post(path, function(req, res){
        var model = new Model(preprocessInsertedData(req.body));
        model.save.bind(model).asPromise()
            .spread(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    // READ
    router.get(path+"/:id", function(req, res){
        var id = req.param("id");
        Model.findOne.bind(Model).asPromise( {_id: id} )
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    //UPDATE
    router.put(path+"/:id", function(req, res){
        var id = req.param("id");
        var payload = preprocessInsertedData(req.body);
        payload.dateUpdated = Date.now();
        Model.update.bind(Model).asPromise({_id: id} , payload)
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    // DELETE
    router.delete(path+"/:id", function(req, res){
        var id = req.param("id");
        Model.remove.bind(Model).asPromise({_id: id})
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
            console.error(e.stack || e);
            res.status(500).json({});
        }
    }
    // ===========================================
}

module.exports = {
    create: createCrudApi
};