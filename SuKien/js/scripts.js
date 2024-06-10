let sk_dang_chon = 1;
function MobileFix() {
    let width = $(window).width();

    if (width <= 768) {
        switch (sk_dang_chon) {
            case 1:
                $("#mobile-fix-su-kien").html(`
                    <div class="offcanvas offcanvas-start offcanvas-chieu-dai-sk" id="su-kien">
                <div class="offcanvas-body">
                    <div class="d-flex flex-column">
                        <h6 id="chon-sk1" class="vung-chon-su-kien vung-chon-su-kien-chon px-3 py-3">Nhiệm Vụ Ngày</h6>
                        <h6 id="chon-sk2" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Tuần</h6>
                        <h6 id="chon-sk3" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                    </div>
                </div>
            </div>
                    <button type="button" class="nut-chon-su-kien mb-3 py-2 px-3" data-bs-toggle="offcanvas" data-bs-target="#su-kien">DS Nhiệm Vụ</button>
                    <h4>Nhiệm Vụ Ngày</h4>
                <p class="text-muted">Danh sách nhiệm vụ ngày</p>
                <div class="row mobile-fix-row">
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                </div>
        
                <div class="row mobile-fix-row">
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                </div>
                    `);
                break;
            case 2:
                $("#mobile-fix-su-kien").html(`
                        <div class="offcanvas offcanvas-start offcanvas-chieu-dai-nv" id="su-kien">
                    <div class="offcanvas-body">
                        <div class="d-flex flex-column">
                            <h6 id="chon-sk1" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Ngày</h6>
                            <h6 id="chon-sk2" class="vung-chon-su-kien vung-chon-su-kien-chon px-3 py-3">Nhiệm Vụ Tuần</h6>
                            <h6 id="chon-sk3" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                        </div>
                    </div>
                </div>
                        <button type="button" class="nut-chon-su-kien mb-3 py-2 px-3" data-bs-toggle="offcanvas" data-bs-target="#su-kien">DS Nhiệm Vụ</button>
                        <h4>Nhiệm Vụ Tuần</h4>
                    <p class="text-muted">Danh sách nhiệm vụ tuần</p>
                    <div class="row mobile-fix-row">
                        <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                        <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                    </div>
            
                    <div class="row mobile-fix-row">
                        <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                        <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                    </div>
                        `);
                break;
            case 3:
                $("#mobile-fix-su-kien").html(`
                        <div class="offcanvas offcanvas-start offcanvas-chieu-dai-nv" id="su-kien">
                    <div class="offcanvas-body">
                        <div class="d-flex flex-column">
                            <h6 id="chon-sk1" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Ngày</h6>
                            <h6 id="chon-sk2" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Tuần</h6>
                            <h6 id="chon-sk3" class="vung-chon-su-kien vung-chon-su-kien-chon px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                        </div>
                    </div>
                </div>
                        <button type="button" class="nut-chon-su-kien mb-3 py-2 px-3" data-bs-toggle="offcanvas" data-bs-target="#su-kien">DS Nhiệm Vụ</button>
                        <h4>Nhiệm Vụ Vĩnh Viễn</h4>
                    <p class="text-muted">Danh sách nhiệm vụ Vĩnh viễn</p>
                    <div class="row mobile-fix-row">
                        <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                        <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                    </div>
            
                    <div class="row mobile-fix-row">
                        <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                        <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                    </div>
                        `);
                break;
        }
        $(".mobile-fix-the").removeClass("container");
        $(".mobile-fix-the").addClass("mx-3");
        $(".mobile-fix-row").addClass("mx-2");
    }

    if (width > 768) {
        $(".mobile-fix-the").removeClass("mx-3");
        $(".mobile-fix-the").addClass("container");
        switch (sk_dang_chon) {
            case 1:
                $("#mobile-fix-su-kien").html(`
                    <div class="row">
                    <div class="col-2 border-end">
                        <h6 id="chon-sk1" class="vung-chon-su-kien vung-chon-su-kien-chon px-3 py-3">Nhiệm Vụ Ngày</h6>
                        <h6 id="chon-sk2" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Tuần</h6>
                        <h6 id="chon-sk3" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                    </div>
                    <div class="col-10 px-5">
                        <h4>Nhiệm Vụ Ngày</h4>
                        <p class="text-muted">Danh sách nhiệm vụ ngày</p>
        
                        <div class="row my-4">
                            <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                        </div>
        
                        <div class="row">
                            <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                        </div>
                    </div>
                </div>
                    `);
                break;
            case 2:
                $("#mobile-fix-su-kien").html(`
                    <div class="row">
                    <div class="col-2 border-end">
                        <h6 id="chon-sk1" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Ngày</h6>
                        <h6 id="chon-sk2" class="vung-chon-su-kien vung-chon-su-kien-chon px-3 py-3">Nhiệm Vụ Tuần</h6>
                        <h6 id="chon-sk3" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                    </div>
                    <div class="col-10 px-5">
                        <h4>Nhiệm Vụ Tuần</h4>
                        <p class="text-muted">Danh sách nhiệm vụ tuần</p>
        
                        <div class="row my-4">
                            <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                        </div>
        
                        <div class="row">
                            <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                        </div>
                    </div>
                </div>
                    `);
                break;
            case 3:
                $("#mobile-fix-su-kien").html(`
                    <div class="row">
                    <div class="col-2 border-end">
                        <h6 id="chon-sk1" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Ngày</h6>
                        <h6 id="chon-sk2" class="vung-chon-su-kien px-3 py-3">Nhiệm Vụ Tuần</h6>
                        <h6 id="chon-sk3" class="vung-chon-su-kien vung-chon-su-kien-chon px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                    </div>
                    <div class="col-10 px-5">
                        <h4>Nhiệm Vụ Vĩnh Viễn</h4>
                        <p class="text-muted">Danh sách nhiệm vụ vĩnh viễn</p>
        
                        <div class="row my-4">
                            <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                        </div>
        
                        <div class="row">
                            <div class="col-lg-5 the-su-kien py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-su-kien py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                        </div>
                    </div>
                </div>
                    `);
                break;
        }
    }
}

$(function () {
    MobileFix();
    KTChonSK();
    function KTChonSK() {
        $("[id^='chon-sk']").click(function () {
            let id = this.id;
            let prefix = 'chon-sk';
            let suffix = id.substring(prefix.length); // Lấy phần sau của 'chon-sk'
            sk_dang_chon = Number(suffix);
            console.log(sk_dang_chon);
            MobileFix();
            KTChonSK();
        });
    }
});

$(window).resize(function () {
    MobileFix();
});