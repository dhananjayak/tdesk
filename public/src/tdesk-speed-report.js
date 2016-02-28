
var keys = new Array();
var userArray = new Array();

$(document).ready(function () {

    var json;

    var tableId = $('#tblSpeedMeter');
    var FIREBASE_URL = "https://tdesk-driver-speed.firebaseio.com/";
    var firebaseRef = new Firebase(FIREBASE_URL);

    firebaseRef.on('value', function (snapshot) {
        json = snapshot.val();
        GetAllKeys(json.Hyderabad, keys);
        for (var cnt = 0; cnt < keys.length; cnt++) {
            var headers = new Array();
            var x = GetIndividualRecords(keys[cnt], json.Hyderabad);
            GetAllKeys(x, headers);
            var output = new Array();
            CalculateMatrix(x, headers, output);
            var speedMatrix = new Array();

            for (var dist = 0; dist < output.length; dist++) {
                if (output[dist][0] != 0 || output[dist][1] != 0) {
                    speedMatrix.push(Math.abs(output[dist][0] / output[dist][1]));
                }
            }
            var maxSpeed = Math.max.apply(Math, speedMatrix);
            var total = 0;
            $.each(speedMatrix, function () {
                total += this;
            });
            var avgSpped = total / output.length
            PaintHtml(keys[cnt], keys[cnt], maxSpeed, avgSpped, tableId);
        }
    });

    $(tableId).DataTable({
        "searching": false,
        "ordering": false,
        "paging": false
    });

});

function GetAllKeys(json, array) {
    for (var k in json) { array.push(k); }
}

function GetIndividualRecords(key, json) {
    return json[key];
}

function CalculateMatrix(data, headers, matrix) {
    for (var cnt = 0; cnt < headers.length - 1; cnt++) {

        var p1 = new google.maps.LatLng(data[headers[cnt]].latLng.lat, data[headers[cnt]].latLng.lng);
        var p2 = new google.maps.LatLng(data[headers[cnt + 1]].latLng.lat, data[headers[cnt + 1]].latLng.lng);

        matrix.push(new Array(calcDistance(p1, p2), CalculateTime(data[headers[cnt]].locatedOn, data[headers[cnt + 1]].locatedOn)));
    }
}

function calcDistance(p1, p2) {
    return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
}

function CalculateTime(from, to) {
    var fromDate = new Date(from);
    var toDate = new Date(to);
    var timeDiff = Math.abs(fromDate.getTime() - toDate.getTime());
    return Math.ceil(timeDiff / (1000 * 60));
}

function PaintHtml(name, date, maxSpeed, avgSpped, element) {
    var html = '<tr><td>' + name + '</td><td>' + date + '</td><td>' + maxSpeed + '</td><td>' + avgSpped + '</td></tr>'
    $(element).find('tbody').append(html);
}




