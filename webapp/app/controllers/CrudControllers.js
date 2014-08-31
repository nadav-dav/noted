var rek = require("rekuire");
var Company = rek("Company");
var User = rek("User");
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
}

module.exports = {
    config: configServicesController
};