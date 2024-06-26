$(document).ready(function () {
    // Thiết lập mức máu bắt đầu (có thể thay đổi giá trị ở đây)
    let mau = 100; // Thay đổi giá trị này cho mức máu bắt đầu: 230, 500, 100000
    const mauBanDau = mau; // Lưu mức máu ban đầu để tính toán tỉ lệ

    const $thanhMau = $(".thanh-mau");
    const $anzuImage = $("#anzufutaba");

    // Cập nhật chiều rộng của thanh máu dựa trên mức máu hiện tại
    function capNhatThanhMau() {
        const phanTramMau = (mau / mauBanDau) * 100; // Tính toán tỉ lệ phần trăm
        $thanhMau.css("width", phanTramMau + "%");
    }

    // Gọi hàm cập nhật thanh máu lần đầu tiên
    capNhatThanhMau();

    $anzuImage.click(function () {
        if (mau > 0) {
            mau -= 1; // Giảm máu xuống 1 mỗi lần nhấn
            $("#mau_hien_tai").text(mau);
            capNhatThanhMau(); // Cập nhật chiều rộng của thanh máu
        }
        else {
            Thang();
        }
    });

    let thoi_gian_choi = 100;

    const giam_thoi_gian = setInterval(function () {
        thoi_gian_choi--;
        if (thoi_gian_choi < 0) {
            clearInterval(giam_thoi_gian);
            Thua();
        } else {
            $("#thoi_gian_con_lai").text(thoi_gian_choi);
        }
    }, 1000);

});

function Thua() {
    $("#ket_thuc_thu_thap").modal("show");

    $("#thang_thua").text("Thu Thập Thất Bại!");
}

function Thang() {
    $("#ket_thuc_thu_thap").modal("show");

    $("#thang_thua").text("Thu Thập Thành Công!");

    let mang_thu_thap = JSON.parse(localStorage.getItem("mtt"));

    mang_thu_thap[0] += 1;
    localStorage.setItem("mtt", JSON.stringify(mang_thu_thap));
}

function QuayLai() {
    window.location.href = "/";
}
