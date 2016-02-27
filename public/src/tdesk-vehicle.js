(function(global){
	'use strict';

	var FIREBASE_URL = "https://tdesk-track.firebaseio.com";
	
	function Vehicle(source, user){
		this.user = user;
		this.source = source;
		this.firebaseRef = new Firebase(FIREBASE_URL + '/' + source + '/' + user + '/');
	}

	Vehicle.prototype.position = function(latLng) {
		//var sourceRef = this.firebaseRef.push();

		this.firebaseRef.set(latLng);
	}

	if (typeof global.tdesk === 'undefined')
		global.tdesk = {};

	global.tdesk.Vehicle = Vehicle;
}(window));