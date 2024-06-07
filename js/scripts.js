function MobileFix() {
    let width = $(window).width();

    if (width <= 768) {
        $("#mobile-fix-header").removeClass("container");
        $("#mobile-fix-header").addClass("mx-2");
        $(".mobile-fix-the").removeClass("container");
        $(".mobile-fix-the").addClass("mx-2");
    }

    if (width > 768) {
        $("#mobile-fix-header").removeClass("mx-2");
        $("#mobile-fix-header").addClass("container");
        $(".mobile-fix-the").removeClass("mx-2");
        $(".mobile-fix-the").addClass("container");
    }
}

$(function () {
    MobileFix();
});

$(window).resize(function () {
    MobileFix();
});