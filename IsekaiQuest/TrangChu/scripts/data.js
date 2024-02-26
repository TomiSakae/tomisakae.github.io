// Tạo một đối tượng Date mới đại diện cho thời gian hiện tại
let ngay_thang_nam = new Date();

// Lấy ngày, tháng và năm từ đối tượng Date
let ngay = ngay_thang_nam.getDate();
let thang = ngay_thang_nam.getMonth() + 1; // Tháng được đếm từ 0, nên cần cộng thêm 1
let nam = ngay_thang_nam.getFullYear();

document.getElementById("ngay_thang_nam").innerHTML = "Ngày " + ngay + " Tháng " + thang + " Năm " + nam;

let kiem_tra_diem_danh = localStorage.getItem("ngay");

if (kiem_tra_diem_danh == 0 || kiem_tra_diem_danh == ngay) {
    document.getElementById("qua_diem_danh").innerHTML = "Bạn đã nhận được quà điểm danh.";
    document.getElementById("nut_diem_danh").classList.add("d-none");
}

function DiemDanh() {
    if (kiem_tra_diem_danh == null || kiem_tra_diem_danh != ngay) {
        localStorage.setItem("ngay", ngay);
        kiem_tra_diem_danh = 0;
        document.getElementById("qua_diem_danh").innerHTML = "Bạn đã nhận được quà điểm danh.";
        document.getElementById("nut_diem_danh").classList.add("d-none");
    }
}


let ten_nhan_vat = localStorage.getItem("ten_nhan_vat");

if (ten_nhan_vat == null) {
    ten_nhan_vat = "TomiSakae";
}

document.getElementById("ten_nhan_vat").innerHTML = ten_nhan_vat;
