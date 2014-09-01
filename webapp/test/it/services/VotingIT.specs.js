var rek = require("rekuire");
var drivers = rek("drivers");
var makeSure = rek("makeSureMatchers");
var ResetDatabase = rek("ResetDatabase");
var assert = require("assert");

describe("Voting IT", function () {

    var user, note;
    beforeEach(function(){
        drivers.cookies.reset();
        ResetDatabase();
    });

    it("should be able to vote for a note, and get messages", function (done) {
        createAUserAndANote()
            .then(function(){ return drivers.voting.upvote(note._id) })

            .then(function(){ return drivers.voting.getUsersWhoVotedOn(note._id)})
            .then(function(res){
                var votes = res.body;
                assert(votes.length == 1);
                assert.equal(votes[0].user, user._id);
                assert.equal(votes[0].type, 1);
            })

            .then(function(){ return drivers.voting.getNotesVotedBy(user._id)})
            .then(function(res){
                var votes = res.body;
                assert(votes.length == 1);
                assert.equal(votes[0].note, note._id);
                assert.equal(votes[0].type, 1);
            })

            .then(function(){ return drivers.note.getById(note._id)})
            .then(function(res){
                var note = res.body;
                assert(note.downvotes === 0);
                assert(note.upvotes === 1);
            })

            .then(function(){done()})
            .catch(done);
    });


    it("should be able upvote and downvote", function (done) {
        createAUserAndANote()
            .then(function(){ return drivers.voting.upvote(note._id) })
            .then(function(){ return drivers.voting.downvote(note._id) })

            .then(function(){ return drivers.voting.getUsersWhoVotedOn(note._id)})
            .then(function(res){
                var votes = res.body;
                assert(votes.length == 1);
            })

            .then(function(){ return drivers.voting.getNotesVotedBy(user._id)})
            .then(function(res){
                var votes = res.body;
                assert(votes.length == 1);
            })

            .then(function(){ return drivers.note.getById(note._id)})
            .then(function(res){
                var note = res.body;
                assert(note.downvotes === 1);
                assert(note.upvotes === 0);
            })

            .then(function(){done()})
            .catch(done);
    });

    function createAUserAndANote(){
        return drivers.database.createUser()
            .then(function(_user){
                user = _user;
                return drivers.security.login({
                    email   : user.email,
                    password: user.password
                })
            })
            .then(function(){
                return drivers.note.create({
                    text    :   "note content",
                    location:   [1,-1]
                })
            })
            .then(function(res){
                note = res.body;
            })
    }
});