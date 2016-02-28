(function(global){
	var Months = ['JAN', 'FEB',  'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

	var FIREBASE_URL = "https://tdesk-sos.firebaseio.com/";

	function currentLocation(successCallback){
		var options = {
  			enableHighAccuracy: true,
  			timeout: 5000,
  			maximumAge: 0
		};

		function success(pos) {
  			var crd = pos.coords;

  			console.log('Your current position is:');
  			console.log('Latitude : ' + crd.latitude);
  			console.log('Longitude: ' + crd.longitude);
  			console.log('More or less ' + crd.accuracy + ' meters.');

  			successCallback({lat:crd.latitude, lng:crd.longitude});
		};

		function error(err) {
  			console.warn('ERROR(' + err.code + '): ' + err.message);
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	function currentKey(){
		var now = new Date();

		var month = Months[now.getMonth()];
		var year = now.getFullYear();
		var day = now.getDate();

		return month+day+year;
	}

	var sos = {
		alert: function(userName){
			function success(latLng){
				var firebaseRef = new Firebase(FIREBASE_URL + currentKey() + '/' + userName );

				//var sosRef = firebaseRef.push();

				firebaseRef.set({latLng:latLng, sosOn:(new Date()).toString()});
			}

			currentLocation(success)
		},
		sms: function(){
			$.get('send',function(){})
    		 .done(function(){
                	alert("Notification Sent");
     		}).fail(function(){
            		alert('something went wrong');
        	});
		},
        monitor:function()
        {
            var firebaseRef=new Firebase(FIREBASE_URL + currentKey());
            firebaseRef.on('child_added', function(snapshot, prevChildKey){
            	var user = snapshot.key();
            	var val = snapshot.val();

            	var geocoder = new google.maps.Geocoder();

            	geocoder.geocode({location: {lat:val.latLng.lat, lng:val.latLng.lng}}, 
            					 function(res){
            					 	var message = 'There is an SOS from user ' + user + ' at location ' + res[0].formatted_address;
            					 	alert(message);
            					 });

            	
                
            });
        }
	};


	if (typeof global.tdesk === 'undefined')
		global.tdesk = {};

	global.tdesk.sos = sos;
}(window));