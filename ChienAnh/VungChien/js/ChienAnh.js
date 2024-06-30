$(document).ready(function () {
    let ATK = 1;
    let mau_ban_dau = 0;
    let mau_toi_da = 0;
    let thoi_gian = 0;

    let request = indexedDB.open('AnimeCard', 4);

    request.onupgradeneeded = function (event) {
        const db = event.target.result;

        if (!db.objectStoreNames.contains('AnhAnime')) {
            const objectStore = db.createObjectStore('AnhAnime', { keyPath: 'id' });
        }
    };

    // Lấy tất cả dữ liệu từ cơ sở dữ liệu
    let mang_doi_hinh = localStorage.getItem("mdh");
    if (mang_doi_hinh) {
        mang_doi_hinh = JSON.parse(mang_doi_hinh);
    } else {
        mang_doi_hinh = [];
    }

    request.onsuccess = function (event) {
        const db = event.target.result;

        HienDoiHinh();
    };

    let code = '';
    let dem = 0;
    async function HienDoiHinh() {
        // Tạo một mảng các promise để xử lý bất đồng bộ
        const promises = mang_doi_hinh.map(id => {
            return new Promise((resolve, reject) => {
                const request = indexedDB.open('AnimeCard', 4);
                request.onsuccess = function (event) {
                    const db = event.target.result;
                    const transaction = db.transaction(['AnhAnime'], 'readonly');
                    const objectStore = transaction.objectStore('AnhAnime');
                    const request = objectStore.get(id);

                    request.onsuccess = function (event) {
                        const dl_anh_anime_id = event.target.result;
                        code += `
                    <div class="vi-tri-anh">
                        <img id="`+ id + `" src="../` + dl_anh_anime_id.url_anh + `" class="anh-ky-nang"
                            data-cooldown-time="`+ dl_anh_anime_id.cd * 1000 + `">
                        <div class="cooldown-overlay">
                            <span class="cooldown-text"></span>
                        </div>
                    </div>
                    `;
                        dem++;
                        resolve(); // Kết thúc promise khi thao tác hoàn tất
                    };

                    request.onerror = function (event) {
                        console.error('Error retrieving data:', event.target.errorCode);
                        reject(event.target.errorCode); // Thông báo lỗi nếu có lỗi
                    };
                };
            });
        });

        // Chờ tất cả các promise hoàn thành
        await Promise.all(promises);

        // Sau khi tất cả promise hoàn tất, thực thi các lệnh tiếp theo
        if (dem == 4) {
            $("#noi_thu_thap").removeClass("d-none");
        } else {
            do {
                code += `
            <div id="0" class="vi-tri-anh">
                <img src="../AnimeCard/icon_plus.png" class="anh-ky-nang">
            </div>
            `;
                dem++;
            } while (dem != 4);
            $("#noi_thu_thap").removeClass("d-none");
        }

        $("#noi_hien_anh").html(code);
        GanKyNang();
    }


    function GanKyNang() {
        $('.anh-ky-nang').click(function () {
            const $this = $(this);
            const id = Number($this.attr('id'));
            const cooldownTime = parseInt($this.data('cooldown-time')); // Lấy thời gian cooldown từ thuộc tính data

            const $overlay = $this.siblings('.cooldown-overlay');
            const $cooldownText = $overlay.find('.cooldown-text');

            // Kiểm tra nếu ảnh đang trong thời gian hồi chiêu
            if ($overlay.is(':visible')) {
                return; // Nếu đang hồi chiêu thì không làm gì
            }

            switch (id) {
                case 1:
                    KyNangAnhAnime1();
                    break;
                case 2:
                    KyNangAnhAnime2();
                    break;
                case 3:
                    KyNangAnhAnime3();
                    break;
                case 4:
                    KyNangAnhAnime4();
                    break;
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
    }

    function KyNangAnhAnime1() {
        mau_ban_dau -= 10;
        capNhatThanhMau();
        if (mau_ban_dau <= 0) {
            mau_ban_dau = 0;
        }
        capNhatThanhMau();
    }

    function KyNangAnhAnime2() {
        thoi_gian += 5;
        $("#thoi_gian_con_lai").text(thoi_gian);
    }

    function KyNangAnhAnime3() {
        $("#nhan_anh_thu_thap").click(function BoDemKyNang3() {
            mau_ban_dau -= 1;
            if (mau_ban_dau <= 0) {
                mau_ban_dau = 0;
            }
            capNhatThanhMau();
            const tg_nhan = setInterval(function () {
                $("#nhan_anh_thu_thap").off("click", BoDemKyNang3);
                clearInterval(tg_nhan);
            }, 1000);
        });
    }

    function KyNangAnhAnime4() {
        $("#nhan_anh_thu_thap").click(function BoDemKyNang4() {
            thoi_gian += 1;
            $("#thoi_gian_con_lai").text(thoi_gian);
            const tg_nhan = setInterval(function () {
                $("#nhan_anh_thu_thap").off("click", BoDemKyNang4);
                clearInterval(tg_nhan);
            }, 1000);
        });
    }

    // Thiết lập mức máu bắt đầu (có thể thay đổi giá trị ở đây)
    mau_ban_dau = 0; // Thay đổi giá trị này cho mức máu bắt đầu: 230, 500, 100000
    mau_toi_da = 100; // Lưu mức máu ban đầu để tính toán tỉ lệ

    $("#mau_toi_da").text(mau_toi_da);

    thoi_gian = 100;
    $("#thoi_gian_con_lai").text(thoi_gian);

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
                mau_ban_dau = 0;
                const mau_dau_game = setInterval(function () {
                    mau_ban_dau += 1;
                    capNhatThanhMau();
                    if (mau_ban_dau == mau_toi_da) {
                        $("#sl_thanh_mau").text("x1");
                        clearInterval(mau_dau_game);
                        mau_dau_game_cleared = true;
                        checkAllIntervalsCleared();
                    }
                }, 25);
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
            thong_tin = `
                <div class="pb-2 mb-2">
                    <p>Không còn kỹ năng nào khác được kích hoạt!</p>
                </div>
                `;
            $("#thong_tin_tran_dau").html(thong_tin);
            $nhan_anh.click(function () {
                if (mau_ban_dau > 0) {
                    mau_ban_dau -= ATK; // Giảm máu xuống 1 mỗi lần nhấn
                    if (mau_ban_dau < 0) {
                        mau_ban_dau = 0;
                    }
                    capNhatThanhMau(); // Cập nhật chiều rộng của thanh máu
                }
                else if (mau_ban_dau == 0) {
                    Thang();
                }
            });

            const giam_thoi_gian = setInterval(function () {
                thoi_gian--;
                if (thoi_gian <= 0) {
                    clearInterval(giam_thoi_gian);
                    Thua();
                } else {
                    $("#thoi_gian_con_lai").text(thoi_gian);
                }
            }, 1000);

            function Thua() {
                $("#ket_thuc_thu_thap").modal("show");

                $("#thang_thua").text("Bạn đã thua...");
                clearInterval(giam_thoi_gian);
            }

            function Thang() {
                $("#ket_thuc_thu_thap").modal("show");

                $("#thang_thua").text("Bạn đã chiến thắng!");
                clearInterval(giam_thoi_gian);
            }
        }
    }

    const $thanhMau = $(".thanh-mau");
    const $nhan_anh = $("#nhan_anh_thu_thap");

    // Cập nhật chiều rộng của thanh máu dựa trên mức máu hiện tại
    function capNhatThanhMau() {
        $("#mau_hien_tai").text(mau_ban_dau);
        const phanTramMau = (mau_ban_dau / mau_toi_da) * 100; // Tính toán tỉ lệ phần trăm
        $thanhMau.css("width", phanTramMau + "%");
    };

});


function QuayLai() {
    window.location.href = "/";
}
