function MobileFix() {
    let width = $(window).width();

    if (width <= 768) {
        $(".mobile-fix-the").removeClass("container");
        $(".mobile-fix-the").addClass("mx-3");
        $(".mobile-fix-chu").removeClass("fs-6");
        $(".mobile-fix-chu").addClass("small");
    }

    if (width > 768) {
        $(".mobile-fix-the").removeClass("mx-3");
        $(".mobile-fix-the").addClass("container");
        $(".mobile-fix-chu").addClass("fs-6");
        $(".mobile-fix-chu").removeClass("small");
    }
}

function Ngay() {
    $("#nhiem-vu").html(`
        <h4 class="khung-dau py-3 text-center mt-2 rounded">Nhiệm Vụ Ngày</h4>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Đăng nhập vào game</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Nâng cấp thẻ nhân vật</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Nâng cấp kỹ năng</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Tham gia phiêu lưu</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Tham gia sự kiện</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        `);
    MobileFix();
}

function Tuan() {
    $("#nhiem-vu").html(`
        <h4 class="khung-dau py-3 text-center mt-2 rounded">Nhiệm Vụ Tuần</h4>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Đăng nhập vào game</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Nâng cấp thẻ nhân vật</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Nâng cấp kỹ năng</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Tham gia phiêu lưu</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Tham gia sự kiện</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        `);
    MobileFix();
}

function VinhVien() {
    $("#nhiem-vu").html(`
        <h4 class="khung-dau py-3 text-center mt-2 rounded">Nhiệm Vụ Vĩnh Viễn</h4>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Đăng nhập vào game</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Nâng cấp thẻ nhân vật</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Nâng cấp kỹ năng</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Tham gia phiêu lưu</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">Tham gia sự kiện</p>
            </div>
            <div class="col-2 text-center">
                <p class="mobile-fix-chu khung-nhiem-vu py-2 px-1 rounded">0/1</p>
            </div>
        </div>
        `);
    MobileFix();
}

$(function () {
    MobileFix();
    Ngay();
});

$(window).resize(function () {
    MobileFix();
});