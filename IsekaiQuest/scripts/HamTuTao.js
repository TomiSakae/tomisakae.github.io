function NgauNhienTrongDoan(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TinhToanThoiGian(gio, phut) {
    let ngay = localStorage.getItem("ngay_game");
    let kt = 0;
    if (phut >= 60) {
        gio++;
        phut -= 60;
    }
    if (gio >= 24) {
        ngay++;
        kt = 1;
        gio -= 24;
    }
    if (phut < 10) {
        phut = "0" + phut;
    }

    localStorage.setItem("ngay_game", ngay);
    localStorage.setItem("gio_game", gio);
    localStorage.setItem("phut_game", phut);
    if (kt == 1) {
        kt = 0;
        ResetThongSoNgay();
    }
}