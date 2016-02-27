var directionsDisplay = new google.maps.DirectionsRenderer();
var DirectionObj = new google.maps.DirectionsService();

$(document).ready(function () {
    tdesk.config.user(tdesk.readQuery("id"), function (userConfig) {
        //console.log(value);
        window.userConfig = userConfig;
        Init();
        // init(userConfig.track.lat, userConfig.track.lng);
    });

  
});
function Init()
{
      $("#btnPush").click(function (e) {
        e.preventDefault();
        PushDataToFireBase();
    }
        );

    navigator.geolocation.getCurrentPosition(function (position) {
        var mapElement = document.getElementById('mapPlaceholder');

        var mapOptions = {
            center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
            zoom: 11,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(mapElement, mapOptions);

        markCurrentLocation(map, position.coords.latitude, position.coords.longitude);
        AssignValuesToFields(position.coords.latitude, position.coords.longitude);
    });

    //SetBaseLocation();
      GetWatchFunction();
}

function GetWatchFunction() {
    var options = {
        enableHighAccuracy: false,
        timeout: 3000,
        maximumAge: 0
    };

    var watchID = navigator.geolocation.watchPosition(function (position) {
        PushLiveData(position.coords.latitude, position.coords.longitude, watchID);
    }, options);
}
function PushLiveData(latitude, longitude, watchId) {
  //  alert(latitude + "," + longitude + "," + watchId);
  AssignValuesToFields(latitude,longitude);
  PushDataToFireBase();

}

function markCurrentLocation(map, latitude, longitude) {

//    cd

   // marker.setMap(map);
    var currentPos = new google.maps.LatLng(latitude, longitude);
        directionsDisplay.setMap(map);

    DrawRouteForDriver(map, currentPos, "");

}

function AssignValuesToFields(latitude, longitude) {
    $("#driverLatitude").val(latitude);
    $("#driverLongitude").val(longitude);

}

function PushDataToFireBase() {

    var latitude = parseFloat($("#driverLatitude").val());
    var longitude = parseFloat($("#driverLongitude").val());
    var latlang = { lat: latitude, lng: longitude };
    var vechicle = new tdesk.Vehicle(userConfig.track.loc, userConfig.userid);
    vechicle.position(latlang);
   // alert(latitude + "," + longitude);

}

function SetBaseLocation() {
    //var myLatLng = {lat: 17.444751714467815, lng: 78.36154093371575};
    var myLatLng = new google.maps.LatLng(17.444751714467815, 78.36154093371575);
    // bounds.extend(myLatLng);
     
    var map = new google.maps.Map(document.getElementById('mapPlaceholder'), {
        zoom: 4,
        center: myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
    });
    marker.setMap(map);
}

function DrawRouteForDriver(map, currentpos, array) {

    var request = {
        origin: new google.maps.LatLng(17.3700,78.4800),
       // origin: currentpos,
        destination: new google.maps.LatLng(userConfig.track.lat, userConfig.track.lng),
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
       // waypoints: userConfig.inboundRoute
      
        waypoints: [{ location: "Rai Durg, Hyderabad", stopover: true },{location:"TOLI CHOWKI",stopover:true}]
    };


    DirectionObj.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
         
        }
    });
}
