define("voting",["user"], function (user) {
	function vote(model, type){
		$.post("/services/voting",{type: type, note: model.selected_message.id()})
	}

	return {
		upvote: function(model){
			var msg = model.selected_message;
			if(msg.isUpvoted() === false){
				vote(model, +1)
				msg.isUpvoted(true);
				msg.upvoteCount(msg.upvoteCount()+1);
				if (msg.isDownvoted()){
					msg.isDownvoted(false);
					msg.downvoteCount( msg.downvoteCount() - 1 );
				}
			}else {
				msg.isUpvoted(false);
				msg.upvoteCount(msg.upvoteCount()-1);
			}
		},
		downvote: function(model){
			var msg = model.selected_message;
			if(msg.isDownvoted() === false){
				vote(model, -1)
				msg.isDownvoted(true);
				msg.downvoteCount(msg.downvoteCount()+1)
				if (msg.isUpvoted()){
					msg.isUpvoted(false);
					msg.upvoteCount(msg.upvoteCount() - 1);
				}
			}
		}
	}
})