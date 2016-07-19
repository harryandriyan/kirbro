var kirbroAppCtrl = angular.module('kirbroAppCtrl', []);

kirbroAppCtrl.controller('HomeCtrl', function ($scope) {
	
});

kirbroAppCtrl.controller('FAQCtrl', function ($scope, $http) {
	$scope.getFAQ = function() {
		$scope.loading = "loading";
		$http.get(
			'server/faq'
		).success(function(response){
			$scope.faq = response.faq;
			$scope.loading = undefined;
		});
	}
	$scope.getFAQ();
});

kirbroAppCtrl.controller('PATCtrl', function ($scope, $http) {
	$scope.getPAT = function() {
		$scope.loading = "loading";
		$http.get(
			'server/pat'
		).success(function(response){
			$scope.pat = response.pat;
			$scope.loading = undefined;
		});
	}
	$scope.getPAT();
});

kirbroAppCtrl.controller('CopyrightCtrl', function ($scope, $http) {
	$scope.getCopyright = function() {
		$scope.loading = "loading";
		$http.get(
			'server/copyright'
		).success(function(response){
			$scope.copyright = response.copyright;
			$scope.loading = undefined;
		});
	}
	$scope.getCopyright();
});

kirbroAppCtrl.controller('VenuesCtrl', function ($scope, $http, $routeParams) {
	$scope.getVenues = function(lat,lng){
		$scope.loading = "loading";
		$http.get(
			'server/venues/explore/'+$routeParams.courier+'/'+lat+'/'+lng+''
		).success(function(response){
			$scope.venues = response.response.groups;
			$scope.courier = $routeParams.courier;
			$scope.loading = undefined;
		});
	}
	$scope.getUserLocationFunc = function(location) {
	    $scope.lat = location.coords.latitude;
	    $scope.lng = location.coords.longitude;
	    $scope.getVenues($scope.lat,$scope.lng)
	}
	$scope.getUserLocation = function () {
		navigator.geolocation.getCurrentPosition($scope.getUserLocationFunc);
	}
	$scope.getUserLocation();
});

kirbroAppCtrl.controller('VenueCtrl', function ($scope, $http, $routeParams) {
	$scope.getVenue = function(lat,lng) {
		$scope.loading = "loading";
		$http.get(
			'server/venue/'+$routeParams.venueid+''
		).success(function(response){
			$scope.venue = response.response.venue;
			$scope.loading = undefined;
			$scope.loadMap($scope.venue);
		});
	}
	$scope.loadMap = function (venue) {
		L.mapbox.accessToken = 'pk.eyJ1IjoiaGFycnlhbmRyaXlhbiIsImEiOiJwbGwyUjlRIn0.AcL2qL6fWTzaXNJNSFRu0g';
		var map = L.mapbox.map('map', 'mapbox.streets')
		    .setView([venue.location.lat, venue.location.lng], 16);

		L.mapbox.featureLayer({
		    // this feature is in the GeoJSON format: see geojson.org
		    // for the full specification
		    type: 'Feature',
		    geometry: {
		        type: 'Point',
		        // coordinates here are in longitude, latitude order because
		        // x, y is the standard for GeoJSON and many formats
		        coordinates: [
		          venue.location.lng,
		          venue.location.lat
		        ]
		    },
		    properties: {
		        title: venue.name,
		        description: venue.location.address+', '+venue.location.city+', '+venue.location.country,
		        // one can customize markers by adding simplestyle properties
		        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
		        'marker-size': 'large',
		        'marker-color': '#BE9A6B',
		        'marker-symbol': 'cafe'
		    }
		}).addTo(map);
	}
	$scope.getVenue();
});

kirbroAppCtrl.controller('CostCtrl', function ($scope, $http) {
	$scope.loading = undefined;
	$scope.checkCost = function(){
		$scope.loading = "loading";
		$http.get(
			'server/cost/'+$scope.origin+'/'+$scope.destination+'/'+$scope.weight+'/'+$scope.kurir
		).success(function(response){
			$scope.response = response;
			$scope.loading = undefined;
		});
	};
});

kirbroAppCtrl.controller('TrackCtrl', function ($scope, $http) {
	$scope.loading = undefined;
	$scope.dotrack = function(){
		$scope.loading = "loading";
		$http.get(
			'server/track/'+$scope.pengirim+'/'+$scope.resi
		).success(function(response){
			$scope.query = response.query;
			$scope.data = response.data.detail;
			$scope.riwayat = response.data.riwayat;
			$scope.loading = undefined;
		});
	};
});