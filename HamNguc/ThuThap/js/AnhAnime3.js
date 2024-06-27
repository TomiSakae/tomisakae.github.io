$(document).ready(function () {
    // Thiết lập mức máu bắt đầu (có thể thay đổi giá trị ở đây)
    mau_ban_dau = 0; // Thay đổi giá trị này cho mức máu bắt đầu: 230, 500, 100000
    mau_toi_da = 150; // Lưu mức máu ban đầu để tính toán tỉ lệ

    $("#mau_toi_da").text(mau_toi_da);

    let thong_tin = ``;
    let luong_thong_tin = 1;

    thong_tin = `
    <div class="pb-2 mb-2">
        <h6>Bắt đầu thu thập!</h6>
    </div>
    `;
    $("#thong_tin_tran_dau").html(thong_tin);

    let thong_tin_dau_game_cleared = false;
    let mau_dau_game_cleared = false;

    const thong_tin_dau_game = setInterval(function () {

        switch (luong_thong_tin) {
            case 1:
                thong_tin = `
                <div class="pb-2 mb-2">
                    <h6>Bắt đầu thu thập!</h6>
                    <p>Kích hoạt hệ thống phòng vệ mặc định!</p>
                </div>
                `;
                $("#thong_tin_tran_dau").html(thong_tin);
                break;
            case 2:
                thong_tin = `
                    <div class="pb-2 mb-2">
                        <h6>Bắt đầu thu thập!</h6>
                        <p>Kích hoạt hệ thống phòng vệ mặc định!</p>
                        <p>Tạo thanh máu...</p>
                    </div>
                    `;
                $("#thong_tin_tran_dau").html(thong_tin);
                $("#mau_bao_ve1").removeClass("an-mau");
                const mau_dau_game = setInterval(function () {
                    mau_ban_dau += 1;
                    window.capNhatThanhMau();
                    if (mau_ban_dau == mau_toi_da) {
                        clearInterval(mau_dau_game);
                        mau_dau_game_cleared = true;
                        thong_tin = `
                <div class="pb-2 mb-2">
                    <p>Không còn kỹ năng nào khác được kích hoạt!</p>
                    <h6>Chỉ số hiện tại:</h6>
                    <p class="small">Sức tấn công: 1</p>
                </div>
                `;
                        $("#thong_tin_tran_dau").html(thong_tin);
                        checkAllIntervalsCleared();
                    }
                }, 15);
                break;
        }

        if (luong_thong_tin == 2) {
            clearInterval(thong_tin_dau_game);
            thong_tin_dau_game_cleared = true;
            checkAllIntervalsCleared();
        }

        luong_thong_tin++;
    }, 1000);

    function checkAllIntervalsCleared() {
        if (thong_tin_dau_game_cleared && mau_dau_game_cleared) {
            $nhan_anh.click(function () {
                if (mau_ban_dau > 0) {
                    mau_ban_dau -= ATK; // Giảm máu xuống 1 mỗi lần nhấn
                    if (mau_ban_dau < 0) {
                        mau_ban_dau = 0;
                    }
                    window.capNhatThanhMau(); // Cập nhật chiều rộng của thanh máu
                }
                else if (mau_ban_dau == 0) {
                    Thang();
                }
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
        }
    }

    const $thanhMau = $(".thanh-mau");
    const $nhan_anh = $("#nhan_anh_thu_thap");

    // Cập nhật chiều rộng của thanh máu dựa trên mức máu hiện tại
    window.capNhatThanhMau = function () {
        $("#mau_hien_tai").text(mau_ban_dau);
        const phanTramMau = (mau_ban_dau / mau_toi_da) * 100; // Tính toán tỉ lệ phần trăm
        $thanhMau.css("width", phanTramMau + "%");
    };
});

function QuayLai() {
    window.location.href = "/HamNguc/";
}
