const jq = $.noConflict();

jq(function () {

    let vi_tri = 1;
    jq("#dau1").show();
    jq("#dau2").hide();
    jq("#dau3").hide();

    DoiViTri();

    function DoiViTri() {
        jq("#trang" + vi_tri).removeClass("bg-white");
        jq("#trang" + vi_tri).addClass("bg-black");
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
        jq("#dau1").show();
        HoanDoi(1);
        vi_tri = 1;
    }

    function Trang2() {
        jq("#dau2").show();
        HoanDoi(2);
        vi_tri = 2;
    }

    function Trang3() {
        jq("#dau3").show();
        HoanDoi(3);
        vi_tri = 3;
    }

    function HoanDoi(vi_tri_trang) {
        jq("#dau" + vi_tri).hide();
        jq("#trang" + vi_tri_trang).removeClass("bg-white");
        jq("#trang" + vi_tri_trang).addClass("bg-black");
        jq("#trang" + vi_tri).removeClass("bg-black");
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

});