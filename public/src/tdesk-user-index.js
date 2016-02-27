$(document).ready(function () {
    tdesk.config.user(tdesk.readQuery("id"), function (userConfig) {
        var vehiclePositions = {};

        window.userConfig = userConfig;
    });
});

$(document).on('click', '#spanUserLocVeh', function () {
    var queryString = window.location.href.split('?')[1];
    window.location.href = "userlocatecabs.html?" + queryString;
});

$('#spanSOS').on('click', function(){
    function success(){

    }

    tdesk.sos.alert(userConfig.userid, success);
    tdesk.sos.sms();
});


