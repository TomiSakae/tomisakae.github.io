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
                    <div id="`+ id + `" class="vi-tri-anh">
                        <img src="../`+ dl_anh_anime_id.url_anh + `" class="anh-ky-nang"
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

