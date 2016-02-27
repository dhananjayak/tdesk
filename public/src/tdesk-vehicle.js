(function(global){
	'use strict';

	var FIREBASE_URL = "https://tdesk-track.firebaseio.com";
	var FIREBASE_VEHCL_PATH_URL = "https://tdesk-vehcl-path.firebaseio.com";
	
	function Vehicle(source, user, number){
		this.user = user;
		this.source = source;
		this.number = number;
		this.firebaseRef = new Firebase(FIREBASE_URL + '/' + source + '/' + user + '/');
		this.firebaseVehiclePathRef = new Firebase(FIREBASE_VEHCL_PATH_URL + '/' + source + '/' + user + '/');
	}

	Vehicle.prototype.position = function(latLng) {
		//var sourceRef = this.firebaseRef.push();
		var vehiclePathRef = this.firebaseVehiclePathRef.push();

		vehiclePathRef.set({latLng:latLng, locatedOn:(new Date()).toString(), name:this.user, vehicleNumber:this.number}, function(err){
			console.log(err);
		});

		this.firebaseRef.set({lat:latLng.lat, lng:latLng.lng, name:this.user, vehicleNumber:this.number});
	}

	if (typeof global.tdesk === 'undefined')
		global.tdesk = {};

	global.tdesk.Vehicle = Vehicle;
}(window));