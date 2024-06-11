function TaoSoNgauNhien(x, y) {
    let so_ngau_nhien = Math.floor(Math.random() * (y - x + 1)) + x;
    return so_ngau_nhien;
}

let ds_anime = [];
let so_luong_anime = 0;
$(document).ready(function () {

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
            });

            ds_anime = anime_TV_moi;
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

let dap_an_dung = 0;
let so_cau_hien_tai = 0;
let thoi_gian_con_lai = 15;
let dem_tg;
let diem_so = 0;
let id_cau_hoi = [];
function TaoCauHoi() {
    so_cau_hien_tai++;
    $("#cau_hoi_hien_tai").text(so_cau_hien_tai);
    thoi_gian_con_lai = 16;
    let cau_hoi_anime;

    if (so_cau_hien_tai > 1) {
        $('[id^="dap_an"]').addClass("khung-trac-nghiem");
        $('[id^="dap_an"]').removeClass("khung-trac-nghiem-fix");
        $('[id^="dap_an"]').removeClass("khung-trac-nghiem-dung");
        $('[id^="dap_an"]').removeClass("khung-trac-nghiem-sai");
    }

    // Tìm một anime có hình ảnh

    let kt = 0;
    let kt_loi;
    do {
        try {
            cau_hoi_anime = TaoSoNgauNhien(1, so_luong_anime);
            kt_loi = ds_anime[cau_hoi_anime].images.jpg.image_url;
            kt = 1;
        } catch (error) {
            kt = 0;
        }
    } while ((kt == 0 || id_cau_hoi.includes(cau_hoi_anime)));

    id_cau_hoi.push(cau_hoi_anime);

    $("#anh_cau_hoi").attr('src', ds_anime[cau_hoi_anime].images.jpg.image_url);

    dap_an_dung = TaoSoNgauNhien(1, 4);

    $("#dap_an" + dap_an_dung).text(ds_anime[cau_hoi_anime].title);

    // Tạo một danh sách ngẫu nhiên của các đáp án (bao gồm cả đáp án đúng)
    let danh_sach_dap_an_ngau_nhien = [];
    for (let i = 1; i < so_luong_anime; i++) {
        if (i != cau_hoi_anime) {
            danh_sach_dap_an_ngau_nhien.push(ds_anime[i].title);
        }
    }
    // Trộn ngẫu nhiên danh sách đáp án
    danh_sach_dap_an_ngau_nhien = shuffleArray(danh_sach_dap_an_ngau_nhien);

    // Đặt các đáp án còn lại từ danh sách đã được trộn
    for (let i = 1; i <= 4; i++) {
        if (i != dap_an_dung) {
            $("#dap_an" + i).text(danh_sach_dap_an_ngau_nhien.pop());
        }
    }

    // Hàm để trộn ngẫu nhiên một mảng
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

function QuayLai() {
    window.location.href = "/";
}

function DemThoiGian() {
    dem_tg = setInterval(function () {
        thoi_gian_con_lai--; // Giảm thời gian còn lại mỗi giây
        $("#thoi_gian_con_lai").text(thoi_gian_con_lai);
        if (thoi_gian_con_lai <= 0) { // Nếu hết thời gian
            $("#dap_an" + dap_an_dung).addClass("khung-trac-nghiem-dung");
            KetThucCauHoi();
            // Bỏ sự kiện click
            $('[id^="dap_an"]').unbind("click");
        }
    }, 1000); // Đếm mỗi 1 giây
}

function Chien() {
    $("#vung_choi").removeClass("d-none");
    $("#load").addClass("d-none");

    diem_so = 0;
    so_cau_hien_tai = 0;

    TaoCauHoi();
    DapAn();

    // Gọi hàm để đếm thời gian
    DemThoiGian();
}

function FixDapAnMobile() {
    $("#fix_mobile").html(`
        <p id="dap_an1" class="small khung-trac-nghiem khung-trac-nghiem-mobile py-2 px-3"></p>
            <p id="dap_an2" class="small khung-trac-nghiem khung-trac-nghiem-mobile py-2 px-3"></p>
            <p id="dap_an3" class="small khung-trac-nghiem khung-trac-nghiem-mobile py-2 px-3"></p>
            <p id="dap_an4" class="small khung-trac-nghiem khung-trac-nghiem-mobile py-2 px-3"></p>
        `);
}

function KetThucCauHoi() {
    clearInterval(dem_tg); // Dừng đếm
    $('[id^="dap_an"]').removeClass("khung-trac-nghiem");
    $('[id^="dap_an"]').addClass("khung-trac-nghiem-fix");
    if (so_cau_hien_tai < 10) {
        setTimeout(function () {
            FixDapAnMobile();
            TaoCauHoi();
            DapAn();
            DemThoiGian();
        }, 3000); // 3000 milliseconds = 3 seconds
    }
    else {
        $("#diem_so_cuoi").text(diem_so);
        $("#ket_thuc_thu_thach").modal("show");
    }
}

function DapAn() {
    $('[id^="dap_an"]').click(function () {
        const id_phan_tu = $(this).attr("id");

        // Sử dụng biểu thức chính quy để trích xuất số từ id
        const so_phia_sau = id_phan_tu.match(/\d+$/);

        if (dap_an_dung == so_phia_sau) {
            $(this).addClass("khung-trac-nghiem-dung");
            diem_so += Number(thoi_gian_con_lai) * 100;
            $("#diem_so").text(Number(diem_so));
        }
        else {
            $(this).addClass("khung-trac-nghiem-sai");
            $("#dap_an" + dap_an_dung).addClass("khung-trac-nghiem-dung");

        }

        KetThucCauHoi();
        $('[id^="dap_an"]').unbind("click");
    });
}

