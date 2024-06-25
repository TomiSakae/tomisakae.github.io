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
    });

    $('.anh-ky-nang').click(function () {
        const $this = $(this);
        const cooldownTime = parseInt($this.data('cooldown-time')); // Lấy thời gian cooldown từ thuộc tính data

        const $overlay = $this.siblings('.cooldown-overlay');
        const $cooldownText = $overlay.find('.cooldown-text');

        // Kiểm tra nếu ảnh đang trong thời gian hồi chiêu
        if ($overlay.is(':visible')) {
            return; // Nếu đang hồi chiêu thì không làm gì
        }

        // Hiển thị overlay hồi chiêu
        $overlay.show();

        let remainingTime = cooldownTime / 1000; // Chuyển đổi thời gian hồi chiêu sang giây
        $cooldownText.text(remainingTime); // Hiển thị thời gian hồi chiêu ban đầu

        const interval = setInterval(function () {
            remainingTime -= 1;
            if (remainingTime <= 0) {
                clearInterval(interval);
                $overlay.hide();
            } else {
                $cooldownText.text(remainingTime);
            }
        }, 1000);
    });

    let thoi_gian_choi = 100;

    const giam_thoi_gian = setInterval(function () {
        thoi_gian_choi--;
        if (thoi_gian_choi <= 0) {
            clearInterval(giam_thoi_gian);
        } else {
            $("#thoi_gian_con_lai").text(thoi_gian_choi);
        }
    }, 1000);
});
