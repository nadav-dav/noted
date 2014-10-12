var rek = require("rekuire");
var Company = rek("Company");
var User = rek("User");
var Note = rek("Note");
var Vote = rek("Vote");
var CrudApi = rek("CrudApi");
var UserPrivileges = rek("UserPrivileges");
var Promise = require('q').Promise;
var Dao = rek("Dao");
rek("asPromise");

function configServicesController(router){

    // ===========================================
    //  COMPANY CONTROLLER
    // ===========================================
    CrudApi.create(router, "/services/company", new Dao(Company), {
        preprocessInsertedData: function(data, session){
            return { name: data.name  }
        },
        securityHook: mustBeOwnerOrAtLeast(UserPrivileges.NOTED_STAFF)
    });



    // ===========================================
    //  USERS CONTROLLER
    // ===========================================
    CrudApi.create(router, "/services/user", new Dao(User), {
        preprocessInsertedData: function(payload, session){
            var toBeSaved =  {
                email   : payload.email,
                name    : payload.name,
                password: payload.password,
                company : payload.company,
                privileges: theLowerPrivilegesValueAmong(session, payload)
            };

            if (session.user.privileges >= UserPrivileges.NOTED_STAFF){
                toBeSaved.company = payload.company;
            } else {
                toBeSaved.company = session.user.company;
            }
            return toBeSaved;
        },
        securityHook: mustBeOwnerOrAtLeast(UserPrivileges.COMPANY_IT)
    });


    // ===========================================
    //  NOTES CONTROLLER
    // ===========================================
    CrudApi.create(router, "/services/note", new Dao(Note), {
        preprocessInsertedData: function(payload, session){
            return {
                user: editableOnlyByStaff(session, session.user._id, payload.user),
                email: editableOnlyByStaff(session, session.user.email, payload.user),
                company: editableOnlyByStaff(session, session.user.company, payload.company),
                location: payload.location,
                hint: payload.hint,
                text: payload.text
            }
        },
        securityHook: mustBeOwnerOrAtLeast(UserPrivileges.NORMAL_USER)
    });



    // ===========================================
    //  VOTES CONTROLLER
    // ===========================================
    CrudApi.create(router, "/services/vote", new Dao(Vote), {
        preprocessInsertedData: function(payload, session){
            return {
                user: editableOnlyByStaff(session, session.user._id, payload.user),
                note: payload.note,
                type: payload.type
            }
        },
        securityHook: mustBeOwnerOrAtLeast(UserPrivileges.NORMAL_USER)
    });
}

function mustBeOwnerOrAtLeast(requiredPrivileges){
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

function editableOnlyByStaff(session, valueFromSession, valueFromPayload){
    if (session.user.privileges === UserPrivileges.NOTED_STAFF){
        return valueFromPayload || valueFromSession;
    }else {
        return valueFromSession;
    }
}

function theLowerPrivilegesValueAmong(session, payload){
    if (session.user.privileges === UserPrivileges.NOTED_STAFF){
        return payload.privileges || session.user.privileges;
    }else {
        return Math.min(payload.privileges, session.user.privileges) || session.user.privileges;
    }
}

module.exports = {
    config: configServicesController
};