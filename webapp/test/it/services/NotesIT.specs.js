var rek = require("rekuire");
var drivers = rek("drivers");
var ResetDatabase = rek("ResetDatabase");
var assert = require("assert");

describe("Notes IT", function () {

    var user;
    beforeEach(function(){
        drivers.cookies.reset();
        ResetDatabase()
    });

    it("should be able to return messages by location", function (done) {
        createAndLoginUser()
            .then(function(){return createANote(Holon, "holon");})
            .then(function(){return createANote(Haifa, "haifa");})
            .then(function(){return createANote(Natanya, "natanya");})
            .then(function(){return drivers.note.searchByGeo(TelAviv) })
            .then(function(res){
                var notes = res.body;
                assert(notes.length == 3);
                assert.equal(notes[0].text, "holon");
                assert.equal(notes[1].text, "natanya");
                assert.equal(notes[2].text, "haifa");
            })
            .then(function(){done()})
            .catch(done);
    });

    var TelAviv = [32.0878802,34.797246];
    var Holon = [32.0625706,34.8116656];
    var Haifa = [32.752391,35.0227914];
    var Natanya = [32.3178786,34.9271507];


    function createAndLoginUser(){
        return drivers.database.createUser()
            .then(function(_user){
                user = _user;
                return drivers.security.login({
                    email   : user.email,
                    password: user.password
                })
            })
    }

    function createANote(location, content){
        content = content || "content";
        return drivers.note.create({
            text    :   content,
            location:   location
        })
    }
});