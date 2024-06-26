request = indexedDB.open('AnimeCard', 4);

request.onupgradeneeded = function (event) {
    const db = event.target.result;

    if (!db.objectStoreNames.contains('AnhAnime')) {
        const objectStore = db.createObjectStore('AnhAnime', { keyPath: 'id' });
    }
};

request.onsuccess = function (event) {
    const db = event.target.result;

    // Lấy tất cả dữ liệu từ cơ sở dữ liệu

    mang_doi_hinh.forEach(id => {
        LapDoiHinh(Number(id));
    });
};

request.onerror = function (event) {
    console.error('Database error:', event.target.errorCode);
};

let mang_doi_hinh = localStorage.getItem("mdh");
if (mang_doi_hinh) {
    mang_doi_hinh = JSON.parse(mang_doi_hinh);
} else {
    mang_doi_hinh = [];
}


let allData;
let dl_anh_anime_hien_co;
let code = ``;
function getAllData(db) {
    const transaction = db.transaction(['AnhAnime'], 'readonly');
    const objectStore = transaction.objectStore('AnhAnime');

    const request = objectStore.getAll();

    request.onsuccess = function (event) {
        allData = event.target.result;
        // Lọc các bản ghi có sl > 0
        dl_anh_anime_hien_co = allData.filter(data => data.sl > 0);
        code = ``;
        dl_anh_anime_hien_co.forEach(item => {
            code += `
                <img id="doi_hinh${item.id}" src="${item.url_anh}"
                class="anh-the-bai h-auto me-2 mb-2">
            `;
        });

        $("#vung_xep_doi_hinh").html(code);
        DoiHinh();
        mang_doi_hinh.forEach(id => {
            const selector = `#doi_hinh${id}`;
            $(selector).addClass('lam-mo-anh').off('click');
        });
    };

    request.onerror = function (event) {
        console.error('Error retrieving data:', event.target.errorCode);
    };
}

function DoiHinh() {
    $('[id^="doi_hinh"]').click(function () {
        const id_phan_tu = $(this).attr("id");
        const so_phia_sau = id_phan_tu.match(/\d+$/);

        mang_doi_hinh.push(Number(so_phia_sau));
        localStorage.setItem("mdh", JSON.stringify(mang_doi_hinh));

        // Gán class lam-mo-anh cho phần tử hiện tại
        $(this).addClass('lam-mo-anh');

        // Gọi hàm LapDoiHinh với số phía sau của id
        LapDoiHinh(Number(so_phia_sau));

        // Sau khi đã xử lý, gỡ bỏ sự kiện click và class lam-mo-anh trên phần tử hiện tại
        $(this).off('click');
    });
}

function LapDoiHinh(id) {
    request = indexedDB.open('AnimeCard', 4);
    request.onsuccess = function (event) {
        const db = event.target.result;
        // Lấy tất cả dữ liệu từ cơ sở dữ liệu
        const transaction = db.transaction(['AnhAnime'], 'readonly');
        const objectStore = transaction.objectStore('AnhAnime');

        const request = objectStore.get(id);

        request.onsuccess = function (event) {
            dl_anh_anime_id = event.target.result;
            $("#o_trong" + o_trong).attr('src', dl_anh_anime_id.url_anh);
            $("#o_trong" + o_trong).attr('id', "the_bai" + id);
            if (o_trong < 5) {
                o_trong++;
            }
            ThongTinTheBai();
        };

        request.onerror = function (event) {
            console.error('Error retrieving data:', event.target.errorCode);
        };
    };
}

let dl_anh_anime_id;
function getDataById(db, id) {
    const transaction = db.transaction(['AnhAnime'], 'readonly');
    const objectStore = transaction.objectStore('AnhAnime');

    const request = objectStore.get(id);

    request.onsuccess = function (event) {
        dl_anh_anime_id = event.target.result;
        HienThongTin(dl_anh_anime_id);
    };

    request.onerror = function (event) {
        console.error('Error retrieving data:', event.target.errorCode);
    };
}


let o_trong = 1;

function ThongTinTheBai() {
    $('[id^="the_bai"]').click(function () {
        const id_phan_tu = $(this).attr("id");

        // Sử dụng biểu thức chính quy để trích xuất số từ id
        const so_phia_sau = id_phan_tu.match(/\d+$/);

        $("#vao_thu_thap").click(function () {
            window.location.href = "ThuThap/AnhAnime" + Number(so_phia_sau) + ".html";
        });
        request = indexedDB.open('AnimeCard', 4);
        request.onsuccess = function (event) {
            const db = event.target.result;
            // Lấy tất cả dữ liệu từ cơ sở dữ liệu
            getDataById(db, Number(so_phia_sau));
        };
    });
}


function HienThongTin(dl_anh_anime_id) {
    // Hiển thị modal
    $("#thong_tin_the_bai").modal("show");

    // Cập nhật thông tin trong modal
    $("#hang_the_bai").text("Hạng: " + dl_anh_anime_id.hang);
    $("#anh_the_bai").attr('src', dl_anh_anime_id.url_anh);
    $("#ten_the_bai").text(dl_anh_anime_id.ten);
    $("#ky_nang").text(dl_anh_anime_id.ky_nang);
    $("#hoi_chieu").text(dl_anh_anime_id.cd);
}

$(function () {

    ThongTinTheBai();

    $("#nut_thu_thap").click(function () {
        $("#thong_tin_the_bai").modal("hide");
        $("#thiet_lap_doi_hinh").modal("show");
        request = indexedDB.open('AnimeCard', 4);

        request.onsuccess = function (event) {
            const db = event.target.result;

            // Lấy tất cả dữ liệu từ cơ sở dữ liệu
            getAllData(db);
        };
    });

    $("#reset_doi_hinh").click(function () {
        $('[class^="loai_bo"]').attr("src", "AnimeCard/icon_plus.png");
        o_trong = 1;
        $(".loai_bo1").attr("id", "o_trong1");
        $(".loai_bo2").attr("id", "o_trong2");
        $(".loai_bo3").attr("id", "o_trong3");
        $(".loai_bo4").attr("id", "o_trong4");
        mang_doi_hinh = [];
        localStorage.setItem("mdh", JSON.stringify(mang_doi_hinh));
        request = indexedDB.open('AnimeCard', 4);

        request.onsuccess = function (event) {
            const db = event.target.result;

            // Lấy tất cả dữ liệu từ cơ sở dữ liệu
            getAllData(db);
        };
    });
});