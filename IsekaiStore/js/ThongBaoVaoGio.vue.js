jq(function () {

    let ten_sp = "";
    let tien_sp = 0;
    let url_sp = "";
    function LayDLCSDL(id) {
        let request = indexedDB.open("IsekaiStore", 4);
        let db;

        // Tạo một Promise để xử lý việc trả về dữ liệu từ indexedDB
        return new Promise(function (resolve) {
            request.onsuccess = function (event) {
                db = event.target.result;
                let transaction = db.transaction(["gio_do"]);
                let objectStore = transaction.objectStore("gio_do");

                let getRequest = objectStore.get(id);
                getRequest.onsuccess = function (event) {
                    ten_sp = getRequest.result.ten;
                    tien_sp = getRequest.result.gia;
                    url_sp = getRequest.result.url;
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
            let transaction = db.transaction(["gio_do"], "readwrite");
            let objectStore = transaction.objectStore("gio_do");

            let getRequest = objectStore.get(id);
            getRequest.onsuccess = function (event) {
                let data = event.target.result;

                if (data.sl == 0) {
                    // Lấy dữ liệu từ Local Storage và chuyển đổi thành mảng (nếu có)
                    let gioHang = JSON.parse(localStorage.getItem("sl_gh")) || [];

                    // Thêm phần tử mới vào mảng
                    if (Array.isArray(gioHang)) {
                        gioHang.push(data.id);
                    }

                    // Lưu mảng mới vào Local Storage
                    localStorage.setItem("sl_gh", JSON.stringify(gioHang));

                }
                // Sửa đổi dữ liệu
                data.sl++;

                // Cập nhật dữ liệu trong object store
                objectStore.put(data);
            };
        };
    }


    let kt_tg;
    jq("[id^='sp_id']").on("click", function (event) {
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
                    popup.stop().fadeOut(300);
                }, 5000);
            });
        }
    });

    jq("#xem_gio").on("click", function () {
        window.location.href = "TrangVuKhi/MCVanilla/index.html";
    });

});

const thong_bao = Vue.createApp({
    template:
        `
        <div id="popup_thong_bao" class="vw-100 thong-bao thong-bao-chuyen-dong bg-white br-20 shadow-sm">
        <div class="pt-3 px-3">
            <p class="fw-500">Đã thêm vào giỏ!</p>
            <hr>
            <div class="row pb-3">
                <div class="col-3">
                    <div class="nen-san-pham-gio br-20 d-flex flex-column justify-content-center align-items-center">
                        <img id="anh_sp" alt="Sản Phẩm" class="w-50 h-auto">
                    </div>
                </div>
                <div class="col-6">
                    <p id="ten_sp" class="fw-500 pt-2"></p>
                    <p class="text-muted">SL: 1</p>
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