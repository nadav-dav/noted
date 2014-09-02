var rek = require("rekuire");
var User = rek("User");
var Q = require("q");
var Respond = rek("Respond");
var _ = require("lodash");


function configUserControllers(router){

    router.get("/services/user/company/:id", function(req, res){
        var companyId = req.param("id");
        makeSureUserIsLoggedIn(req, res)
            .then(function(){
                return User.find.bind(User).asPromise({company: companyId})
            })
            .then(function(results){
                return _.map(results,function(user){
                    return {
                        email:      user.email,
                        name:       user.name,
                        _id :       user._id,
                        privileges: user.privileges
                    }
                });

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
    config: configUserControllers
};