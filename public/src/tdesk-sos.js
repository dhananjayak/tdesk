(function(global){
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

	var sos = {
		alert: function(userName){
			function success(latLng){
				var firebaseRef = new Firebase(FIREBASE_URL + userName);

				var sosRef = firebaseRef.push();

				sosRef.set({latLng:latLng, sosOn:(new Date()).toString()});
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
            var firebaseRef=new Firebase(FIREBASE_URL);
            firebaseRef.on('child_added',function(snapshot){
                alert(JSON.stringify(snapshot.val()));
            });
        }
	};


	if (typeof global.tdesk === 'undefined')
		global.tdesk = {};

	global.tdesk.sos = sos;
}(window));