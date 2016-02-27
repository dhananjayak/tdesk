(function(global){
	'use strict';

	var FIREBASE_URL = "https://tdesk-track.firebaseio.com";

	var vehicles = {
		all: function(sourceLocation,  allPositionsCallback){
			var firebaseRef = new Firebase(FIREBASE_URL + '/' + sourceLocation + '/');

			firebaseRef.on('value', function(snapshot){
				allPositionsCallback(snapshot.val());
			})
		}
	}
	
	

	if (typeof global.tdesk === 'undefined')
		global.tdesk = {};

	global.tdesk.vehicles = vehicles;
}(window));