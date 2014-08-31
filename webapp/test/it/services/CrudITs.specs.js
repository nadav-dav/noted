var rek = require("rekuire");
var drivers = rek("drivers");
var CrudIT = rek("CrudIT");
var mongoose = require("mongoose");



CrudIT('Company IT', drivers.company, {
    create: {
        name: "My Company"
    },
    update: {
        name: "Another Company"
    }
});

CrudIT('User IT', drivers.user, {
    create: {
        email   :   "myemail@company.com",
        name    :   "Foo Bar",
        password:   "mypass",
        company :   new mongoose.Types.ObjectId(),
        privileges: "super-user"
    },
    update: {
        email   :   "anotheremail@company.com",
        name    :   "Boo Far",
        password:   "my-new-pass"
    }
});