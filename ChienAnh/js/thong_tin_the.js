$(document).ready(function () {
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
            dl_anh_anime_hien_co = allData;
            code = ``;
            dl_anh_anime_hien_co.forEach(item => {
                code += `
                    <img id="doi_hinh${item.id}" src="${item.url_anh}"
                    class="anh-the-bai h-auto me-2 mb-2">
                `;
            });

            $("#vung_xep_doi_hinh").html(code);
            attachDoiHinhEvents();
            mang_doi_hinh.forEach(id => {
                const selector = `#doi_hinh${id}`;
                $(selector).addClass('lam-mo-anh').off('click');
            });
        };

        request.onerror = function (event) {
            console.error('Error retrieving data:', event.target.errorCode);
        };
    }

    function attachDoiHinhEvents() {
        $('[id^="doi_hinh"]').click(function () {
            const id_phan_tu = $(this).attr("id");
            const so_phia_sau = id_phan_tu.match(/\d+$/);

            mang_doi_hinh.push(Number(so_phia_sau));
            localStorage.setItem("mdh", JSON.stringify(mang_doi_hinh));

            $(this).addClass('lam-mo-anh');
            LapDoiHinh(Number(so_phia_sau));
            $(this).off('click');
        });
    }

    function LapDoiHinh(id) {
        const request = indexedDB.open('AnimeCard', 4);
        request.onsuccess = function (event) {
            const db = event.target.result;
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
            const so_phia_sau = id_phan_tu.match(/\d+$/);

            const request = indexedDB.open('AnimeCard', 4);
            request.onsuccess = function (event) {
                const db = event.target.result;
                getDataById(db, Number(so_phia_sau));
            };
        });
    }

    function HienThongTin(dl_anh_anime_id) {
        $("#thong_tin_the_bai").modal("show");
        $("#hang_the_bai").text("Hạng: " + dl_anh_anime_id.hang);
        $("#anh_the_bai").attr('src', dl_anh_anime_id.url_anh);
        $("#ten_the_bai").text(dl_anh_anime_id.ten);
        $("#ky_nang").text(dl_anh_anime_id.ky_nang);
        $("#hoi_chieu").text(dl_anh_anime_id.cd);
    }

    $("#reset_doi_hinh").click(function () {
        $('[class^="loai_bo"]').attr("src", "AnimeCard/icon_plus.png");
        o_trong = 1;
        $(".loai_bo1").attr("id", "o_trong1");
        $(".loai_bo2").attr("id", "o_trong2");
        $(".loai_bo3").attr("id", "o_trong3");
        $(".loai_bo4").attr("id", "o_trong4");
        mang_doi_hinh = [];
        localStorage.setItem("mdh", JSON.stringify(mang_doi_hinh));
        const request = indexedDB.open('AnimeCard', 4);

        request.onsuccess = function (event) {
            const db = event.target.result;
            getAllData(db);
        };
    });

    $("#vao_chien_anh").click(function () {
        window.location.href = "VungChien/";
    });

    // Open the database and load initial data
    const request = indexedDB.open('AnimeCard', 4);

    request.onupgradeneeded = function (event) {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('AnhAnime')) {
            db.createObjectStore('AnhAnime', { keyPath: 'id' });
        }
    };

    request.onsuccess = function (event) {
        const db = event.target.result;
        getAllData(db);
        mang_doi_hinh.forEach(id => {
            LapDoiHinh(Number(id));
        });
    };

    request.onerror = function (event) {
        console.error('Database error:', event.target.errorCode);
    };
});
