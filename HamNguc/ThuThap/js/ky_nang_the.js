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
    window.capNhatThanhMau();
}

function KyNangAnhAnime2() {
    thoi_gian += 5;
    $("#thoi_gian_con_lai").text(thoi_gian);
}

function KyNangAnhAnime3() {
    $("#nhan_anh_thu_thap").click(function BoDemKyNang3() {
        mau_ban_dau -= 1;
        window.capNhatThanhMau();
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
