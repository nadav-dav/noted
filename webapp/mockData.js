var rek = require("rekuire");
var User = rek("User");
var Company = rek("Company");
var UserPrivileges = rek("UserPrivileges");

var notedCompany = new Company({
    name: "Noted"
});
notedCompany.save(function(err,saved){
    var staff = new User({
        company :   saved._id,
        email   :   "admin@noted.com",
        name    :   "Noted staff",
        password:   "123",
        privileges: UserPrivileges.NOTED_STAFF
    });
    staff.save(function(err, saved){
        process.exit(0);
    });
});
