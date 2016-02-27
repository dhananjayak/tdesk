 var bounds = new google.maps.LatLngBounds();
   
$(document).ready(function () {
$("#btnPush").click(function(e){
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

});

function markCurrentLocation(map, latitude, longitude) {

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,

    });

    marker.setMap(map);

}

function AssignValuesToFields(latitude,longitude)
{
$("#driverLatitude").val(latitude);
$("#driverLongitude").val(longitude);

}

function PushDataToFireBase()
{

    var latitude=$("#driverLatitude").val();
    var longitude=$("#driverLongitude").val();
    alert(latitude+","+longitude);
    
}

function SetBaseLocation()
{
  //var myLatLng = {lat: 17.444751714467815, lng: 78.36154093371575};
     var myLatLng=  new google.maps.LatLng(17.444751714467815, 78.36154093371575);
 bounds.extend(myLatLng);
     
        var map = new google.maps.Map(document.getElementById('mapPlaceholder'), {
          zoom: 4,
          center: myLatLng
        });

        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!'
        });
 map.fitBounds(bounds);
}