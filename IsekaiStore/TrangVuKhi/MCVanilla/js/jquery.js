const jq = $.noConflict();

const tai_dl_trang = Vue.createApp({
    data() {
        return {
            code_dl_thanh_kiem: ``,
            code_dl_cay_cung: ``,
            code_dl_cay_no: ``,
            code_dl_cay_giao: ``
        }
    },
    methods: {

    }
})

const vue_tai_dl_trang = tai_dl_trang.mount('#dl_trang')

jq(function () {
    let code_dl_trang_thanh_kiem = ``;
    let code_dl_trang_cay_cung = ``;
    let code_dl_trang_cay_no = ``;
    let code_dl_trang_cay_giao = ``;
    function TaiDLTrang() {
        let nhap_dl_trang_thanh_kiem = [];
        let nhap_dl_trang_cay_cung = [];
        let nhap_dl_trang_cay_no = [];
        let nhap_dl_trang_cay_giao = [];
        function LayDLCSDLVaoTrang() {
            let request = indexedDB.open("IsekaiStore", 4);
            let db;

            // Tạo một Promise để xử lý việc trả về dữ liệu từ indexedDB
            return new Promise(function (resolve) {
                request.onsuccess = function (event) {
                    db = event.target.result;
                    let transaction = db.transaction(["san_pham"]);
                    let objectStore = transaction.objectStore("san_pham");

                    let promises = []; // Mảng lưu trữ các lời hứa

                    for (let i = 1; i <= localStorage.getItem("so_sp"); i++) {
                        let id = i.toString();
                        let getRequest = objectStore.get(id);
                        let promise = new Promise(function (resolve) {
                            getRequest.onsuccess = function (event) {
                                let lay_gio_do = event.target.result;
                                if (lay_gio_do.game == "minecraft") {
                                    switch (lay_gio_do.loai) {
                                        case "thanh_kiem":
                                            nhap_dl_trang_thanh_kiem.push(lay_gio_do);
                                            break;
                                        case "cay_cung":
                                            nhap_dl_trang_cay_cung.push(lay_gio_do);
                                            break;
                                        case "cay_no":
                                            nhap_dl_trang_cay_no.push(lay_gio_do);
                                            break;
                                        case "cay_giao":
                                            nhap_dl_trang_cay_giao.push(lay_gio_do);
                                            break;

                                    }
                                }
                                resolve(); // Đánh dấu lời hứa này đã hoàn thành
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

        LayDLCSDLVaoTrang().then(function () {
            let ten_sp = "";
            let gia_sp = 0;
            let anh_sp = "";
            let id_sp = 0;
            let mo_ta_sp = "";
            code_dl_trang_thanh_kiem = ``;
            code_dl_trang_cay_cung = ``;
            code_dl_trang_cay_no = ``;
            code_dl_trang_cay_giao = ``;
            for (let i = nhap_dl_trang_thanh_kiem.length - 1; i >= 0; i--) {
                let sp = nhap_dl_trang_thanh_kiem[i];
                ten_sp = sp.ten;
                gia_sp = sp.gia;
                anh_sp = sp.url;
                id_sp = sp.id;
                mo_ta_sp = sp.mo_ta_ngan;
                code_dl_trang_thanh_kiem += `
                <div id="sp`+ id_sp + `" class="col-3 nut-nhan pb-4">
                <div
                    class="nen-san-pham br-20 d-flex flex-column justify-content-center align-items-center chon-san-pham position-relative">
                    <img src="`+ anh_sp + `"
                        alt="Sản Phẩm" class="w-50 h-auto">
                    <a id="sp_id`+ id_sp + `"
                        class="nav-link chuyen-dong-nut nut-san-pham1 small nen-nut-san-pham-den br-20 py-1 px-3 text-light"><i
                            class="pe-2 bi bi-handbag"></i>Thêm
                        vào giỏ</a>
                    <a id="xn_sp_id`+ id_sp + `" data-bs-toggle="modal" data-bs-target="#popup_xem_nhanh"
                        class="nav-link chuyen-dong-nut nut-san-pham2 small nen-nut-san-pham-trang br-20 py-1 px-3 shadow-sm"><i
                            class="pe-2 bi bi-arrows-fullscreen"></i></i>Xem nhanh</a>
                </div>
                <div class="pt-3">
                    <h5 class="px-2">`+ ten_sp + `</h5>
                    <p class="px-2 text-muted">`+ mo_ta_sp + `</p>
                </div>
                <div class="px-2 pt-1 d-inline-block">
                    <p class="px-3 fs-6 mau-tien fw-500 rounded-3">$`+ gia_sp + `</p>
                </div>
            </div>
                        `;
            }
            vue_tai_dl_trang.code_dl_thanh_kiem = code_dl_trang_thanh_kiem;

            for (let i = nhap_dl_trang_cay_cung.length - 1; i >= 0; i--) {
                let sp = nhap_dl_trang_cay_cung[i];
                ten_sp = sp.ten;
                gia_sp = sp.gia;
                anh_sp = sp.url;
                id_sp = sp.id;
                mo_ta_sp = sp.mo_ta_ngan;
                code_dl_trang_cay_cung += `
                <div id="sp`+ id_sp + `" class="col-3 nut-nhan pb-4">
                <div
                    class="nen-san-pham br-20 d-flex flex-column justify-content-center align-items-center chon-san-pham position-relative">
                    <img src="`+ anh_sp + `"
                        alt="Sản Phẩm" class="w-50 h-auto">
                    <a id="sp_id`+ id_sp + `"
                        class="nav-link chuyen-dong-nut nut-san-pham1 small nen-nut-san-pham-den br-20 py-1 px-3 text-light"><i
                            class="pe-2 bi bi-handbag"></i>Thêm
                        vào giỏ</a>
                    <a id="xn_sp_id`+ id_sp + `" data-bs-toggle="modal" data-bs-target="#popup_xem_nhanh"
                        class="nav-link chuyen-dong-nut nut-san-pham2 small nen-nut-san-pham-trang br-20 py-1 px-3 shadow-sm"><i
                            class="pe-2 bi bi-arrows-fullscreen"></i></i>Xem nhanh</a>
                </div>
                <div class="pt-3">
                    <h5 class="px-2">`+ ten_sp + `</h5>
                    <p class="px-2 text-muted">`+ mo_ta_sp + `</p>
                </div>
                <div class="px-2 pt-1 d-inline-block">
                    <p class="px-3 fs-6 mau-tien fw-500 rounded-3">$`+ gia_sp + `</p>
                </div>
            </div>
                        `;
            }
            vue_tai_dl_trang.code_dl_cay_cung = code_dl_trang_cay_cung;

            for (let i = nhap_dl_trang_cay_no.length - 1; i >= 0; i--) {
                let sp = nhap_dl_trang_cay_no[i];
                ten_sp = sp.ten;
                gia_sp = sp.gia;
                anh_sp = sp.url;
                id_sp = sp.id;
                mo_ta_sp = sp.mo_ta_ngan;
                code_dl_trang_cay_no += `
                <div id="sp`+ id_sp + `" class="col-3 nut-nhan pb-4">
                <div
                    class="nen-san-pham br-20 d-flex flex-column justify-content-center align-items-center chon-san-pham position-relative">
                    <img src="`+ anh_sp + `"
                        alt="Sản Phẩm" class="w-50 h-auto">
                    <a id="sp_id`+ id_sp + `"
                        class="nav-link chuyen-dong-nut nut-san-pham1 small nen-nut-san-pham-den br-20 py-1 px-3 text-light"><i
                            class="pe-2 bi bi-handbag"></i>Thêm
                        vào giỏ</a>
                    <a id="xn_sp_id`+ id_sp + `" data-bs-toggle="modal" data-bs-target="#popup_xem_nhanh"
                        class="nav-link chuyen-dong-nut nut-san-pham2 small nen-nut-san-pham-trang br-20 py-1 px-3 shadow-sm"><i
                            class="pe-2 bi bi-arrows-fullscreen"></i></i>Xem nhanh</a>
                </div>
                <div class="pt-3">
                    <h5 class="px-2">`+ ten_sp + `</h5>
                    <p class="px-2 text-muted">`+ mo_ta_sp + `</p>
                </div>
                <div class="px-2 pt-1 d-inline-block">
                    <p class="px-3 fs-6 mau-tien fw-500 rounded-3">$`+ gia_sp + `</p>
                </div>
            </div>
                        `;
            }
            vue_tai_dl_trang.code_dl_cay_no = code_dl_trang_cay_no;

            for (let i = nhap_dl_trang_cay_giao.length - 1; i >= 0; i--) {
                let sp = nhap_dl_trang_cay_giao[i];
                ten_sp = sp.ten;
                gia_sp = sp.gia;
                anh_sp = sp.url;
                id_sp = sp.id;
                mo_ta_sp = sp.mo_ta_ngan;
                code_dl_trang_cay_giao += `
                <div id="sp`+ id_sp + `" class="col-3 nut-nhan pb-4">
                <div
                    class="nen-san-pham br-20 d-flex flex-column justify-content-center align-items-center chon-san-pham position-relative">
                    <img src="`+ anh_sp + `"
                        alt="Sản Phẩm" class="w-50 h-auto">
                    <a id="sp_id`+ id_sp + `"
                        class="nav-link chuyen-dong-nut nut-san-pham1 small nen-nut-san-pham-den br-20 py-1 px-3 text-light"><i
                            class="pe-2 bi bi-handbag"></i>Thêm
                        vào giỏ</a>
                    <a id="xn_sp_id`+ id_sp + `" data-bs-toggle="modal" data-bs-target="#popup_xem_nhanh"
                        class="nav-link chuyen-dong-nut nut-san-pham2 small nen-nut-san-pham-trang br-20 py-1 px-3 shadow-sm"><i
                            class="pe-2 bi bi-arrows-fullscreen"></i></i>Xem nhanh</a>
                </div>
                <div class="pt-3">
                    <h5 class="px-2">`+ ten_sp + `</h5>
                    <p class="px-2 text-muted">`+ mo_ta_sp + `</p>
                </div>
                <div class="px-2 pt-1 d-inline-block">
                    <p class="px-3 fs-6 mau-tien fw-500 rounded-3">$`+ gia_sp + `</p>
                </div>
            </div>
                        `;
            }
            vue_tai_dl_trang.code_dl_cay_giao = code_dl_trang_cay_giao;

            jq("#trang_chinh").removeClass("load-code");
        });
    }

    TaiDLTrang();
});