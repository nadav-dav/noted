var rek = require("rekuire");
var Company = rek("Company");
var CrudApi = rek("CrudApi");
rek("asPromise");

function configServicesController(router){
    CrudApi.create(router, "/services/company", Company, {
        preprocessInsertedData: function(data){
            return { name: data.name  }
        }
    });
}

module.exports = {
    config: configServicesController
};