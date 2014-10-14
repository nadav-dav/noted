define("pagesManager",['jquery'], function ($) {
	var pages = $("page");
	return {
		hideAll: function(model){
			pages.css("display","none");
		},
		show: function(model, pageName){
			var page = $("#"+pageName);
			if (page.length === 0) throw new Error("Can't find a page named "+pageName);
			this.hideAll();
			page.css("display","block");	

			model.header_logout(false);
			model.header_back(false);
			switch(pageName){
				case "messagesPage": model.header_logout(true); break;
				case "createMessagePage":
				case "showMessagePage":
					model.header_back(true);
			}	
		}
	}
})