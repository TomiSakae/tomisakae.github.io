const xem_nhanh = Vue.createApp({
    template:
        `
        <div class="modal" id="popup_xem_nhanh">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content">

                    <div class="modal-body">
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div v-html="code_xn"></div>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            code_xn: ``
        }
    },
    methods: {

    }
})

const vue_xem_nhanh = xem_nhanh.mount('#hien_xem_nhanh')

jq(function () {

    let ten_sp_xn = "";
    let tien_sp_xn = 0;
    let url_sp_xn = "";
    let sl_sp_xn = 1;
    let tong_tien_sl_sp_xn = 0;
    let thong_tin_sp_xn = ``;
    let tai_code = ``;
    function LayDLCSDLXemNhanh(id) {
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
                    ten_sp_xn = getRequest.result.ten;
                    tien_sp_xn = getRequest.result.gia;
                    url_sp_xn = getRequest.result.url;
                    thong_tin_sp_xn = getRequest.result.mo_ta;
                    // Gọi resolve khi dữ liệu đã được lấy thành công
                    resolve();
                };
            };
        });
    }

    jq("[id^='xn_sp_id']").on("click", function (event) {
        // Kiểm tra xem id của phần tử có bắt đầu bằng chuỗi "sp_id" không
        if (event.target.id.startsWith("xn_sp_id")) {
            // Lấy id của phần tử
            var id = event.target.id;

            // Sử dụng regular expression để trích xuất số sau chuỗi "sp_id"
            var match = id.match(/^xn_sp_id(\d+)$/);
            // Lấy số sau chuỗi "sp_id"
            var number = match[1];
            // Xử lý dữ liệu không đồng bộ
            tai_code = ``;
            LayDLCSDLXemNhanh(number).then(function () {
                tai_code = `
                <div class="row pb-4 px-2">
                            <div class="col-6">
                                <div
                                    class="nen-san-pham br-20 d-flex flex-column justify-content-center align-items-center">
                                    <img src="`+ url_sp_xn + `"
                                        alt="Xem sản phẩm" class="w-50 h-auto">
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="pt-3 pb-3">
                                    <h5 class="px-2">`+ ten_sp_xn + `</h5>
                                </div>
                                <div class="px-2 d-inline-block">
                                    <p class="px-3 fs-6 mau-tien fw-500 rounded-3">$`+ tien_sp_xn + `</p>
                                </div>
                                <div class="px-2 fw-500 fs-5 pt-1">Tổng tiền: $<span id="tong_so_tien">`+ tien_sp_xn + `</span></div>

                                <div class="px-2 row">
                                    <div class="col-4 pt-3">
                                        <div
                                            class="vung-chon-sl px-3 py-2 d-flex justify-content-center align-items-center">
                                            <div id="giam_sp" class="fw-500 px-2 fs-5 br-50pt py-1 khung-chon-cam"><i
                                                    class="bi bi-dash"></i>
                                            </div>
                                            <div id="so_luong_sp_xn" class="fw-500 px-4 fs-5">1</div>
                                            <div id="tang_sp" class="fw-500 px-2 fs-5 br-50pt py-1 khung-chon-thuong"><i
                                                    class="bi bi-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-8">
                                        <a
                                            class="nav-link nut-gio-hang nen-nut-den text-light mx-1 mt-3 fw-500 text-center">Mua
                                            ngay</a>
                                    </div>
                                </div>
                                <div class="px-2 pt-3">
                                    <h5>Thông tin:</h5>
                                    `+ thong_tin_sp_xn + `
                                </div>
                            </div>
                        </div>

                `

                vue_xem_nhanh.code_xn = tai_code;
            });
        }
    });

    // Tải sự kiện khi DOM được thêm vào
    jq(document).on("click", "#tang_sp", function () {
        sl_sp_xn++;
        if (sl_sp_xn >= 99) {
            sl_sp_xn = 99;
        }
        if (sl_sp_xn > 1) {
            jq("#giam_sp").removeClass("khung-chon-cam").addClass("khung-chon-thuong");
        }
        if (sl_sp_xn == 99) {
            jq(this).removeClass("khung-chon-thuong").addClass("khung-chon-cam");
        }
        tong_tien_sl_sp_xn = tien_sp_xn * sl_sp_xn;
        jq("#so_luong_sp_xn").text(sl_sp_xn);
        jq("#tong_so_tien").text(tong_tien_sl_sp_xn);
    })

    jq(document).on("click", "#giam_sp", function () {
        sl_sp_xn--;
        if (sl_sp_xn <= 1) {
            sl_sp_xn = 1;
        }
        if (sl_sp_xn < 99) {
            jq("#tang_sp").removeClass("khung-chon-cam").addClass("khung-chon-thuong");
        }
        if (sl_sp_xn == 1) {
            jq(this).removeClass("khung-chon-thuong").addClass("khung-chon-cam");
        }
        tong_tien_sl_sp_xn = tien_sp_xn * sl_sp_xn;
        jq("#so_luong_sp_xn").text(sl_sp_xn);
        jq("#tong_so_tien").text(tong_tien_sl_sp_xn);
    })


});
