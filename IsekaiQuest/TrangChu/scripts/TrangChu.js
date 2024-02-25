let ten_nhan_vat = localStorage.getItem("ten_nhan_vat");

if (ten_nhan_vat == null) {
    ten_nhan_vat = "TomiSakae";
}

document.getElementById("ten_nhan_vat").innerHTML = ten_nhan_vat;

function XoaDuLieu() {
    localStorage.clear();

    window.location.replace("../IsekaiQuest.html");
}