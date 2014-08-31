var rek = require("rekuire");
var Company = rek("Company");
var User = rek("User");
var Note = rek("Note");
var Vote = rek("Vote");
var CrudApi = rek("CrudApi");
rek("asPromise");

function configServicesController(router){
    CrudApi.create(router, "/services/company", Company, {
        preprocessInsertedData: function(data){
            return { name: data.name  }
        }
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
        }
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
        }
    });

    CrudApi.create(router, "/services/vote", Vote, {
        preprocessInsertedData: function(data){
            return {
                user: data.user,
                note: data.note,
                type: data.type
            }
        }
    });
}

module.exports = {
    config: configServicesController
};