const jq = $.noConflict();

const xem_gio_hang = Vue.createApp({
    data() {
        return {
            code_gh: ``,
            hien_mua: ``
        }
    },
    methods: {

    }
})

const vue_xem_gio_hang = xem_gio_hang.mount('#hien_gio_hang')

jq(function () {

    let tong_tien_trong_gio = 0;
    let code_gio_hang_them = ``;
    let nhap_gio_do_them = [];
    function XuLyGioHangThem() {
        let sl_gd = JSON.parse(localStorage.getItem("sl_gh")) || [];
        if (sl_gd) {
            nhap_gio_do_them = [];
            function LayDLCSDLVaoGioThem() {
                let request = indexedDB.open("IsekaiStore", 4);
                let db;

                // Tạo một Promise để xử lý việc trả về dữ liệu từ indexedDB
                return new Promise(function (resolve) {
                    request.onsuccess = function (event) {
                        db = event.target.result;
                        let transaction = db.transaction(["san_pham"]);
                        let objectStore = transaction.objectStore("san_pham");

                        let promises = []; // Mảng lưu trữ các lời hứa

                        for (let i = 0; i < sl_gd.length; i++) {
                            let id = sl_gd[i].toString();
                            let getRequest = objectStore.get(id);
                            let promise = new Promise(function (resolve) {
                                getRequest.onsuccess = function (event) {
                                    let lay_gio_do = event.target.result;
                                    if (lay_gio_do.sl_gio_do > 0) {
                                        nhap_gio_do_them.push(lay_gio_do);
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

            LayDLCSDLVaoGioThem().then(function () {
                let ten_sp = "";
                let sl_sp = 0;
                let gia_sp = 0;
                let dem = 0;
                let anh_sp = "";
                let mo_ta_sp = ``;
                let id_sp = 0;
                let id_sp_pre = 0;
                code_gio_hang_them = ``;
                tong_tien_trong_gio = 0;
                for (let sp of nhap_gio_do_them) {
                    ten_sp = sp.ten;
                    sl_sp = sp.sl_gio_do;
                    gia_sp = sp.gia;
                    anh_sp = sp.url;
                    id_sp = sp.id;
                    mo_ta_sp = sp.mo_ta;
                    tong_tien_trong_gio += Number(sp.gia) * Number(sp.sl_gio_do);
                    let kt_nut = (sl_sp > 1) ? "khung-chon-thuong" : "khung-chon-cam";
                    if (dem > 0) {
                        code_gio_hang_them += `<hr class="id_gach_chan` + id_sp + ` id_gach_chan` + id_sp_pre + `">`;
                    }
                    code_gio_hang_them += `
                    <div id="sp_o_gio_them`+ id_sp + `" class="row pb-4 pt-4" >
                    <div class="col-3">
                        <div
                            class="nen-san-pham-gio-hang-them br-20 d-flex flex-column justify-content-center align-items-center">
                            <img src="`+ anh_sp + `"
                                alt="Sản Phẩm" class="w-50 h-auto">
                        </div>
                    </div>
                    <div class="col-9">
                        <div class="d-flex justify-content-between align-items-start">
                            <p class="fw-500 pt-2 fs-5">`+ ten_sp + `</p>
                            <div class="px-3 py-2 d-flex justify-content-center align-items-center">
                                <div id="giam_sp`+ id_sp + `" class="fw-500 px-2 fs-6 br-50pt py-1 ` + kt_nut + ` "><i
                    class="bi bi-dash" ></i >
                                </div>
                                <div id="so_luong_sp_gh`+ id_sp + `" class="fw-500 px-4 fs-5">` + sl_sp + `</div>
                                <div id="tang_sp`+ id_sp + `" class="fw-500 px-2 fs-6 br-50pt py-1 khung-chon-thuong"><i
                                        class="bi bi-plus"></i>
                                </div>
                            </div>

                        <div class="d-inline-block d-flex justify-content-end">
                            <p class="px-3 mt-2 me-3 fs-6 mau-tien-gio-hang fw-500 rounded-3">$`+ gia_sp + `</p>
                        </div>
                        </div >
                        <div class="small text-muted lh-1">
                           `+ mo_ta_sp + `
                        </div>
                            <div class="d-inline-block d-flex justify-content-end align-items-end">
                                <p id="xoa_sp_trong_gio_them`+ id_sp + `" class="px-3 me-4 mau-chu-gio-hang pt-2 pe-2">Xóa</p>
                            </div>
                    </div >
                </div >
                        `;
                    dem++;
                    id_sp_pre = id_sp;
                }
                vue_xem_gio_hang.hien_mua = `
                        <div div class="px-5 pt-3 keo-xuong" >
                            <div class="px-2 fw-500 fs-5 pt-1">Tổng tiền: $<span id="tong_so_tien_gio">`+ tong_tien_trong_gio + `
                                </span>
                            </div>
                    <a class="nav-link nut-gio-hang nen-nut-den text-light mx-1 mt-4 fw-500 text-center">Mua
                        ngay</a>
                        </div>
                        `;
                vue_xem_gio_hang.code_gh = code_gio_hang_them;
                jq("#trang_chinh").removeClass("d-none");
            });
        }
    }

    XuLyGioHangThem();
    let sl_sp_gh = 1;

    function SuaVPVaoGioThem(id, kt) {
        let request = indexedDB.open("IsekaiStore", 4);
        let db;

        return new Promise(function (resolve) {
            request.onsuccess = function (event) {
                db = event.target.result;
                let transaction = db.transaction(["san_pham"], "readwrite");
                let objectStore = transaction.objectStore("san_pham");

                let getRequest = objectStore.get(id);
                getRequest.onsuccess = function (event) {
                    let data = event.target.result;

                    // Sửa đổi dữ liệu
                    sl_sp_gh = data.sl_gio_do;
                    if (kt == 1) {
                        data.sl_gio_do++;
                    }
                    else {
                        data.sl_gio_do--;
                        if (data.sl_gio_do <= 1) {
                            data.sl_gio_do = 1;
                        }
                    }
                    // Cập nhật dữ liệu trong object store
                    objectStore.put(data);
                    resolve();
                };
            };
        });
    }

    let sl_vp_xoa_them = 0;
    let tien_vp_xoa_them = 0;
    function LayDLCSDLXoaGioThem(id) {
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
                    tien_vp_xoa_them = getRequest.result.gia;
                    sl_vp_xoa_them = getRequest.result.sl_gio_do;
                    // Gọi resolve khi dữ liệu đã được lấy thành công
                    resolve();
                };
            };
        });
    }

    function SuaGTCSDLXoaGioThem(id) {
        let request = indexedDB.open("IsekaiStore", 4);
        let db;

        request.onsuccess = function (event) {
            db = event.target.result;
            let transaction = db.transaction(["san_pham"], "readwrite");
            let objectStore = transaction.objectStore("san_pham");

            let getRequest = objectStore.get(id);
            getRequest.onsuccess = function (event) {
                let data = event.target.result;

                // Sửa đổi dữ liệu
                data.sl_gio_do = "0";

                // Cập nhật dữ liệu trong object store
                objectStore.put(data);
            };
        };
    }

    function XoaDLMangGioDoThem(id) {

        let gioHang = JSON.parse(localStorage.getItem("sl_gh")) || [];

        // Thêm phần tử mới vào mảng
        if (Array.isArray(gioHang)) {
            // Giá trị id của phần tử cần xóa
            var idToDelete = id; // Ví dụ xóa phần tử có id là 2

            // Tìm vị trí của phần tử trong mảng
            var indexToDelete = -1;
            for (var i = 0; i < gioHang.length; i++) {
                if (gioHang[i] == idToDelete) {
                    indexToDelete = i;
                    break;
                }
            }

            // Nếu tìm thấy phần tử có id cần xóa
            if (indexToDelete !== -1) {
                // Xóa phần tử tại vị trí indexToDelete
                gioHang.splice(indexToDelete, 1);

                // Cập nhật giao diện nếu cần
            }
        }

        // Lưu mảng mới vào Local Storage
        localStorage.setItem("sl_gh", JSON.stringify(gioHang));
    }

    jq(document).on("click", "[id^='xoa_sp_trong_gio_them']", function (event) {
        // Kiểm tra xem id của phần tử có bắt đầu bằng chuỗi "sp_id" không
        if (this.id.startsWith("xoa_sp_trong_gio_them")) {
            // Lấy id của phần tử

            // Sử dụng regular expression để trích xuất số sau chuỗi "sp_id"
            var match = this.id.match(/^xoa_sp_trong_gio_them(\d+)$/);
            // Lấy số sau chuỗi "sp_id"
            var number = match[1];

            LayDLCSDLXoaGioThem(number).then(function () {
                SuaGTCSDLXoaGioThem(number);
                XoaDLMangGioDoThem(number);
                jq("#sp_o_gio_them" + number).remove();
                jq(".id_gach_chan" + number).remove();
                if (window.kt_sua_doi == 1) {
                    tong_tien_trong_gio = window.tong_tien_doi;
                    window.kt_sua_doi = 0;
                }
                tong_tien_trong_gio -= sl_vp_xoa_them * tien_vp_xoa_them;
                jq("#tong_so_tien_gio").text(tong_tien_trong_gio);
            });
        }
    });

    jq(document).on("click", "[id^='tang_sp']", function (event) {
        if (this.id.startsWith("tang_sp")) {
            // Các xử lý khi nhấn vào nút có id bắt đầu bằng "tang_sp" ở đây
            // Lấy id của phần tử
            var id = this.id;

            // Sử dụng regular expression để trích xuất số sau chuỗi "sp_id"
            var match = id.match(/^tang_sp(\d+)$/);
            // Lấy số sau chuỗi "sp_id"
            var number = match[1];

            for (let sp of nhap_gio_do_them) {
                if (sp.id == number) {
                    SuaVPVaoGioThem(number, 1).then(function () {
                        sl_sp_gh++;
                        if (sl_sp_gh > 1) {
                            jq("#giam_sp" + number).removeClass("khung-chon-cam").addClass("khung-chon-thuong");
                        }
                        jq("#so_luong_sp_gh" + number).text(sl_sp_gh);
                        tong_tien_trong_gio += Number(sp.gia);
                        jq("#tong_so_tien_gio").text(tong_tien_trong_gio);
                    });
                }
            }
        }
    });

    jq(document).on("click", "[id^='giam_sp']", function (event) {
        if (this.id.startsWith("giam_sp")) {
            // Các xử lý khi nhấn vào nút có id bắt đầu bằng "tang_sp" ở đây
            // Lấy id của phần tử
            var id = this.id;

            // Sử dụng regular expression để trích xuất số sau chuỗi "sp_id"
            var match = id.match(/^giam_sp(\d+)$/);
            // Lấy số sau chuỗi "sp_id"
            var number = match[1];

            for (let sp of nhap_gio_do_them) {
                if (sp.id == number) {
                    SuaVPVaoGioThem(number, 0).then(function () {
                        sl_sp_gh--;
                        if (sl_sp_gh <= 1) {
                            sl_sp_gh = 1;
                        }
                        if (sl_sp_gh == 1) {
                            jq("#giam_sp" + number).removeClass("khung-chon-thuong").addClass("khung-chon-cam");
                        }
                        jq("#so_luong_sp_gh" + number).text(sl_sp_gh);
                        tong_tien_trong_gio -= Number(sp.gia);
                        jq("#tong_so_tien_gio").text(tong_tien_trong_gio);
                    });
                }
            }
        }
    });


    jq(document).on("click", "#giam_sp", function () {
        sl_sp_gh--;
        if (sl_sp_gh <= 1) {
            sl_sp_gh = 1;
        }
        if (sl_sp_gh < 99) {
            jq("#tang_sp").removeClass("khung-chon-cam").addClass("khung-chon-thuong");
        }
        if (sl_sp_gh == 1) {
            jq(this).removeClass("khung-chon-thuong").addClass("khung-chon-cam");
        }
        jq("#so_luong_sp_gh").text(sl_sp_gh);
    });
});

