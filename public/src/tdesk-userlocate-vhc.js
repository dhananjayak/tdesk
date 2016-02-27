$(document).ready(function () {
    tdesk.config.user(tdesk.readQuery("id"), function (userConfig) {
        var vehiclePositions = {};

        window.userConfig = userConfig;

        var map = init(userConfig.track.lat, userConfig.track.lng, 'divLocateVehicles');

        tdesk.vehicles.all(userConfig.track.loc, function (response) {
            Object.keys(response).forEach(function (user) {
                var usersLatLng = response[user];

                console.log('points changed..');

                if (vehiclePositions[user]) {
                    vehiclePositions[user].setPosition({ lat: usersLatLng.lat, lng: usersLatLng.lng });
                }
                else {
                    vehiclePositions[user] =
                        PointVehicle(usersLatLng.lat, usersLatLng.lng, map);
                }
            });
        });

        //initLocateVeh();
    });
});

$(document).on('click', '#spanUserLocVeh', function () {
    var queryString = window.location.href.split('?')[1];
    window.location.href = "userlocatecabs.html?" + queryString;
});
$(document).on('click', '#spanSOS', function () {
PushSosData();
    
    var queryString = window.location.href.split('?')[1];
    //window.location.href = "send";
});

function PushSosData()
{
    $.get('send',function(){})
    .done(function()
    {
                alert("Notification Sent");
     })
        .fail(function(){
            alert('something went wrong');
        })
      
}