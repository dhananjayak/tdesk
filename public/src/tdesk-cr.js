$(document).ready(function () {
    tdesk.config.user(tdesk.readQuery("id"), function (userConfig) {
        window.userConfig = userConfig;

        var vehiclePositions = {};

        var map = init(userConfig.track.lat, userConfig.track.lng, 'mapPlaceholder');

        tdesk.vehicles.all(userConfig.track.loc, function(response){
        	Object.keys(response).forEach(function(user){
        		var usersLatLng = response[user];
        		
        		console.log('points changed..');

        		if (vehiclePositions[user]){
        			vehiclePositions[user].setPosition({lat:usersLatLng.lat, lng:usersLatLng.lng});
        		}
        		else{
        			vehiclePositions[user] =
        				PointVehicle(usersLatLng.lat, usersLatLng.lng, map);	
        		}
        		
        	});
        });
    });
});

$(document).on('click', '#spanLocateVeh', function () {
    var queryString = window.location.href.split('?')[1];
    window.location.href = "locate-vehicle.html?" + queryString;
});