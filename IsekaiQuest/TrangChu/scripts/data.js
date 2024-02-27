// Tạo một đối tượng Date mới đại diện cho thời gian hiện tại
let ngay_thang_nam_date = new Date();

// Lấy ngày, tháng và năm từ đối tượng Date
let ngay = ngay_thang_nam_date.getDate();
let thang = ngay_thang_nam_date.getMonth() + 1; // Tháng được đếm từ 0, nên cần cộng thêm 1
let nam = ngay_thang_nam_date.getFullYear();

let giao_dien_web = localStorage.getItem("giao_dien");
if (giao_dien_web == "toi") {
    document.querySelector('html').setAttribute('data-bs-theme', 'dark');
}
