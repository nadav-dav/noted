var rek = require("rekuire");
var Company = rek("Company");
var User = rek("User");
var Note = rek("Note");
var Vote = rek("Vote");
var CrudApi = rek("CrudApi");
var UserPrivileges = rek("UserPrivileges");
var Promise = require('q').Promise;
rek("asPromise");

function configServicesController(router){
    CrudApi.create(router, "/services/company", Company, {
        preprocessInsertedData: function(data){
            return { name: data.name  }
        },
        securityHook: mustBeOwnerOr(UserPrivileges.NOTED_STAFF)
    });

    CrudApi.create(router, "/services/user", User, {
        preprocessInsertedData: function(data){
            return {
                email: data.email,
                name: data.name,
                password: data.password,
                company: data.company,
                privileges: data.privileges
            }
        },
        securityHook: mustBeOwnerOr(UserPrivileges.COMPANY_IT)
    });


    CrudApi.create(router, "/services/note", Note, {
        preprocessInsertedData: function(data){
            return {
                user: data.user,
                company: data.company,
                upvotes: data.upvotes,
                downvotes: data.downvotes,
                location: data.location,
                hint: data.hint,
                text: data.text
            }
        },
        securityHook: mustBeOwnerOr(UserPrivileges.COMPANY_IT)
    });

    CrudApi.create(router, "/services/vote", Vote, {
        preprocessInsertedData: function(data){
            return {
                user: data.user,
                note: data.note,
                type: data.type
            }
        },
        securityHook: mustBeOwnerOr(UserPrivileges.COMPANY_IT)
    });
}

function mustBeOwnerOr(requiredPrivileges){
    return function(req, res, item){
        return new Promise(function(resolve, reject){
            if (item && req.session.user && item.user == req.session.user._id){
                return resolve();
            }
            if (req.session.user && req.session.user.privileges >= requiredPrivileges){
                return resolve();
            }
            return reject();
        });
    }
}

module.exports = {
    config: configServicesController
};