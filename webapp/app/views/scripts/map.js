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
		return map;
	}
})