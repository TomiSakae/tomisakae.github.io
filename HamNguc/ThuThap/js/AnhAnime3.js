$(document).ready(function () {
    // Thiết lập mức máu bắt đầu (có thể thay đổi giá trị ở đây)
    mau_ban_dau = 150; // Thay đổi giá trị này cho mức máu bắt đầu: 230, 500, 100000
    mau_toi_da = mau_ban_dau; // Lưu mức máu ban đầu để tính toán tỉ lệ

    let thong_tin = ``;

    thong_tin += `
    <div class="thong-tin pb-2 mb-2">
        <h6>Chỉ Số</h6>
        <span class="small">Sức tấn công: 1</span>
    </div>
    `;

    $("#thong_tin_tran_dau").html(thong_tin);

    $("#mau_toi_da").text(mau_toi_da);

    const $thanhMau = $(".thanh-mau");
    const $nhan_anh = $("#nhan_anh_thu_thap");

    // Cập nhật chiều rộng của thanh máu dựa trên mức máu hiện tại
    window.capNhatThanhMau = function () {
        $("#mau_hien_tai").text(mau_ban_dau);
        const phanTramMau = (mau_ban_dau / mau_toi_da) * 100; // Tính toán tỉ lệ phần trăm
        $thanhMau.css("width", phanTramMau + "%");
    };
    // Gọi hàm cập nhật thanh máu lần đầu tiên
    window.capNhatThanhMau();

    $nhan_anh.click(function () {
        if (mau_ban_dau > 0) {
            mau_ban_dau -= ATK; // Giảm máu xuống 1 mỗi lần nhấn
            window.capNhatThanhMau(); // Cập nhật chiều rộng của thanh máu
        }
        else {
            Thang();
        }
    });

});

thoi_gian = 100;
$("#thoi_gian_con_lai").text(thoi_gian);

const giam_thoi_gian = setInterval(function () {
    thoi_gian--;
    if (thoi_gian < 0) {
        clearInterval(giam_thoi_gian);
        Thua();
    } else {
        $("#thoi_gian_con_lai").text(thoi_gian);
    }
}, 1000);

function Thua() {
    $("#ket_thuc_thu_thap").modal("show");

    $("#thang_thua").text("Thu Thập Thất Bại!");
    clearInterval(giam_thoi_gian);
}

function Thang() {
    $("#ket_thuc_thu_thap").modal("show");

    $("#thang_thua").text("Thu Thập Thành Công!");
    clearInterval(giam_thoi_gian);

    let mang_thu_thap = JSON.parse(localStorage.getItem("mtt"));

    mang_thu_thap[2] += 1;
    localStorage.setItem("mtt", JSON.stringify(mang_thu_thap));
}

function QuayLai() {
    window.location.href = "/HamNguc/";
}
