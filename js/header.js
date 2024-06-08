function MobileFixHeader() {
    let width = $(window).width();

    if (width <= 768) {
        $("#mobile-fix-header").removeClass("container");
        $("#mobile-fix-header").addClass("mx-2");
    }

    if (width > 768) {
        $("#mobile-fix-header").removeClass("mx-2");
        $("#mobile-fix-header").addClass("container");
    }
}

$(function () {
    MobileFixHeader();
});

$(window).resize(function () {
    MobileFixHeader();
});