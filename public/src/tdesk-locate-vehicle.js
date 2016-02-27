 $(document).ready(function () {
        tdesk.config.user(tdesk.readQuery("id"), function (userConfig) {
            window.userConfig = userConfig;

            initLocateVeh();
        });
});

function initLocateVeh() {

    LocateCurrentVehicles(userConfig.track.lat, userConfig.track.lng);

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

/*
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
    */
}