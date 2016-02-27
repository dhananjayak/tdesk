(function(global){
	'use strict';

	var FIREBASE_URL = "https://tdesk-track.firebaseio.com";
	var FIREBASE_VEHCL_PATH_URL = "https://tdesk-vehcl-path.firebaseio.com";
	
	function Vehicle(source, user){
		this.user = user;
		this.source = source;
		this.firebaseRef = new Firebase(FIREBASE_URL + '/' + source + '/' + user + '/');
		this.firebaseVehiclePathRef = new Firebase(FIREBASE_VEHCL_PATH_URL + '/' + source + '/' + user + '/');
	}

	Vehicle.prototype.position = function(latLng) {
		//var sourceRef = this.firebaseRef.push();
		var vehiclePathRef = this.firebaseVehiclePathRef.push();

		vehiclePathRef.set({latLng:latLng, locatedOn:(new Date()).toString()}, function(err){
			console.log(err);
		});

		this.firebaseRef.set(latLng);


	}

	if (typeof global.tdesk === 'undefined')
		global.tdesk = {};

	global.tdesk.Vehicle = Vehicle;
}(window));