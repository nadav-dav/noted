define("map", [], function () {
	return function setMap(container){
		var mapOptions = {
			center: new google.maps.LatLng(32.0734263,34.7826977),
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			styles: [{"featureType":"landscape","stylers":[{"hue":"#FFA800"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#53FF00"},{"saturation":-73},{"lightness":40},{"gamma":1}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","stylers":[{"hue":"#FBFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00FFFD"},{"saturation":0},{"lightness":30},{"gamma":1}]},{"featureType":"water","stylers":[{"color":"#1BA38E"},{"lightness":13}]},{"featureType":"poi","stylers":[{"saturation":0}]}]
		};
		var map = new google.maps.Map(document.getElementById(container),mapOptions);
		var positionMarker = new google.maps.Marker({
		    position: new google.maps.LatLng(0,0),
		    map: map,
		    icon: "/assets/images/here.png"
		});

		// this fixes the cut-off bug in google maps api
		google.maps.event.addListener(map, 'idle', function() {
		    google.maps.event.trigger(map, 'resize');
		});

		function getLocation(callback){
			navigator.geolocation.getCurrentPosition(function GetLocation(location) {
			    callback({
			    	lng: location.coords.longitude, 
			    	lat: location.coords.latitude
			    });
			});
		};

		setInterval(function () {
			getLocation(function (location) {
				positionMarker.setPosition(new google.maps.LatLng(location.lat, location.lng));
				// this fixes the cut-off bug in google maps api
				google.maps.event.trigger(map, 'idle');
			})						
		}, 1000);
		return map;
	}
})