var rek = require("rekuire");
var User = rek("User");
rek("asPromise");

function configSecurityControllers(router){

    router.get("/services/restricted", function(req, res){
        if (req.session.user){
            res.status(200).send();
        } else {
            res.status(403).send();
        }
    });

    router.post("/services/login", function(req, res){
        var email = req.body.email;
        var password = req.body.password;

        User.find({email: email, password: password}, function(err, results){
            if (err){
                res.status(403).send();
            } else if (results && results.length === 1){
                req.session.user = results[0];
                req.session.dateCreated = Date.now();
                res.status(200).send()
            }else {
                res.status(403).send();
            }
        });
    });

    router.delete("/services/logout", function(req, res){
        if (req.session.user){
            delete req.session.user;
            delete req.session.dateCreated;
        }
        res.status(200).send();
    });
}

module.exports = {
    config: configSecurityControllers
};