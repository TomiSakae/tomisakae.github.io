function NgauNhienTrongDoan(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function ResetThongSoNgay() {
    let viet_quat = NgauNhienTrongDoan(100, 200);
    localStorage.setItem("viet_quat_ngay", viet_quat);
    localStorage.removeItem("phan_tram_tim_viet_quat");
    localStorage.removeItem("viet_quat_ngay_con_lai");
    let mam_xoi = NgauNhienTrongDoan(200, 400);
    localStorage.setItem("mam_xoi_ngay", mam_xoi);
    localStorage.removeItem("phan_tram_tim_mam_xoi");
    localStorage.removeItem("mam_xoi_ngay_con_lai");
    let dau_tay_dai = NgauNhienTrongDoan(50, 100);
    localStorage.setItem("dau_tay_dai_ngay", dau_tay_dai);
    localStorage.removeItem("phan_tram_tim_dau_tay_dai");
    localStorage.removeItem("dau_tay_dai_ngay_con_lai");

    window.location.replace(window.location.href);
}

