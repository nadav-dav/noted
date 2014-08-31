var rek = require("rekuire");
var drivers = rek("drivers");
var CrudIT = rek("CrudIT");
var mongoose = require("mongoose");
var UserPrivileges = rek("UserPrivileges");



CrudIT('Company CRUD IT', drivers.company, {
    create: {
        name: "My Company"
    },
    update: {
        name: "Another Company"
    },
    userPrivileges: UserPrivileges.NOTED_STAFF
});

CrudIT('User CRUD IT', drivers.user, {
    create: {
        email   :   "myemail@company.com",
        name    :   "Foo Bar",
        password:   "mypass",
        company :   new mongoose.Types.ObjectId(),
        privileges: UserPrivileges.NORMAL_USER
    },
    update: {
        email   :   "anotheremail@company.com",
        name    :   "Boo Far",
        password:   "my-new-pass"
    },
    userPrivileges: UserPrivileges.COMPANY_IT
});


CrudIT('Note CRUD IT', drivers.note, {
    create: {
        user    :   new mongoose.Types.ObjectId(),
        company :   new mongoose.Types.ObjectId(),
        hint    :   "somewhere",
        text    :   "CONTENT",
        location:   [1,-1]
    },
    update: {
        hint    :   "another hint",
        text    :   "NEW CONTENT",
        location:   [2,-2],
        upvotes :   10,
        downvotes:  20
    },
    userPrivileges: UserPrivileges.COMPANY_IT
});

CrudIT('Vote CRUD IT', drivers.vote, {
    create: {
        user    :   new mongoose.Types.ObjectId(),
        note    :   new mongoose.Types.ObjectId(),
        type    :   1
    },
    update: {
        type    :   -1
    },
    userPrivileges: UserPrivileges.COMPANY_IT
});