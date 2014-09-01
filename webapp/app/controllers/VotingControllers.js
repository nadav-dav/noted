var rek = require("rekuire");
var Vote = rek("Vote");
var Note = rek("Note");
var Q = require("q");
var Respond = rek("Respond");
var _ = require("lodash");
rek("asPromise");


function configVotingControllers(router){

    router.post("/services/voting", function(req, res){
        var data;
        makeSureUserIsLoggedIn(req, res)
            .then(getVoteDataFrom(req))
            .then(function(_data){
                data = _data;
                return Vote.findOne.bind(Vote).asPromise(({user: data.user, note: data.note}))
            })
            .then(function(result){
                if(result === null){
                    // IF THERE IS NO EXISTING VOTE
                    return addANewVote(data);
                } else if (result.type !== data.type) {
                    // IF THERE IS EXISTING VOTE
                    return changeExistingVote(data);
                }
            })
            .then(Respond.successfullyTo(res))
            .catch(Respond.failureTo(res))
    });

    router.get("/services/voting/note/:noteId", function(req, res){
        makeSureUserIsLoggedIn(req, res)
            .then(function(){
                var note = req.param("noteId");
                return Vote.find.bind(Vote).asPromise({note: note})
            })
            .then(function(results){
                return _.map(results, function(item){
                    return {
                        user: item.user,
                        type: item.type
                    }
                })
            })
            .then(Respond.successfullyTo(res))
            .catch(Respond.failureTo(res))
    });

    router.get("/services/voting/user/:userId", function(req, res){
        makeSureUserIsLoggedIn(req, res)
            .then(function(){
                var user = req.param("userId");
                return Vote.find.bind(Vote).asPromise({user: user})
            })
            .then(function(results){
                return _.map(results, function(item){
                    return {
                        note: item.note,
                        type: item.type
                    }
                })
            })
            .then(Respond.successfullyTo(res))
            .catch(Respond.failureTo(res))
    });

    function addANewVote(data){
        var vote = new Vote(data);
        return vote.save.bind(vote).asPromise()
            .then(function(){
                if (data.type == 1) {
                    return Note.update.bind(Note).asPromise({_id: data.note}, {$inc: {upvotes: 1}})
                } else {
                    return Note.update.bind(Note).asPromise({_id: data.note}, {$inc: {downvotes: 1}})
                }
            })
    }

    function changeExistingVote(data){
        return Vote.update.bind(Vote).asPromise({user: data.user, note: data.note}, {type: data.type})
            .then(function(){
                if (data.type === 1)
                    return Note.update.bind(Note).asPromise({_id: data.note}, {$inc: {upvotes:1, downvotes:-1}});
                else
                    return Note.update.bind(Note).asPromise({_id: data.note}, {$inc: {upvotes:-1, downvotes:1}});
            })
    }

    function makeSureUserIsLoggedIn(req, res){
        return Q()
            .then(function(){
                if(!req.session.user){
                    res.status(403).send();
                    throw new Error('')
                }
            })
            .fail(Respond.failureTo(res))
    }

    function getVoteDataFrom(req){
        return function(){
            return Q()
                .then(function(){
                    return {
                        note :req.body.note,
                        user : req.session.user._id,
                        type : req.body.type
                    }
                })
        }
    }
}

module.exports = {
    config: configVotingControllers
};