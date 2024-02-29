let sl_trai_cay = trai_cay_ngay;
let phan_tram_tim_thay = phan_tram_tim_thay_trai_cay;
let sl_trai_cay_hien_tai = trai_cay_hien_tai;
let sl_trai_cay_tim_thay = 0;
let gio_trai_cay = localStorage.getItem("gio_game");
let phut_trai_cay = Number(localStorage.getItem("phut_game"));
let phut_trai_cay_hien_thi = "";
let the_luc_hien_tai = localStorage.getItem("the_luc_nv");
let kiem_tra_trang_thai = localStorage.getItem("kiem_tra_trang_thai");
let doi = localStorage.getItem("doi_nv");
let khat = localStorage.getItem("khat_nv");
let canh_bao_nguoi_choi = ``;
let kt_canh_bao_doi = 0;
let kt_canh_bao_khat = 0;

if (kiem_tra_trang_thai == null) {
    kiem_tra_trang_thai = 0;
}

if (sl_trai_cay_hien_tai == null) {
    sl_trai_cay_hien_tai = sl_trai_cay;
}

if (phan_tram_tim_thay == null) {
    phan_tram_tim_thay = 100.00;
}

ThoiGianTraiCay();

function ThoiGianTraiCay() {
    if (phut_trai_cay >= 60) {
        gio_trai_cay++;
        phut_trai_cay -= 60;
    }
    if (gio_trai_cay >= 24) {
        gio_trai_cay -= 24;
    }

    if (phut_trai_cay < 10) {
        phut_trai_cay_hien_thi = "0" + phut_trai_cay;
    }
    else {
        phut_trai_cay_hien_thi = phut_trai_cay.toString();
    }

    if (kiem_tra_trang_thai >= 10) {
        doi--;
        khat -= 2;
        kiem_tra_trang_thai -= 10;
    }

    if (doi <= 60 && kt_canh_bao_doi == 0) {
        canh_bao_nguoi_choi += `
        <div class="alert alert-warning alert-dismissible fade show">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Cảnh báo!</strong> Bạn đang bắt đầu đói.
        </div>
        `;
        kt_canh_bao_doi = 1;
    }

    if (khat <= 60 && kt_canh_bao_khat == 0) {
        canh_bao_nguoi_choi += `
        <div class="alert alert-warning alert-dismissible fade show">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Cảnh báo!</strong> Bạn đang bắt đầu khát.
        </div>
        `;
        kt_canh_bao_khat = 1;
    }

    if (doi <= 40 && kt_canh_bao_doi == 1) {
        canh_bao_nguoi_choi += `
        <div class="alert alert-danger alert-dismissible fade show">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Nguy hiểm!</strong> Bạn đang rất đói.
        </div>
        `;
        kt_canh_bao_doi = 2;
    }

    if (khat <= 40 && kt_canh_bao_khat == 1) {
        canh_bao_nguoi_choi += `
        <div class="alert alert-danger alert-dismissible fade show">
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            <strong>Nguy hiểm!</strong> Bạn đang rất khát.
        </div>
        `;
        kt_canh_bao_khat = 2;
    }

}

function KiemTraTraiCay() {
    phan_tram_tim_thay = ((sl_trai_cay_hien_tai * 100) / sl_trai_cay).toFixed(2);

    phan_tram_tim_thay_trai_cay = phan_tram_tim_thay;
    TraiCay();

    phut_trai_cay += 5;
    kiem_tra_trang_thai += 5;
    the_luc_hien_tai -= 1;
    localStorage.setItem("the_luc_nv", the_luc_hien_tai);
    localStorage.setItem("kiem_tra_trang_thai", kiem_tra_trang_thai);
    localStorage.setItem("doi_nv", doi);
    localStorage.setItem("khat_nv", khat);
    TinhToanThoiGian(gio_trai_cay, phut_trai_cay);
    ThoiGianTraiCay();


    let so_ngau_nhien = NgauNhienTrongDoan(0, sl_trai_cay);

    if (so_ngau_nhien < sl_trai_cay_hien_tai) {
        sl_trai_cay_hien_tai--;
        sl_trai_cay_tim_thay++;

        trai_cay_hien_tai = sl_trai_cay_hien_tai;
        TraiCay();
    }

}