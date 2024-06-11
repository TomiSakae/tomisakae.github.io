
$(document).ready(function () {

    function TaoSoNgauNhien(x, y) {
        let so_ngau_nhien = Math.floor(Math.random() * (y - x + 1)) + x;
        return so_ngau_nhien;
    }

    let mua_anime = TaoSoNgauNhien(1, 4);
    let nam_anime = TaoSoNgauNhien(2000, 2024);

    if (nam_anime == 2024) {
        mua_anime = 1;
    }

    let ten_mua_anime = "";
    let tim_mua_anime = "";
    switch (mua_anime) {
        case 1:
            ten_mua_anime = "mùa đông";
            tim_mua_anime = "winter";
            break;
        case 2:
            ten_mua_anime = "mùa xuân";
            tim_mua_anime = "spring";
            break;
        case 3:
            ten_mua_anime = "mùa hè";
            tim_mua_anime = "summer";
            break;
        case 4:
            ten_mua_anime = "mùa thu";
            tim_mua_anime = "fall";
            break;
    }

    async function TimAnime() {
        const url = 'https://api.jikan.moe/v4/seasons/' + nam_anime + '/' + tim_mua_anime;

        try {
            let danh_sach_anime = [];
            let so_luong_anime = 0;

            for (let page = 1; page <= 4; page++) {
                const response = await fetch(`${url}?page=${page}`);
                const data = await response.json();

                if (data.error) {
                    console.error('Error fetching data:', data.message);
                    return;
                }

                const du_lieu_anime = data.data;

                if (du_lieu_anime.length === 0) break; // Khi không còn anime nào khác trên trang

                danh_sach_anime = danh_sach_anime.concat(du_lieu_anime);
            }

            // Lọc ra chỉ anime TV mới mà không bao gồm anime TV chiếu tiếp
            const anime_TV_moi = danh_sach_anime.filter(anime => anime.type === 'TV' && !anime.continuing);

            //const anime = anime_TV_moi.map(anime);

            anime_TV_moi.forEach(anime => {
                so_luong_anime++;
                console.log(anime.title);
            });
            console.log('Số lượng anime: ' + so_luong_anime);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

        $("#anime_mua").text(ten_mua_anime);
        $("#anime_nam").text(nam_anime)

        $('#kt_che_do').modal('show');
    }

    TimAnime();
});

function Chien() {
    $("#vung_choi").removeClass("d-none");
    $("#load").addClass("d-none");
}