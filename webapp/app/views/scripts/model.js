define("model", ['ko', 'jquery', 'voting'], function (ko, $, voting) {
    var model = {
        header_title: ko.observable("Noted"),
        header_logout: ko.observable(false),
        header_back: ko.observable(false),
        messages: ko.observableArray([]),
        selected_message: {
            author: {
                name: ko.observable(""),
                image: ko.observable("http://www.gravatar.com/avatar/91028d05ccc7d53a8d765930637b4886")
            },
            hint: ko.observable(""),
            text: ko.observable(""),
            lng: ko.observable(1),
            lat: ko.observable(1),
            isUpvoted: ko.observable(false),
            isDownvoted: ko.observable(true),
            upvoteCount: ko.observable(0),
            downvoteCount: ko.observable(1)
        },
        upvote: function(){ voting.upvote(this); },
        downvote: function(){ voting.downvote(this); },
    };

    ko.applyBindings(model);
    return model;
});
