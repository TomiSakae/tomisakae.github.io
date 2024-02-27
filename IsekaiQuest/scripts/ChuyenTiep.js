let dem = 0;

if (localStorage.getItem("ten") != null) {
    window.location.replace("TrangChu/TrangChu.html");
}

function ChuyenTiep() {
    if (dem == 0) {
        document.getElementById("chuyen_tiep1").classList.add("d-none");
        document.getElementById("chuyen_tiep2").classList.remove("d-none");
    } else {
        let ten_nhan_vat = document.getElementById("nhap_ten").value;

        if (ten_nhan_vat != "") {
            localStorage.setItem("ten", true);
            localStorage.setItem("ten_nv", ten_nhan_vat);
            window.location.replace("TrangChu/TrangChu.html");
        }
    }
    dem++;
}