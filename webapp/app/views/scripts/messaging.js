define("messaging",['location','gravatar'], function (location, gravatar, pagesManager) {
	return {
		updateMessages: function(model, specificLocation){
			if (specificLocation) {
				getMessages(specificLocation);
			}else {
				location.getLocation(function (currentLocation) {
					getMessages(currentLocation);
				})	
			}

			function getMessages (location) {
				$.get("/services/note/location/"+location.lng+"/"+location.lat, function (data) {
					model.messages.removeAll()
					data.reverse().forEach(function (msg) {
						model.messages.push({
							_id: msg._id,
							author: {
								image: gravatar(msg.email)
							},
							hint: 		msg.hint,
							shortMsg: 	trimString(msg.text, 100),
							text: 		msg.text,
							lng: 		msg.location[1],
							lat: 		msg.location[0]
						})
					})
				});

				function trimString (str, len){
				  return (str.length > len) 
				    ? jQuery.trim(str).substring(0, len).split(" ").slice(0, -1).join(" ") + "..."
				    : str;
				};
			}
		},
		openMessage: function (model, id){
			$.get("/services/note/"+id, function (msg) {
				$.get("/services/user/"+msg.user, function (user) {
					$.get("/services/voting/note/"+id, function (voters) {
						var vote = getVotingType();
						var selected = model.selected_message;
							selected.id(msg._id);
							selected.author.name(user.name);
							selected.author.image(gravatar(user.email));
							selected.hint(msg.hint);
							selected.text(msg.text);
							selected.lat(msg.location[0]);
							selected.lng(msg.location[1]);
							selected.isUpvoted(vote == 1);
							selected.isDownvoted(vote == -1);
							selected.upvoteCount(msg.upvotes);
				            selected.downvoteCount(msg.downvotes);				            
				            model.showPage("showMessagePage");
				        function getVotingType () {
				        	var res = 0;
				        	voters.forEach(function(vote){
				        		if (vote.user === user._id) res = vote.type;
				        	})
				        	return res;
				        }
			        });
				})
			})
		},
		createNewMessage: function(model){
			var selected = model.selected_message;
			location.getLocation(function (currentLocation) {
				selected.lat(currentLocation.lat);
				selected.lng(currentLocation.lng);
			})	
			model.showPage('createMessagePage');
		}
	}
})