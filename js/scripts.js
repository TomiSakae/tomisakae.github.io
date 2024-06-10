function UI() {
    let width = $(window).width();

    if (width <= 768) {
        $("#vung_choi").html(`
<div class="vh-100 bg-primary d-flex flex-column justify-content-center align-items-center">
        <div class="text-white text-center">
            <h3>TomiSakae</h3>
            <h5>Trắc Nghiệm Anime Online</h5>
        </div>
        <div class="vung-dang-nhap-mobile d-flex justify-content-center align-items-center">
            <div class="text-center">
                <h6 class="mb-4">CHƠI NGAY</h6>
                <input type="text" class="form-control nhap-ten-mobile mb-4" id="ten_nguoi_choi"
                    placeholder="Nhập tên người chơi..." name="ten_nguoi_choi">
            </div>
        </div>
        <div class="d-flex flex-column justify-content-center align-items-center">
            <button type="button" class="btn btn-light nut-choi-mobile rounded mt-3 mb-3">Thử Thách</button>
            <button type="button" class="btn btn-light nut-choi-mobile rounded mb-3">Vào Phòng</button>
            <button type="button" class="btn btn-light nut-choi-mobile rounded mb-3">Tạo Phòng</button>
        </div>
    </div>
            `);
    }

    if (width > 768) {
        $("#vung_choi").html(`
            <div class="vh-100 bg-primary d-flex flex-column justify-content-center align-items-center">
        <div class="text-white text-center">
            <h3>TomiSakae</h3>
            <h5>Trắc Nghiệm Anime Online</h5>
        </div>
        <div class="vung-dang-nhap-pc d-flex justify-content-center align-items-center">
            <div class="text-center">
                <h5 class="mb-4">CHƠI NGAY</h5>
                <input type="text" class="form-control nhap-ten-pc mb-4" id="ten_nguoi_choi"
                    placeholder="Vui lòng nhập tên người chơi..." name="ten_nguoi_choi">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <button type="button" class="btn btn-outline-primary nut-choi-pc rounded mb-3">Thử Thách</button>
                    <button type="button" class="btn btn-outline-primary nut-choi-pc rounded mb-3">Vào Phòng</button>
                    <button type="button" class="btn btn-outline-primary nut-choi-pc rounded mb-3">Tạo Phòng</button>
                </div>
            </div>
        </div>
    </div>
            `);
    }
}

$(function () {
    UI();
});

$(window).resize(function () {
    UI();
});