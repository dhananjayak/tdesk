$(document).ready(function () {
    tdesk.config.user(tdesk.readQuery("id"), function (userConfig) {
        window.userConfig = userConfig;

        var map = init(userConfig.track.lat, userConfig.track.lng);

        tdesk.vehicles.all(userConfig.track.loc, function(response){
        	Object.keys(response).forEach(function(user){
        		var usersLatLng = response[user];

        		PointVehicle(usersLatLng.lat, usersLatLng.lng, map);
        	});
        });
    });


});

$(document).on('click', '#spanLocateVeh', function () {
    var queryString = window.location.href.split('?')[1];
    window.location.href = "locatevehicle.html?" + queryString;
});