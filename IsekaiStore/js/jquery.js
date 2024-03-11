const jq = $.noConflict();

jq(function () {

    let vi_tri = 1;
    jq("#dau1").show();
    jq("#dau2").hide();
    jq("#dau3").hide();

    DoiViTri();

    function DoiViTri() {
        jq("#trang" + vi_tri).removeClass("bg-white");
        jq("#trang" + vi_tri).addClass("doi-mau-nen-dong");
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
        jq("#dau1").show();
        HoanDoi(1);
        vi_tri = 1;
    }

    function Trang2() {
        ChuyenViTri();
        jq("#dau2").show();
        HoanDoi(2);
        vi_tri = 2;
    }

    function Trang3() {
        ChuyenViTri();
        jq("#dau3").show();
        HoanDoi(3);
        vi_tri = 3;
    }

    function HoanDoi(vi_tri_trang) {
        jq("#dau" + vi_tri).hide();
        jq("#trang" + vi_tri_trang).removeClass("bg-white");
        jq("#trang" + vi_tri_trang).addClass("doi-mau-nen-dong");
        jq("#trang" + vi_tri).removeClass("doi-mau-nen-dong");
        jq("#trang" + vi_tri).addClass("bg-white");
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
        jq("#nav_than" + nav_than).addClass("bg-black");
        jq("#nav_than" + nav_than).removeClass("text-muted");
        jq("#nav_than" + nav_than).removeClass("nav-than");
        jq("#nav_than" + nav_than).addClass("text-light");
    }

    function XoaCapNhatNavThan(id_nav) {
        jq("#nav_than" + id_nav).removeClass("bg-black");
        jq("#nav_than" + id_nav).addClass("text-muted");
        jq("#nav_than" + id_nav).addClass("nav-than");
        jq("#nav_than" + id_nav).removeClass("text-light");
    }

    jq("#nav_than1").on("click", function () {
        if (nav_than != 1) {
            XoaCapNhatNavThan(nav_than);
            nav_than = 1;
            CapNhatNavThan();
        }
    });

    jq("#nav_than2").on("click", function () {
        if (nav_than != 2) {
            XoaCapNhatNavThan(nav_than);
            nav_than = 2;
            CapNhatNavThan();
        }
    });

    jq("#nav_than3").on("click", function () {
        if (nav_than != 3) {
            XoaCapNhatNavThan(nav_than);
            nav_than = 3;
            CapNhatNavThan();
        }
    });

    jq("#bang1").on("click", function () {
        window.location.href = "TrangVuKhi/MCVanilla/index.html";
    });

});