function MobileFix() {
    let width = $(window).width();

    if (width <= 768) {
        $("#mobile-fix-nhiem-vu").html(`
            <div class="offcanvas offcanvas-start offcanvas-chieu-dai-nv" id="nhiem-vu">
        <div class="offcanvas-body">
            <div class="d-flex flex-column">
                <h6 id="chon-nv1" class="vung-chon-nhiem-vu px-3 py-3">Nhiệm Vụ Ngày</h6>
                <h6 id="chon-nv2" class="vung-chon-nhiem-vu px-3 py-3">Nhiệm Vụ Tuần</h6>
                <h6 id="chon-nv3" class="vung-chon-nhiem-vu px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
            </div>
        </div>
    </div>
            <button type="button" class="nut-chon-nhiem-vu mb-3 py-2 px-3" data-bs-toggle="offcanvas" data-bs-target="#nhiem-vu">DS Nhiệm Vụ</button>
            <h4>Nhiệm Vụ Ngày</h4>
        <p class="text-muted">Danh sách nhiệm vụ ngày</p>
        <div class="row mobile-fix-row">
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center me-5 my-4">
                <h6 class="mb-2">Đăng nhập</h6>
                <p>Đăng nhập vào game</p>
                <p>0/1</p>
                <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
            </div>
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center my-4">
                <h6 class="mb-2">Đăng nhập</h6>
                <p>Đăng nhập vào game</p>
                <p>0/1</p>
                <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
            </div>
        </div>

        <div class="row mobile-fix-row">
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center me-5 my-4">
                <h6 class="mb-2">Đăng nhập</h6>
                <p>Đăng nhập vào game</p>
                <p>0/1</p>
                <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
            </div>
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center my-4">
                <h6 class="mb-2">Đăng nhập</h6>
                <p>Đăng nhập vào game</p>
                <p>0/1</p>
                <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
            </div>
        </div>
            `);
        $(".mobile-fix-the").removeClass("container");
        $(".mobile-fix-the").addClass("mx-3");
        $(".mobile-fix-row").addClass("mx-2");
    }

    if (width > 768) {
        $(".mobile-fix-the").removeClass("mx-3");
        $(".mobile-fix-the").addClass("container");
        $("#mobile-fix-nhiem-vu").html(`
            <div class="row">
            <div class="col-2 border-end">
                <h6 id="chon-nv1" class="vung-chon-nhiem-vu vung-chon-nhiem-vu-chon px-3 py-3">Nhiệm Vụ Ngày</h6>
                <h6 id="chon-nv2" class="vung-chon-nhiem-vu px-3 py-3">Nhiệm Vụ Tuần</h6>
                <h6 id="chon-nv3" class="vung-chon-nhiem-vu px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
            </div>
            <div class="col-10 px-5">
                <h4>Nhiệm Vụ Ngày</h4>
                <p class="text-muted">Danh sách nhiệm vụ ngày</p>

                <div class="row my-4">
                    <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center me-5 my-4">
                <h6 class="mb-2">Đăng nhập</h6>
                <p>Đăng nhập vào game</p>
                <p>0/1</p>
                <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
            </div>
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center my-4">
                <h6 class="mb-2">Đăng nhập</h6>
                <p>Đăng nhập vào game</p>
                <p>0/1</p>
                <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
            </div>
                </div>

                <div class="row">
                    <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center me-5 my-4">
                <h6 class="mb-2">Đăng nhập</h6>
                <p>Đăng nhập vào game</p>
                <p>0/1</p>
                <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
            </div>
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center my-4">
                <h6 class="mb-2">Đăng nhập</h6>
                <p>Đăng nhập vào game</p>
                <p>0/1</p>
                <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
            </div>
                </div>
            </div>
        </div>
            `);
    }
}

let nv_dang_chon = 1;
function ChonNV() {
    $("#chon-nv" + nv_dang_chon).addClass("vung-chon-nhiem-vu-chon");
    // switch (nv_dang_chon) {
    //     case 1:

    //         break;
    // }
}

$(function () {
    MobileFix();
    ChonNV();
    $("[id^='chon-nv']").click(function () {
        let id = this.id;
        let prefix = 'chon-nv';
        let suffix = id.substring(prefix.length); // Lấy phần sau của 'chon-nv'
        $("#chon-nv" + nv_dang_chon).removeClass("vung-chon-nhiem-vu-chon");
        nv_dang_chon = Number(suffix);
        ChonNV();
    });
});

$(window).resize(function () {
    MobileFix();
});