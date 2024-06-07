function Mobile() {
    var width = $(window).width();
    $(".mobile-br").empty(); // Xóa các phần tử đã thêm trước đó

    if (width <= 768) {
        $(".mobile-br").append("<br>");
        $("#mobile-menu").text("Menu");
        $("#mobile-nav").empty();
    }

    if (width > 768) {
        $("#mobile-nav").empty();
        $("#mobile-nav").append(`
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


});

$(window).resize(function () {
    Mobile();
});