var rek = require("rekuire");
var User = rek("User");
var Q = require("q");
var Respond = rek("Respond");
var _ = require("lodash");


function configMainControllers(router){
	router.get('/', function  (req, res) {
        console.error("req.session.user",req.session.user);
	    res.render('index', {
            user: req.session.user
        });
	});
}

module.exports = {
    config: configMainControllers
};