let dem = 0;

if (localStorage.getItem("ten") != null) {
    window.location.replace("TrangChu/TrangChu.html");
}

function ChuyenTiep() {
    if (dem == 0) {
        document.getElementById("chuyen_tiep1").classList.add("d-none");
        document.getElementById("chuyen_tiep2").classList.remove("d-none");
    }
    else if (dem == 1) {
        document.getElementById("chuyen_tiep2").classList.add("d-none");
        document.getElementById("chuyen_tiep3").classList.remove("d-none");
    }
    else if (dem == 2) {
        document.getElementById("chuyen_tiep3").classList.add("d-none");
        document.getElementById("chuyen_tiep4").classList.remove("d-none");
    }
    else if (dem == 3) {
        document.getElementById("chuyen_tiep4").classList.add("d-none");
        document.getElementById("chuyen_tiep5").classList.remove("d-none");
    }
    else if (dem == 4) {
        document.getElementById("chuyen_tiep5").classList.add("d-none");
        document.getElementById("chuyen_tiep6").classList.remove("d-none");
    }
    else if (dem == 5) {
        document.getElementById("chuyen_tiep6").classList.add("d-none");
        document.getElementById("chuyen_tiep7").classList.remove("d-none");
    }
    else {
        let ten_nhan_vat = document.getElementById("nhap_ten").value;

        if (ten_nhan_vat != "") {
            localStorage.setItem("ten", true);
            localStorage.setItem("ten_nhan_vat", ten_nhan_vat);
            window.location.replace("TrangChu/TrangChu.html");
        }
    }
    dem++;
}