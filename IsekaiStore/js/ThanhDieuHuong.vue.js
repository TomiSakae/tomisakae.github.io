const jq = $.noConflict();

jq(function () {

    jq(document).on("click", function (event) {
        var vi_tri = jq("#icon1");
        var popup = jq("#popup_nguoi_dung");
        if (!popup.is(event.target) && !vi_tri.is(event.target) && popup.has(event.target).length === 0) {
            popup.stop().fadeOut(300);
        }
    });

    jq("#icon1").on("click", function (event) {
        var vi_tri = jq(this).offset();
        var popup = jq("#popup_nguoi_dung");
        var popupWidth = popup.outerWidth(); // Lấy chiều rộng của popup
        popup.css({
            top: vi_tri.top + jq(this).outerHeight() + 10,
            left: vi_tri.left - popupWidth + 15 // Hiển thị bên phải bằng cách trừ đi chiều rộng của popup
        });
        if (popup.is(":visible")) {
            popup.stop().fadeOut(300);
        } else {
            popup.stop().fadeIn(300);
        }
        event.stopPropagation();
    });

    jq(window).on("resize", function () {
        var popup = jq("#popup_nguoi_dung");

        popup.hide();
    });

});

const tien_trinh = Vue.createApp({
    template:
        `
        <nav class="position-fixed top-0 vw-100 bg-white dieu-huong">
    <div class="container py-3">
        <div class="row">
            <div class="col-2">
                <a class="navbar-brand fw-bold fs-4 mau-tieu-de" href="../../index.html">Isekai Store</a>
            </div>
            <div class="col-8">
                <div class="d-flex justify-content-center align-items-center">
                    <a class="navbar-brand fw-500 px-4 py-2 nen-link" href="#">
                        Vũ Khí</a>
                    <a class="navbar-brand fw-500 px-4 py-2 nen-link" href="#">
                        Giáp Trụ</a>
                    <a class="navbar-brand fw-500 px-4 py-2 nen-link" href="#">
                        Phụ Kiện</a>
                </div>
            </div>
            <div class="col-2">
                <div class="d-flex justify-content-end align-items-end">
                    <a id="icon1" class="nav-link fs-3 px-2 mx-1 nen-icon">
                        <i class="bi bi-person"></i>
                    </a>
                    <a id="icon2" class="nav-link fs-5 px-2 py-1 mx-1 nen-icon">
                        <i class="bi bi-cart"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
</nav>

<div id="popup_nguoi_dung" class="vw-100 nguoi-dung bg-white br-20 shadow">
    <p class="pt-3 px-5">Tomi Sakae</p>
    <hr class="bg-black">
    <p class="py-1 px-3">Thông tin tài khoảng</p>
    <p class="py-1 px-3">Danh sách sản phẩm</p>
</div>
    `,
    data() {
        return {

        }
    },
    methods: {

    }
})

const vue_tien_trinh = tien_trinh.mount('#thanh_tien_trinh')