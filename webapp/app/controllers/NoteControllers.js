var rek = require("rekuire");
var Note = rek("Note");
var Q = require("q");
var Respond = rek("Respond");
var _ = require("lodash");


function configNoteControllers(router){

    router.get("/services/note/location/:lng/:lat", function(req, res){

        var lng     = req.param("lng");
        var lat     = req.param("lat")
        var company = req.session.user.company;
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


    router.get("/services/note/user/:id", function(req, res){
        var id = req.param("id");
        makeSureUserIsLoggedIn(req, res)
            .then(function(){
                return Note.find.bind(Note).asPromise({user: id})
            })
            .then(function(results){
                return results;
            })
            .then(Respond.successfullyTo(res))
            .catch(Respond.failureTo(res))
    });


    router.get("/services/note/company/:id", function(req, res){
        var id = req.param("id");
        makeSureUserIsLoggedIn(req, res)
            .then(function(){
                return Note.find.bind(Note).asPromise({company: id})
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
    config: configNoteControllers
};