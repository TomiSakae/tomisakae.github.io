let trai_cay_ngay = localStorage.getItem("viet_quat_ngay");
let phan_tram_tim_thay_trai_cay = localStorage.getItem("phan_tram_tim_viet_quat");
let trai_cay_hien_tai = localStorage.getItem("viet_quat_ngay_con_lai");

function TraiCay() {
    localStorage.setItem("phan_tram_tim_viet_quat", phan_tram_tim_thay_trai_cay);
    localStorage.setItem("viet_quat_ngay_con_lai", trai_cay_hien_tai);
}