
$("#nav").html(`
<nav class="container py-4 d-flex justify-content-between align-items-center">
    <a href="#" class="fs-4 fw-bold text-dark text-decoration-none">TomiSakae</a>
    <div id="mobile-nav"></div>
    <button class="nut-nav py-2 px-3"><span id="mobile-menu">Tài Khoản</span></button>
</nav>
`);

function Mobile() {
    var width = $(window).width();

    if (width <= 768) {
        $(".mobile-br").html("<br>");
        $("#mobile-menu").text("Menu");
        $("#mobile-nav").empty();
    }

    if (width > 768) {
        $("#mobile-nav").html(`
            <a href="#" class="link-nav px-3 py-2 mx-1">Nhân Vật</a>
            <a href="#" class="link-nav px-3 py-2 mx-1">Nhiệm Vụ</a>
            <a href="#" class="link-nav px-3 py-2 mx-1">Phiêu Lưu</a>
            <a href="#" class="link-nav px-3 py-2 mx-1">Gacha</a>
            <a href="#" class="link-nav px-3 py-2 mx-1">Sự Kiện</a>
        `);
        $(".mobile-br").empty();
        $("#mobile-menu").text("Tài Khoản");
    }
}

$(function () {
    Mobile();
    $("body").removeClass("d-none");
});

$(window).resize(function () {
    Mobile();
});