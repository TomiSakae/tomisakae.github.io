function UI() {
    let width = $(window).width();

    if (width <= 768) {
        window.location.href = "mobile.html";
    }

    if (width > 768) {
        window.location.href = "pc.html";
    }
}

$(function () {
    UI();
});

$(window).resize(function () {
    UI();
});