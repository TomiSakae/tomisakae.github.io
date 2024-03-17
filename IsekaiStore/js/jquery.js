const jq = $.noConflict();

jq(function () {

    let sl_vp_vk_b1 = 0;
    let sl_vp_vk_b2 = 0;
    let sl_vp_gt_b1 = 0;
    let request = indexedDB.open("IsekaiStore", 4);
    let db;

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["san_pham"]);
        let objectStore = transaction.objectStore("san_pham");
        for (let i = 1; i <= localStorage.getItem("so_sp"); i++) {
            let id = i.toString();
            let getRequest = objectStore.get(id);
            getRequest.onsuccess = function (event) {
                let lay_vat_pham = event.target.result;
                if (lay_vat_pham.dang == "vu_khi" && lay_vat_pham.game == "minecraft") {
                    sl_vp_vk_b1++;
                    jq("#sl_vu_khi_bang1").text(sl_vp_vk_b1);
                }
                else if (lay_vat_pham.dang == "vu_khi" && lay_vat_pham.game == "terraria") {
                    sl_vp_vk_b2++;
                    jq("#sl_vu_khi_bang2").text(sl_vp_vk_b2);
                }
                else if (lay_vat_pham.dang == "giap_tru" && lay_vat_pham.game == "minecraft") {
                    sl_vp_gt_b1++;
                    jq("#sl_giap_tru_bang1").text(sl_vp_gt_b1);
                }
            };
        }
    };

    let vi_tri = 1;
    jq("#dau1").removeClass("d-none");

    DoiViTri();

    function DoiViTri() {
        jq("#trang" + vi_tri).removeClass("bg-white").addClass("doi-mau-nen-dong");
    }

    let chuyen_dong;
    function ChuyenViTri() {
        clearInterval(chuyen_dong);
        chuyen_dong = setInterval(function () {
            ChuyenTiep(0);
        }, 5000);
    }

    ChuyenViTri();

    function ChuyenTiep(id) {
        switch (vi_tri) {
            case 1:
                switch (id) {
                    case 0:
                        Trang2();
                        break;
                    case 1:
                        Trang3();
                        break;
                }
                break;
            case 2:
                switch (id) {
                    case 0:
                        Trang3();
                        break;
                    case 1:
                        Trang1();
                        break;
                }
                break;
            case 3:
                switch (id) {
                    case 0:
                        Trang1();
                        break;
                    case 1:
                        Trang2();
                        break;
                }
                break;
        }
    }

    function Trang1() {
        ChuyenViTri();
        jq("#dau1").removeClass("d-none");
        HoanDoi(1);
        vi_tri = 1;
    }

    function Trang2() {
        ChuyenViTri();
        jq("#dau2").removeClass("d-none");
        HoanDoi(2);
        vi_tri = 2;
    }

    function Trang3() {
        ChuyenViTri();
        jq("#dau3").removeClass("d-none");
        HoanDoi(3);
        vi_tri = 3;
    }

    function HoanDoi(vi_tri_trang) {
        jq("#dau" + vi_tri).addClass("d-none");
        jq("#trang" + vi_tri_trang).removeClass("bg-white").addClass("doi-mau-nen-dong");
        jq("#trang" + vi_tri).removeClass("doi-mau-nen-dong").addClass("bg-white");
    }

    jq("#trang1").on("click", Trang1);

    jq("#trang2").on("click", Trang2);

    jq("#trang3").on("click", Trang3);

    jq(".mui_ten_trai").on("click", function () {
        ChuyenViTri();
        ChuyenTiep(1);
    });

    jq(".mui_ten_phai").on("click", function () {
        ChuyenViTri();
        ChuyenTiep(0);
    });

    let nav_than = 1;

    CapNhatNavThan();
    function CapNhatNavThan() {
        jq("#nav_than" + nav_than).addClass("bg-black text-light").removeClass("text-muted nav-than");
    }

    function XoaCapNhatNavThan(id_nav) {
        jq("#nav_than" + id_nav).removeClass("bg-black text-light").addClass("text-muted nav-than");
    }

    jq("#nav_than1").on("click", function () {
        if (nav_than != 1) {
            jq("#bang_giap_tru").addClass("d-none");
            jq("#bang_phu_kien").addClass("d-none");
            XoaCapNhatNavThan(nav_than);
            nav_than = 1;
            CapNhatNavThan();
            jq("#bang_vu_khi").removeClass("d-none");
        }
    });

    jq("#nav_than2").on("click", function () {
        if (nav_than != 2) {
            jq("#bang_vu_khi").addClass("d-none");
            jq("#bang_phu_kien").addClass("d-none");
            XoaCapNhatNavThan(nav_than);
            nav_than = 2;
            CapNhatNavThan();
            jq("#bang_giap_tru").removeClass("d-none");
        }
    });

    jq("#nav_than3").on("click", function () {
        if (nav_than != 3) {
            jq("#bang_vu_khi").addClass("d-none");
            jq("#bang_giap_tru").addClass("d-none");
            XoaCapNhatNavThan(nav_than);
            nav_than = 3;
            CapNhatNavThan();
            jq("#bang_phu_kien").removeClass("d-none");
        }
    });

    jq("#bang1_vu_khi").on("click", function () {
        window.location.href = "TrangVuKhi/MCVanilla/index.html";
    });

    jq("#bang2_vu_khi").on("click", function () {
        window.location.href = "TrangVuKhi/Terraria/index.html";
    });

    jq("#bang1_giap_tru").on("click", function () {
        window.location.href = "TrangGiapTru/MCVanilla/index.html";
    });

});

function XDL() {
    localStorage.clear();
    indexedDB.deleteDatabase("IsekaiStore");
}