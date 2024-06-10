let anime_dang_chon = 1;
function MobileFix() {
    let width = $(window).width();

    if (width <= 768) {
        switch (anime_dang_chon) {
            case 1:
                $("#mobile-fix-anime").html(`
                    <div class="offcanvas offcanvas-start offcanvas-chieu-dai-anime" id="anime">
                <div class="offcanvas-body">
                    <div class="d-flex flex-column">
                        <h6 id="chon-anime1" class="vung-chon-anime vung-chon-anime-chon px-3 py-3">Date A Live</h6>
                        <h6 id="chon-anime2" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Tuần</h6>
                        <h6 id="chon-anime3" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                    </div>
                </div>
            </div>
                    <button type="button" class="nut-chon-anime mb-3 py-2 px-3" data-bs-toggle="offcanvas" data-bs-target="#anime">Anime</button>
            <h4>Date A Live</h4>
        <p class="text-muted">Danh sách thẻ nhân vật</p>
        <div class="row mobile-fix-row">
            <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                <h6 class="mb-2">Độ Hiếm: SR</h6>
                <img src="../anime/date_a_live/tohka/tohka-yatogami-1-1.jpg" alt="ảnh Yatogami Tohka"
                    class="w-50 h-auto">
                <h5 class="mt-2">Yatogami Tohka</h5>
            </div>
            <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
                <h6 class="mb-2">Độ Hiếm: SR</h6>
                <img src="../anime/date_a_live/yoshino/yoshino-1-1.jpg" alt="ảnh Yatogami Tohka" class="w-50 h-auto">
                <h5 class="mt-2">Yoshino</h5>
            </div>
        </div>

        <div class="row mobile-fix-row">
            <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                <h6 class="mb-2">Độ Hiếm: UR</h6>
                <img src="../anime/date_a_live/kurumi/kurumi-tokisaki-1-1.jpg" alt="ảnh Yatogami Tohka"
                    class="w-50 h-auto">
                <h5 class="mt-2">Tokisaki Kurumi</h5>
            </div>
            <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
                <h6 class="mb-2">Độ Hiếm: SR</h6>
                <img src="../anime/date_a_live/kotori/kotori-itsuka-1-1.jpg" alt="ảnh Yatogami Tohka"
                    class="w-50 h-auto">
                <h5 class="mt-2">Itsuka Kotori</h5>
            </div>
        </div>
                    `);
                break;
            case 2:
                $("#mobile-fix-anime").html(`
                        <div class="offcanvas offcanvas-start offcanvas-chieu-dai-nv" id="anime">
                    <div class="offcanvas-body">
                        <div class="d-flex flex-column">
                            <h6 id="chon-anime1" class="vung-chon-anime px-3 py-3">Date A Live</h6>
                            <h6 id="chon-anime2" class="vung-chon-anime vung-chon-anime-chon px-3 py-3">Nhiệm Vụ Tuần</h6>
                            <h6 id="chon-anime3" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                        </div>
                    </div>
                </div>
                        <button type="button" class="nut-chon-anime mb-3 py-2 px-3" data-bs-toggle="offcanvas" data-bs-target="#anime">DS Nhiệm Vụ</button>
                        <h4>Nhiệm Vụ Tuần</h4>
                    <p class="text-muted">Danh sách nhiệm vụ tuần</p>
                    <div class="row mobile-fix-row">
                        <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                        <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                    </div>
            
                    <div class="row mobile-fix-row">
                        <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                        <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                    </div>
                        `);
                break;
            case 3:
                $("#mobile-fix-anime").html(`
                        <div class="offcanvas offcanvas-start offcanvas-chieu-dai-nv" id="anime">
                    <div class="offcanvas-body">
                        <div class="d-flex flex-column">
                            <h6 id="chon-anime1" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Ngày</h6>
                            <h6 id="chon-anime2" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Tuần</h6>
                            <h6 id="chon-anime3" class="vung-chon-anime vung-chon-anime-chon px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                        </div>
                    </div>
                </div>
                        <button type="button" class="nut-chon-anime mb-3 py-2 px-3" data-bs-toggle="offcanvas" data-bs-target="#anime">DS Nhiệm Vụ</button>
                        <h4>Nhiệm Vụ Vĩnh Viễn</h4>
                    <p class="text-muted">Danh sách nhiệm vụ Vĩnh viễn</p>
                    <div class="row mobile-fix-row">
                        <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                        <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                    </div>
            
                    <div class="row mobile-fix-row">
                        <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                            <h6 class="mb-2">Đăng nhập</h6>
                            <p>Đăng nhập vào game</p>
                            <p>0/1</p>
                            <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                        </div>
                        <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
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
        switch (anime_dang_chon) {
            case 1:
                $("#mobile-fix-anime").html(`
                    <div class="row">
            <div class="col-2 border-end">
                <h6 id="chon-anime1" class="vung-chon-anime vung-chon-anime-chon px-3 py-3">Date A Live</h6>
                        <h6 id="chon-anime2" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Tuần</h6>
                        <h6 id="chon-anime3" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
            </div>
            <div class="col-10 px-5">
                <h4>Date A Live</h4>
                <p class="text-muted">Danh sách thẻ nhân vật</p>

                <div class="row my-4">
                    <div class="col-lg-5 the-anime py-4 px-4 text-center me-5">
                        <h6 class="mb-2">Độ Hiếm: SR</h6>
                        <img src="../anime/date_a_live/tohka/tohka-yatogami-1-1.jpg" alt="ảnh Yatogami Tohka"
                            class="w-50 h-auto">
                        <h5 class="mt-2">Yatogami Tohka</h5>
                    </div>
                    <div class="col-lg-5 the-anime py-4 px-4 text-center">
                        <h6 class="mb-2">Độ Hiếm: SR</h6>
                        <img src="../anime/date_a_live/yoshino/yoshino-1-1.jpg" alt="ảnh Yatogami Tohka"
                            class="w-50 h-auto">
                        <h5 class="mt-2">Yoshino</h5>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-5 the-anime py-4 px-4 text-center me-5">
                        <h6 class="mb-2">Độ Hiếm: UR</h6>
                        <img src="../anime/date_a_live/kurumi/kurumi-tokisaki-1-1.jpg" alt="ảnh Yatogami Tohka"
                            class="w-50 h-auto">
                        <h5 class="mt-2">Tokisaki Kurumi</h5>
                    </div>
                    <div class="col-lg-5 the-anime py-4 px-4 text-center">
                        <h6 class="mb-2">Độ Hiếm: SR</h6>
                        <img src="../anime/date_a_live/kotori/kotori-itsuka-1-1.jpg" alt="ảnh Yatogami Tohka"
                            class="w-50 h-auto">
                        <h5 class="mt-2">Itsuka Kotori</h5>
                    </div>
                </div>
            </div>
        </div>
                    `);
                break;
            case 2:
                $("#mobile-fix-anime").html(`
                    <div class="row">
                    <div class="col-2 border-end">
                        <h6 id="chon-anime1" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Ngày</h6>
                        <h6 id="chon-anime2" class="vung-chon-anime vung-chon-anime-chon px-3 py-3">Nhiệm Vụ Tuần</h6>
                        <h6 id="chon-anime3" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                    </div>
                    <div class="col-10 px-5">
                        <h4>Nhiệm Vụ Tuần</h4>
                        <p class="text-muted">Danh sách nhiệm vụ tuần</p>
        
                        <div class="row my-4">
                            <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                        </div>
        
                        <div class="row">
                            <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
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
                $("#mobile-fix-anime").html(`
                    <div class="row">
                    <div class="col-2 border-end">
                        <h6 id="chon-anime1" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Ngày</h6>
                        <h6 id="chon-anime2" class="vung-chon-anime px-3 py-3">Nhiệm Vụ Tuần</h6>
                        <h6 id="chon-anime3" class="vung-chon-anime vung-chon-anime-chon px-3 py-3">Nhiệm Vụ Vĩnh Viễn</h6>
                    </div>
                    <div class="col-10 px-5">
                        <h4>Nhiệm Vụ Vĩnh Viễn</h4>
                        <p class="text-muted">Danh sách nhiệm vụ vĩnh viễn</p>
        
                        <div class="row my-4">
                            <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                        </div>
        
                        <div class="row">
                            <div class="col-lg-5 the-anime py-4 px-4 text-center me-5 my-4">
                        <h6 class="mb-2">Đăng nhập</h6>
                        <p>Đăng nhập vào game</p>
                        <p>0/1</p>
                        <button type="button" class="btn btn-outline-primary mt-2 rounded">Nhận</button>
                    </div>
                    <div class="col-lg-5 the-anime py-4 px-4 text-center my-4">
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
    KTChonAnime();
    function KTChonAnime() {
        $("[id^='chon-anime']").click(function () {
            let id = this.id;
            let prefix = 'chon-anime';
            let suffix = id.substring(prefix.length); // Lấy phần sau của 'chon-anime'
            anime_dang_chon = Number(suffix);
            console.log(anime_dang_chon);
            MobileFix();
            KTChonAnime();
        });
    }
});

$(window).resize(function () {
    MobileFix();
});