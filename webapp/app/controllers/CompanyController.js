var rek = require("rekuire");
var Company = rek("Company");
var Q = require("q");


function crud (router, path, Model, options){
    options = options || {};
    creationHook = options.creationHook || function(p){return p};
    updateHook = options.updateHook || function(p){return p};

    // CREATE
    router.post(path, function(req, res){
        var model = new Model(creationHook(req.body));
        Q.nfcall(model.save.bind(model))
            .spread(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    // READ
    router.get(path+"/:id", function(req, res){
        var id = req.param("id");
        Q.nfcall(Model.findOne.bind(Model), {_id: id} )
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    //UPDATE
    router.put(path+"/:id", function(req, res){
        var id = req.param("id");
        Q.nfcall(Model.update.bind(Model), {_id: id} , updateHook(req.body))
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    // DELETE
    router.delete(path+"/:id", function(req, res){
        var id = req.param("id");
        Q.nfcall(Model.remove.bind(Model), {_id: id})
            .then(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });


    function respondSuccessfullyTo(res){
        return function(result){
            res.status(200).json(result);
        }
    }

    function respondFailureTo(res){
        return function(e){
            console.error(e.stack);
            res.status(500).json({});
        }
    }
}


function configServicesController(router){
    crud(router, "/services/company", Company);
}

module.exports = {
    config: configServicesController
};