jq(function () {

    let ten_sp = "";
    let tien_sp = 0;
    let url_sp = "";
    let so_luong_sp = 0;
    function LayDLCSDL(id) {
        let request = indexedDB.open("IsekaiStore", 4);
        let db;

        // Tạo một Promise để xử lý việc trả về dữ liệu từ indexedDB
        return new Promise(function (resolve) {
            request.onsuccess = function (event) {
                db = event.target.result;
                let transaction = db.transaction(["san_pham"]);
                let objectStore = transaction.objectStore("san_pham");

                let getRequest = objectStore.get(id);
                getRequest.onsuccess = function (event) {
                    ten_sp = getRequest.result.ten;
                    tien_sp = getRequest.result.gia;
                    url_sp = getRequest.result.url;
                    so_luong_sp = getRequest.result.sl_gio_do;
                    // Gọi resolve khi dữ liệu đã được lấy thành công
                    resolve();
                };
            };
        });
    }

    function ThemVPVaoGio(id) {
        let request = indexedDB.open("IsekaiStore", 4);
        let db;

        request.onsuccess = function (event) {
            db = event.target.result;
            let transaction = db.transaction(["san_pham"], "readwrite");
            let objectStore = transaction.objectStore("san_pham");

            let getRequest = objectStore.get(id);
            getRequest.onsuccess = function (event) {
                let data = event.target.result;

                if (data.sl_gio_do == 0) {
                    // Lấy dữ liệu từ Local Storage và chuyển đổi thành mảng (nếu có)
                    let gioHang = JSON.parse(localStorage.getItem("sl_gh")) || [];

                    // Thêm phần tử mới vào mảng
                    if (Array.isArray(gioHang)) {
                        gioHang.push(data.id);
                    }

                    // Lưu mảng mới vào Local Storage
                    localStorage.setItem("sl_gh", JSON.stringify(gioHang));
                    let them_sp = localStorage.getItem("sl_vp_gio");
                    if (them_sp == 0) {
                        jq("#thong_bao_gio_hang").removeClass("d-none");
                    }
                    them_sp++;
                    localStorage.setItem("sl_vp_gio", them_sp);
                    jq("#thong_bao_gio_hang").text(them_sp);

                }
                // Sửa đổi dữ liệu
                data.sl_gio_do++;

                // Cập nhật dữ liệu trong object store
                objectStore.put(data);
            };
        };
    }


    let kt_tg;
    jq(document).on("click", "[id^='sp_id']", function (event) {
        // Kiểm tra xem id của phần tử có bắt đầu bằng chuỗi "sp_id" không
        if (event.target.id.startsWith("sp_id")) {
            // Lấy id của phần tử
            var id = event.target.id;

            // Sử dụng regular expression để trích xuất số sau chuỗi "sp_id"
            var match = id.match(/^sp_id(\d+)$/);
            // Lấy số sau chuỗi "sp_id"
            var number = match[1];
            // Xử lý dữ liệu không đồng bộ
            LayDLCSDL(number).then(function () {

                ThemVPVaoGio(number);
                jq("#popup_nguoi_dung").stop().fadeOut(300);
                jq("#popup_gio_hang").stop().fadeOut(300);

                jq("#anh_sp").attr("src", url_sp);
                jq("#ten_sp").text(ten_sp);
                jq("#tien_sp").text("$" + tien_sp);
                jq("#so_luong_sp").text("SL: " + Number(so_luong_sp + 1));
                var popup = jq("#popup_thong_bao");

                // Thiết lập vị trí của popup
                popup.css({
                    top: 15,
                    right: 15
                });

                popup.show();

                if (kt_tg) {
                    clearTimeout(kt_tg);
                }
                kt_tg = setTimeout(() => {
                    popup.hide();
                }, 5000);
            });
        }
    });

    jq("#dong_popup").on("click", function () {
        clearTimeout(kt_tg);
        jq("#popup_thong_bao").hide();
    });

    jq("#xem_gio").on("click", function () {
        window.location.href = "/IsekaiStore/GioHang/index.html";
    });

});

const thong_bao = Vue.createApp({
    template:
        `
        <div id="popup_thong_bao" class="vw-100 thong-bao thong-bao-chuyen-dong bg-white br-20 shadow-sm">
        <div class="pt-3 px-3">
            <div class="d-flex justify-content-between align-items-center">
                <p class="fw-500 pt-2 fs-5">Đã thêm vào giỏ!</p>
                <i id="dong_popup" class="bi bi-x mb-3 px-3 fs-4 nut-nhan-dong"></i>
            </div>
            <hr>
            <div class="row pb-3">
                <div class="col-3">
                    <div class="nen-san-pham-gio br-20 d-flex flex-column justify-content-center align-items-center">
                        <img id="anh_sp" alt="Sản Phẩm" class="w-50 h-auto">
                    </div>
                </div>
                <div class="col-6">
                    <p id="ten_sp" class="fw-500 pt-2"></p>
                    <p id="so_luong_sp" class="text-muted"></p>
                </div>
                <div class="col-3">
                    <div class="d-inline-block d-flex justify-content-end">
                        <p id="tien_sp" class="px-3 mt-1 fs-6 mau-tien-gio fw-500 rounded-3"></p>
                    </div>
                    <div class="d-inline-block d-flex justify-content-end align-items-end">
                        <p id="xem_gio" class="mau-chu-gio pt-2">Xem giỏ</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {

        }
    },
    methods: {

    }
})

const vue_thong_bao = thong_bao.mount('#hien_thong_bao')