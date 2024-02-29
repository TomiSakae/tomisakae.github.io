let trai_cay_ngay = localStorage.getItem("dau_tay_dai_ngay");
let phan_tram_tim_thay_trai_cay = localStorage.getItem("phan_tram_tim_dau_tay_dai");
let trai_cay_hien_tai = localStorage.getItem("dau_tay_dai_ngay_con_lai");

function TraiCay() {
    localStorage.setItem("phan_tram_tim_dau_tay_dai", phan_tram_tim_thay_trai_cay);
    localStorage.setItem("dau_tay_dai_ngay_con_lai", trai_cay_hien_tai);
}