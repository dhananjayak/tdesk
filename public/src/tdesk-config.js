
(function(global){
	'use strict';

	var FIREBASE_URL = "https://tdesk-config.firebaseio.com/tdesk-config";
	var firebaseRef = new Firebase("https://tdesk-config.firebaseio.com/tdesk-config");

	var config = {
		set: function(value){
			firebaseRef.set(value, function(error){
				if (error){
					console.log(error);
					return;
				}

				console.log('synchronized...');
			});
		},
		user:function(emailOrId, callback){
			firebaseRef.once('value', function(dataSnapshot) {
  			// handle read data.
  				var users = dataSnapshot.val();

  				var filtered =
  					users.filter(function(user){
  						return ((user.id.toString() === emailOrId) || (user.email === emailOrId));
  					});

  				callback(filtered[0]);
  			});
		}

	};

	if (typeof global.tdesk === 'undefined')
		global.tdesk = {};

	global.tdesk.config = config;
}(window));