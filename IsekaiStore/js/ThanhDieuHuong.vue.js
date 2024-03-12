const tien_trinh = Vue.createApp({
    template:
        `
        <nav class="position-fixed top-0 vw-100 bg-white dieu-huong border-bottom">
            <div class="container py-3">
                <div class="row">
                    <div class="col-2">
                        <a class="navbar-brand fw-bold fs-4 mau-tieu-de" href="/IsekaiStore/index.html">Isekai Store</a>
                    </div>
                    <div class="col-8">
                        <div class="d-flex justify-content-center align-items-center">
                            <a class="navbar-brand fw-500 px-4 py-2 nen-link br-20" href="#">
                                Vũ Khí</a>
                            <a class="navbar-brand fw-500 px-4 py-2 nen-link br-20" href="#">
                                Giáp Trụ</a>
                            <a class="navbar-brand fw-500 px-4 py-2 nen-link br-20" href="#">
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

        <div id="popup_nguoi_dung" class="vw-100 nguoi-dung bg-white br-20 shadow-sm">
            <div class="d-flex justify-content-center">
                <div class="pt-3 px-5 fw-500 fs-5">Tomi Sakae</div>
            </div>
            <hr class="bg-black mx-3">
            <p class="rounded-3 nen-popup nut-nhan py-1 px-1 mx-2 fw-500 chu-popup"><i
                    class="bi bi-person fs-5 px-2"></i>Tài Khoản
            </p>
            <p class="rounded-3 nen-popup nut-nhan py-1 px-1 mx-2 fw-500 chu-popup"><i
                    class="bi bi-bag fs-5 px-2"></i>Túi
                Đồ</p>
            <hr class="bg-black mx-3">
            <p class="rounded-3 nen-popup nut-nhan py-1 px-1 mx-2 fw-500 chu-popup"><i
                    class="bi bi-box-arrow-left fs-5 px-2"></i>Thoát Trang</p>
        </div>

        <div id="popup_gio_hang" class="vw-100 gio-hang bg-white br-20 shadow-sm">
            <div class="san-pham-gio">
                <div class="pt-3 px-4">
                    <div class="fw-500 fs-4">Giỏ hàng</div>
                </div>
                <div v-html="gio_hang" class="pt-3 px-3">

                </div>
            </div>
            <div class="py-4 px-4">
                <div class="row">
                    <div class="col-6">
                        <div class="fw-500 fs-5">Tổng tiền: </div>
                    </div>
                    <div class="col-6 text-end">
                        <div id="tong_tien_gio" class="fw-500 fs-5">$0</div>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center">
                    <a class="nav-link nut-gio-hang nen-nut-trang border mx-1 mt-3 fw-500">Xem giỏ</a>
                    <a class="nav-link nut-gio-hang nen-nut-den text-light mx-1 mt-3 fw-500">Kiểm tra</a>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            gio_hang: ``
        }
    },
    methods: {

    }
})

const vue_tien_trinh = tien_trinh.mount('#thanh_dieu_huong')

const xl_gh = Vue.createApp({
    data() {
        return {
            gio_hang: ``
        }
    },
    methods: {

    }
})

const truy_van_xl_gh = xl_gh.mount("#xu_ly_gio_hang")

jq(function () {
    let tong_tien = 0;
    let code_gio_hang = ``;
    function XuLyGioHang() {
        let sl_gd = JSON.parse(localStorage.getItem("sl_gh")) || [];
        if (sl_gd) {
            let nhap_gio_do = [];
            function LayDLCSDLVaoGio() {
                let request = indexedDB.open("IsekaiStore", 4);
                let db;

                // Tạo một Promise để xử lý việc trả về dữ liệu từ indexedDB
                return new Promise(function (resolve) {
                    request.onsuccess = function (event) {
                        db = event.target.result;
                        let transaction = db.transaction(["gio_do"]);
                        let objectStore = transaction.objectStore("gio_do");

                        let promises = []; // Mảng lưu trữ các lời hứa

                        for (let i = 0; i < sl_gd.length; i++) {
                            let id = sl_gd[i].toString();
                            let getRequest = objectStore.get("1");
                            let promise = new Promise(function (resolve) {
                                getRequest.onsuccess = function (event) {
                                    let lay_gio_do = event.target.result;
                                    if (lay_gio_do.sl > 0) {
                                        nhap_gio_do.push(lay_gio_do);
                                        resolve(); // Đánh dấu lời hứa này đã hoàn thành
                                    }
                                };
                            });
                            promises.push(promise); // Thêm lời hứa vào mảng
                        }

                        // Sử dụng Promise.all() để đợi cho tất cả các lời hứa trong mảng hoàn thành
                        Promise.all(promises).then(function () {
                            resolve();
                        });
                    };
                });
            }

            LayDLCSDLVaoGio().then(function () {
                let ten_sp = "";
                let sl_sp = 0;
                let gia_sp = 0;
                let dem = 0;
                let anh_sp = "";
                code_gio_hang = ``;
                tong_tien = 0;
                for (let sp of nhap_gio_do) {
                    ten_sp = sp.ten;
                    sl_sp = sp.sl;
                    gia_sp = sp.gia;
                    anh_sp = sp.url;
                    tong_tien += Number(sp.gia) * Number(sp.sl);
                    if (dem > 0) {
                        code_gio_hang += `<hr>`;
                    }
                    code_gio_hang += `
                <div class="row">
                        <div class="col-3">
                            <div
                                class="nen-san-pham-gio-hang br-20 d-flex flex-column justify-content-center align-items-center">
                                <img
                                    src="`+ anh_sp + `"
                                    alt="Sản Phẩm" class="w-50 h-auto">
                            </div>
                        </div>
                        <div class="col-6">
                            <p class="fw-500 pt-2">`+ ten_sp + `</p>
                            <p class="text-muted">SL: `+ sl_sp + `</p>
                        </div>
                        <div class="col-3">
                            <div class="d-inline-block d-flex justify-content-end">
                                <p class="px-3 fs-6 mau-tien-gio-hang fw-500 rounded-3">$`+ gia_sp + `</p>
                            </div>
                            <div class="d-inline-block d-flex justify-content-end align-items-end">
                                <p class="mau-chu-gio-hang pt-2">Xem giỏ</p>
                            </div>
                        </div>
                    </div>
                `
                    dem++;
                }
                vue_tien_trinh.gio_hang = code_gio_hang;
                jq("#tong_tien_gio").text("$" + tong_tien);
            });
        }
    }

    var vi_tri_icon1 = jq("#icon1").offset();
    var vi_tri_icon2 = jq("#icon2").offset();

    jq(document).on("click", function (event) {
        var vi_tri1 = jq("#icon1");
        var vi_tri2 = jq("#icon2");
        var popup1 = jq("#popup_nguoi_dung");
        var popup2 = jq("#popup_gio_hang");
        if (!popup1.is(event.target) && !vi_tri1.is(event.target) && popup1.has(event.target).length === 0) {
            popup1.stop().fadeOut(300);
        }
        if (!popup2.is(event.target) && !vi_tri2.is(event.target) && popup2.has(event.target).length === 0) {
            popup2.stop().fadeOut(300);
        }
    });

    jq("#icon1").on("click", function (event) {
        var popup1 = jq("#popup_nguoi_dung");
        var popup2 = jq("#popup_gio_hang");
        var popupWidth = popup1.outerWidth(); // Lấy chiều rộng của popup
        popup1.css({
            top: vi_tri_icon1.top + jq(this).outerHeight() + 10,
            left: vi_tri_icon1.left - popupWidth + 15 // Hiển thị bên phải bằng cách trừ đi chiều rộng của popup
        });
        if (popup1.is(":visible")) {
            popup1.stop().fadeOut(300);
        } else {
            popup2.stop().fadeOut(300);
            popup1.stop().fadeIn(300);
        }
        event.stopPropagation();
    });

    jq("#icon2").on("click", function (event) {
        XuLyGioHang();
        var popup1 = jq("#popup_nguoi_dung");
        var popup2 = jq("#popup_gio_hang");
        var popupWidth = popup2.outerWidth(); // Lấy chiều rộng của popup
        popup2.css({
            top: vi_tri_icon2.top + jq(this).outerHeight() + 10,
            left: vi_tri_icon2.left - popupWidth + 15 // Hiển thị bên phải bằng cách trừ đi chiều rộng của popup
        });
        if (popup2.is(":visible")) {
            popup2.stop().fadeOut(300);

        } else {
            popup1.stop().fadeOut(300);
            popup2.stop().fadeIn(300);
        }
        event.stopPropagation();
    });

    jq(window).on("resize", function () {
        var popup1 = jq("#popup_nguoi_dung");
        var popup2 = jq("#popup_gio_hang");
        popup1.hide();
        popup2.hide();
    });

});