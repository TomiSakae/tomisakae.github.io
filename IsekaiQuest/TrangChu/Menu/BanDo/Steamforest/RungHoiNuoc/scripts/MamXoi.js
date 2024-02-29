let trai_cay_ngay = localStorage.getItem("mam_xoi_ngay");
let phan_tram_tim_thay_trai_cay = localStorage.getItem("phan_tram_tim_mam_xoi");
let trai_cay_hien_tai = localStorage.getItem("mam_xoi_ngay_con_lai");

function TraiCay() {
    localStorage.setItem("phan_tram_tim_mam_xoi", phan_tram_tim_thay_trai_cay);
    localStorage.setItem("mam_xoi_ngay_con_lai", trai_cay_hien_tai);
}