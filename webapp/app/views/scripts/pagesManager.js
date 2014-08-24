define("pagesManager", ['jquery'], function($){
	function PagesManager(){
		this.pages = $("page");
	};

	PagesManager.prototype.hideAll = function hideAll (pageName) {
		this.pages.css("display","none");
	}

	PagesManager.prototype.show = function show (pageName) {
		var page = $("#"+pageName);
		if (page.length === 0) throw new Error("Can't find a page named "+pageName);
		this.hideAll();
		page.css("display","block");		
	}

	return new PagesManager();
});