$(document).ready(function () {
    tdesk.config.user(tdesk.readQuery("id"), function (userConfig) {
        window.userConfig = userConfig;

        var vehiclePositions = {};

        var map = init(userConfig.track.lat, userConfig.track.lng, 'mapPlaceholder');

        tdesk.vehicles.all(userConfig.track.loc, function(response){
        	Object.keys(response).forEach(function(user){
        		var userInfo = response[user];
        		
        		console.log('points changed..');

        		if (vehiclePositions[user]){
        			vehiclePositions[user].setPosition({lat:userInfo.lat, lng:userInfo.lng});
        		}
        		else{
        			vehiclePositions[user] =
        				PointVehicle(userInfo, map);	
        		}
        		
        	});
        });
    });
});

$(document).on('click', '#spanLocateVeh', function () {
    var queryString = window.location.href.split('?')[1];
    window.location.href = "locate-vehicle.html?" + queryString;
});