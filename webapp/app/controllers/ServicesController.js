var rek = require("rekuire");
var Company = rek("Company");
var Q = require("q");
var ObjectId = require("mongoose").Schema.ObjectId;

function configServicesController(router){

    router.post("/services/company", function(req, res){
        var company = new Company({
            name: req.body.name
        });
        Q.nfcall(company.save.bind(company))
            .spread(respondSuccessfullyTo(res))
            .catch(respondFailureTo(res));
    });

    router.get("/services/company/:id", function(req, res){
        var id = req.param("id");
        Q.nfcall(Company.findOne.bind(Company), {_id: id} )
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

    router.get("/services/company/:id", function(req, res){
        var id = req.param('id');
        Q.nfcall(Company.findOne, {id: id})
            .then(function(result){
                res.status(200).json(result);
            })
            .catch(function(){
                res.status(500).json({});
            })

    });
}

module.exports = {
    config: configServicesController
};