var rek = require("rekuire");
var Note = rek("Note");
var Q = require("q");
var Respond = rek("Respond");
var _ = require("lodash");


function configLocationControllers(router){

    router.post("/services/note/location", function(req, res){

        var lng     = req.body.location[0];
        var lat     = req.body.location[1];
        var company = req.body.company;
        makeSureUserIsLoggedIn(req, res)
            .then(function(){
                return Note.find.bind(Note).asPromise(
                    {company: company, location: { $near : [lng, lat], $maxDistance: 30 }},
                    null,
                    {limit:10}
                )
            })
            .then(function(results){
                return results;
            })
            .then(Respond.successfullyTo(res))
            .catch(Respond.failureTo(res))
    });


    function makeSureUserIsLoggedIn(req, res){
        return Q()
            .then(function(){
                if(!req.session.user){
                    res.status(403).send();
                    throw new Error('')
                }
            })
            .fail(Respond.failureTo(res))
    }
}

module.exports = {
    config: configLocationControllers
};