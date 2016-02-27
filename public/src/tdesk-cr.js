$(document).ready(function () {
    tdesk.config.user(tdesk.readQuery("id"), function (userConfig) {
        window.userConfig = userConfig;
        init(userConfig.track.lat, userConfig.track.lng);
    });
});