define("voting", function () {
	return {
		upvote: function(model){
			var msg = model.selected_message;
			if(msg.isUpvoted() === false){
				msg.isUpvoted(true);
				msg.upvoteCount(msg.upvoteCount()+1);
				if (msg.isDownvoted()){
					msg.isDownvoted(false);
					msg.downvoteCount( msg.downvoteCount() - 1 );
				}
			}
		},
		downvote: function(model){
			var msg = model.selected_message;
			if(msg.isDownvoted() === false){
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