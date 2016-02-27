// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var map;
var markerBounds = Array();
var directionsDisplay = new google.maps.DirectionsRenderer();
var DirectionObj = new google.maps.DirectionsService();
var mapBounds = new google.maps.LatLngBounds();

function initMap() {

    var source = document.getElementById('txtSource');
    var destination = document.getElementById('txtDest');
    var via = document.getElementById('txtVia');

    ////Enabling new cartography and themes
    //google.maps.visualRefresh = true;

    ////Getting map DOM element
    //var mapElement = document.getElementById('mapPlaceholder');

    //var mapOptions = {
    //    center: new google.maps.LatLng(17.514303333333334, 78.44577666666667),
    //    zoom: 10,
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //};

    ////Creating a map with DOM element which is just //obtained
    //map = new google.maps.Map(mapElement, mapOptions);

    var autocomplete = new google.maps.places.Autocomplete(source);
    autocomplete.bindTo('bounds', map);

    var autocomplete = new google.maps.places.Autocomplete(destination);
    autocomplete.bindTo('bounds', map);

    var autocomplete = new google.maps.places.Autocomplete(via);
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        //// If the place has a geometry, then present it on a map.
        //if (place.geometry.viewport) {
        //    map.fitBounds(place.geometry.viewport);
        //} else {
        //    map.setCenter(place.geometry.location);
        //    // map.setZoom(17);  // Why 17? Because it looks good.
        //}

        marker.setIcon(/** type {google.maps.Icon} **/({
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(35, 35)
        }));
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
        infowindow.open(map, marker);
    });

}

function initLocateVeh() {

    LocateCurrentVehicles(userConfig.track.lat, userConfig.track.lng, document.getElementById('divLocateVehicles'));

    // Closes the sidebar menu
    $("#menu-close").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Opens the sidebar menu
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });

    //// Scrolls to the selected menu item on the page
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
}

function markTraffic(map) {
    var trafficLayer = new google.maps.TrafficLayer();

    trafficLayer.setMap(map);
}

function getLatLong() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            return position;
        });
    }
    else {

    }
}

function init(lat, lng, placeHolderId) {
    return createMap(lat, lng, placeHolderId);
}

function LocateCurrentVehicles(lat, lng, vehiclelocations, mapElement) {

    vehiclelocations = new Array();

    vehiclelocations.push(new Array(17.445800, 78.380928));
    vehiclelocations.push(new Array(17.410424, 78.442039));
    vehiclelocations.push(new Array(17.436629, 78.499718));
    vehiclelocations.push(new Array(17.480515, 78.314323));
    vehiclelocations.push(new Array(17.363244, 78.518257));

    var locationMap = CreateMapInstance(lat, lng, mapElement);

    for (var cnt = 0; cnt < vehiclelocations.length; cnt++) {
        markerBounds.push(PointVehicle(vehiclelocations[cnt][0], vehiclelocations[cnt][1], locationMap));
    }

    for (var i in markerBounds) {
        mapBounds.extend(markerBounds[i].getPosition());
    }

    locationMap.fitBounds(mapBounds)

}

function PointVehicle(userInfo, map) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(userInfo.lat, userInfo.lng),
        map: map,
        animation: google.maps.Animation.DROP,
        icon: '/img/bus-small.png'
    });

    directionsDisplay.setMap(map);

    marker.addListener('click', function (event) {
        var currentPos = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng())
        DrawRoute(map, currentPos, "");
    });

    var eta = geteta(new google.maps.LatLng(userInfo.lat, userInfo.lng), new google.maps.LatLng(userConfig.track.lat, userConfig.track.lng));

    var infowindow = new google.maps.InfoWindow({
        content: InfoWindowContent(userInfo.name, userInfo.vehicleNumber, '9999999999', eta)
    });

    marker.addListener('mouseover', function () {
        infowindow.open(map, marker);
    });

    marker.addListener(marker, 'mouseout', function () {
        infowindow.close();
    });

    return marker;
}

function createMap(lat, lng, placeHolderId) {
    var mapElement = document.getElementById(placeHolderId);

    var locationMap = CreateMapInstance(lat, lng, mapElement);

    markCurrentLocation(locationMap, lat, lng);

    return locationMap;
}

function CreateMapInstance(lat, lng, mapElement) {
    //lat = 17.4359;
    //lng = 78.3417;
    google.maps.visualRefresh = true;

    var mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(mapElement, mapOptions);

    return map;
}

function GetLatLongOfAddress(address) {
    LocationAPI.LocationVariables.GeoCodeObj.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            return results[0].geometry.location;
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }

    });
}

function GetAddressFromLatLong(lat, lng) {
    var address = "";
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        "location": new google.maps.LatLng(lat, lng)
    },
    function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            address = results[0].formatted_address;
        }
        else {
            debugger;
        }
    });
}

function DrawRoute(map, currentpos, array) {

    var request = {
        origin: currentpos,
        destination: new google.maps.LatLng(userConfig.track.lat, userConfig.track.lng),
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        waypoints: userConfig.inboundRoute
    };


    DirectionObj.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(map);

            directionsDisplay.setOptions({
                noClear: true
                //infoWindow: infowindow_forRoutedMarker,
                //suppressInfoWindows: false,
                //suppressMarkers: false,
                //markerOptions: ({
                //    clickable: true,
                //    zIndex: 3
                //})
            });
        }
    });
}

function markCurrentLocation(map, latitude, longitude) {

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        title: userConfig.track.title
    });

    marker.setMap(map);

}

function InfoWindowContent(name, vehicle, contact, eta) {

    return '<div class="row"><div class="col-md-12"><label>Name : ' + name + '</label></div></div><div class="row"><div class="col-md-12">' +
        '<label>Vehicle Number : ' + vehicle + '</label>' +
    '</div></div><div class="row">' +
    '<div class="col-md-12"><label>Contact : ' + contact + '</label></div></div><div class="row"><div class="col-md-12"><label>ETA : ' + eta +
        '</label></div></div>'

}

function geteta(source, dest) {
    var eta = "";
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
          origins: [source],
          destinations: [dest],
          travelMode: google.maps.TravelMode.DRIVING,
          transitOptions: {
              departureTime: new Date(GetDepartureTime()),
          },
      }, callback);

    function callback(response, status) {
        //eta = response.rows[0].elements[0].duration.text;
    }
}

function GetDepartureTime() {
    return new Date().getTime() / 1000;
}

