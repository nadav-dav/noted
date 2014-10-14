define("location", function () {
	return {
		getLocation: function(callback){
			navigator.geolocation.getCurrentPosition(function GetLocation(location) {
				    callback({
				    	lng: location.coords.longitude, 
				    	lat: location.coords.latitude
				    });
				});
		}
	}
})