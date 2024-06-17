function TaoSoNgauNhien(x, y) {
    let so_ngau_nhien = Math.floor(Math.random() * (y - x + 1)) + x;
    return so_ngau_nhien;
}

let ds_anime = [];
let so_luong_anime = 0;
let ds_anime_cau_hoi = [];
let ds_dap_an = [];
let dap_an_tra_loi = 0;
$(document).ready(function () {

    let date = new Date();

    // Lấy ngày
    let day = date.getDate();
    // Lấy tháng (giá trị trả về từ 0 đến 11, nên cần cộng thêm 1)
    let month = date.getMonth() + 1;

    // Lấy năm
    let year = date.getFullYear();

    let nam_dau = year - 10;
    let nam_cuoi = year;
    let thang = month;

    let mua_anime = TaoSoNgauNhien(1, 4);
    let nam_anime = TaoSoNgauNhien(nam_dau, nam_cuoi);

    if (nam_anime == nam_cuoi || nam_anime == nam_dau) {
        if (thang >= 10) {
            mua_anime = TaoSoNgauNhien(1, 3);
        } else if (thang >= 7) {
            mua_anime = TaoSoNgauNhien(1, 2);
        } else if (thang >= 4) {
            mua_anime = 1;
        }
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
        let allAnime = [];
        let seenIds = new Set();
        let url = 'https://kitsu.io/api/edge/anime?filter[season]=' + tim_mua_anime + '&filter[seasonYear]=' + nam_anime + '&page[limit]=20';
        let nextPage = true;
        let pageCount = 0;
        let totalItems = 0; // Số lượng mục tổng cộng
        let so_luong_anime_goc = 0;

        // Hiển thị thanh tiến trình
        $("#progress-container").show();

        while (nextPage) {
            try {
                const response = await fetch(url);
                const data = await response.json();
                pageCount++;

                if (pageCount === 1) {
                    // Giả sử API trả về số lượng mục tổng cộng trong lần gọi đầu tiên
                    totalItems = data.meta.count;
                }

                data.data.forEach(anime => {
                    so_luong_anime_goc++;
                    const { id, attributes } = anime;
                    const { subtype, ageRating, userCount } = attributes;

                    if (!seenIds.has(id) && subtype === 'TV' && ageRating !== 'G' && userCount > 1000) {
                        seenIds.add(id);
                        allAnime.push(anime);
                        so_luong_anime++;
                    }
                });

                // Cập nhật thanh tiến trình
                const progressPercent = Math.min((so_luong_anime_goc / totalItems) * 100, 100); // Tính phần trăm tiến trình
                $("#progress-bar").css('width', progressPercent + '%').attr('aria-valuenow', progressPercent);
                $("#phan_tram_load").text(Math.round(progressPercent) + '%');

                // Kiểm tra xem có trang tiếp theo hay không
                if (data.links && data.links.next) {
                    url = data.links.next;
                } else {
                    nextPage = false;
                }
            } catch (error) {
                console.error('Error fetching anime list:', error);
                nextPage = false;
            }
        }

        $("#load_studio").text("Đang tải dữ liệu Studio, vui lòng đợi...")
        await DSStudio();

        ds_anime = allAnime;
        $(".anime_mua").text(ten_mua_anime);
        $(".anime_nam").text(nam_anime)

        $('#kt_che_do').modal('show');
    }

    TimAnime();
});

let ten_studio = "";
let kt_studio = true;

async function LocStudio(animeTitle) {
    const jikanSearchUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(animeTitle)}&limit=1`;
    ten_studio = "";
    kt_studio = true;
    try {
        // Gọi API Jikan để tìm kiếm anime dựa trên tên
        const searchResponse = await fetch(jikanSearchUrl);
        const searchData = await searchResponse.json();

        if (searchData.data && searchData.data.length > 0) {
            const anime = searchData.data[0];
            const animeId = anime.mal_id;

            await sleep(500);
            // Sử dụng ID của anime để lấy thông tin chi tiết
            const detailsUrl = `https://api.jikan.moe/v4/anime/${animeId}`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();

            if (detailsData.data && detailsData.data.studios && detailsData.data.studios.length > 0) {
                // Lấy danh sách studio
                detailsData.data.studios.forEach(studio => {
                    ten_studio = studio.name;
                });
            } else {
                kt_studio = false;
            }
        } else {
            kt_studio = false;
        }
    } catch (error) {
        console.error('Error fetching anime details:', error);
        kt_studio = false;
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let ds_studio = [];
async function DSStudio() {
    ds_studio = [];
    let url = 'https://api.jikan.moe/v4/producers?page=1';
    let hasNextPage = true;
    const delay = 500; // Độ trễ giữa các yêu cầu (1 giây)
    let dem = 0;
    try {
        while (hasNextPage && dem < 4) {
            const response = await fetch(url);
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                ds_studio = ds_studio.concat(data.data.map(studio => studio.titles)
                    .flat()
                    .filter(titleObj => titleObj.type === 'Default')
                    .map(titleObj => titleObj.title));
            }

            if (data.pagination && data.pagination.has_next_page) {
                dem++;
                url = `https://api.jikan.moe/v4/producers?page=${data.pagination.current_page + 1}`;
                await sleep(delay); // Thêm độ trễ giữa các yêu cầu
            } else {
                hasNextPage = false;
            }
        }
    } catch (error) {
        console.error('Error fetching all studios:', error);
    }
}

let dap_an_dung = 0;
let so_cau_hien_tai = 0;
let thoi_gian_con_lai = 30;
let dem_tg;
let diem_so = 0;
let id_cau_hoi = [];
async function TaoCauHoi() {
    so_cau_hien_tai++;
    $("#cau_hoi_hien_tai").text(so_cau_hien_tai);
    thoi_gian_con_lai = 30;
    $("#thoi_gian_con_lai").text(thoi_gian_con_lai);
    let cau_hoi_anime;

    if (so_cau_hien_tai > 1) {
        $('[id^="dap_an"]').addClass("khung-trac-nghiem");
        $('[id^="dap_an"]').removeClass("khung-trac-nghiem-fix");
        $('[id^="dap_an"]').removeClass("khung-trac-nghiem-dung");
        $('[id^="dap_an"]').removeClass("khung-trac-nghiem-sai");
    }

    // Tìm một anime có hình ảnh

    do {
        do {
            cau_hoi_anime = TaoSoNgauNhien(0, so_luong_anime - 1);
        } while (id_cau_hoi.includes(cau_hoi_anime));
        await LocStudio(ds_anime[cau_hoi_anime].attributes.canonicalTitle);
    } while (!kt_studio);

    id_cau_hoi.push(cau_hoi_anime);
    ds_anime_cau_hoi.push(ds_anime[cau_hoi_anime]);

    $("#anh_cau_hoi").attr('src', ds_anime[cau_hoi_anime].attributes.posterImage.large);

    $("#anh_cau_hoi").addClass("d-none");

    dap_an_dung = TaoSoNgauNhien(1, 4);

    $("#dap_an" + dap_an_dung).text(ten_studio);

    // Tạo một danh sách ngẫu nhiên của các đáp án (bao gồm cả đáp án đúng)
    let danh_sach_dap_an_ngau_nhien = [];
    let studio_ngau_nhien = 0;
    for (let i = 0; i < ds_studio.length; i++) {
        studio_ngau_nhien = TaoSoNgauNhien(0, ds_studio.length);
        if (ds_studio[studio_ngau_nhien] != ten_studio) {
            danh_sach_dap_an_ngau_nhien.push(ds_studio[studio_ngau_nhien]);
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
    clearInterval(dem_tg);
    dem_tg = setInterval(function () {
        thoi_gian_con_lai--; // Giảm thời gian còn lại mỗi giây
        $("#thoi_gian_con_lai").text(thoi_gian_con_lai);
        if (thoi_gian_con_lai <= 0) { // Nếu hết thời gian
            $("#dap_an" + dap_an_dung).addClass("khung-trac-nghiem-dung");
            ds_dap_an[dap_an_tra_loi] = 0;
            dap_an_tra_loi++;
            KetThucCauHoi();
            // Bỏ sự kiện click
            $('[id^="dap_an"]').unbind("click");
        }
    }, 1000); // Đếm mỗi 1 giây
}

function LoadAnh() {
    $("#anh_cau_hoi").on('load', function () {
        DemThoiGian();
        $("#tai_cau_hoi").addClass("d-none");
        $("#tai_xong_cau_hoi").removeClass("d-none");
        $("#load_anh").removeClass("d-none");
        $("#fix_mobile").removeClass("d-none");
        $("#anh_cau_hoi").removeClass("d-none");
    });
}

function Chien() {
    $("#vung_choi").removeClass("d-none");
    $("#load").addClass("d-none");

    diem_so = 0;
    so_cau_hien_tai = 0;

    TaoCauHoi();
    DapAn();
    LoadAnh();
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
    setTimeout(function () {
        if (so_cau_hien_tai < 10) {
            $("#phong_to_anh").modal("hide");
            $("#load_anh").addClass("d-none");
            FixDapAnMobile();
            $("#fix_mobile").addClass("d-none");
            $("#tai_cau_hoi").removeClass("d-none");
            $("#tai_xong_cau_hoi").addClass("d-none");
            TaoCauHoi();
            DapAn();
            LoadAnh();
        }
        else {
            KetQua();
        }
    }, 3000); // 3000 milliseconds = 3 seconds
}

function KetQua() {
    $("#ket_thuc_thu_thach").modal("show");
    let code_nhap_vao = ``;
    let so_cau_dung = 0;
    let kt_dung_sai = "";
    let kt_mobile = "";
    let width = $(window).width();
    let anh_ket_qua = "anh-ket-qua";
    if (width <= 768) {
        kt_mobile = "small";
        anh_ket_qua = "anh-ket-qua-mobile";
    }
    for (let i = 0; i < 10; i++) {
        if (ds_dap_an[i] == 1) {
            so_cau_dung++;
            kt_dung_sai = "cau-dung";
        }
        else {
            kt_dung_sai = "cau-sai";
        }

        if (i == 0) {
            kt_dung_sai += " dau-khung-ket-qua";
        }
        code_nhap_vao += `
        <div id="ket_qua`+ (i + 1) + `" class="` + kt_dung_sai + ` khung-ket-qua d-flex align-items-center">
                    <img src="`+ ds_anime_cau_hoi[i].attributes.posterImage.large + `"
                                            class="`+ anh_ket_qua + ` h-auto">
                    <p class="`+ kt_mobile + ` mx-auto my-auto">` + ds_anime_cau_hoi[i].attributes.canonicalTitle + `</p>
        </div>
        `;
    }
    $("#tong_ket_qua").html(code_nhap_vao);
    $("#so_cau_dung").text(so_cau_dung);
    if (so_cau_dung == 10) {
        $("#hoan_hao").removeClass("d-none");
        diem_so *= 2;
    }
    $("#tong_so_diem").text(diem_so);

    $('[id^="ket_qua"]').click(function () {

        const id_phan_tu = $(this).attr("id");

        // Sử dụng biểu thức chính quy để trích xuất số từ id
        const so_phia_sau = id_phan_tu.match(/\d+$/);

        let searchTerm = ds_anime_cau_hoi[Number(so_phia_sau) - 1].attributes.canonicalTitle + " vietsub";

        // Tạo URL tìm kiếm trên Google
        let url = 'https://www.google.com/search?q=' + encodeURIComponent(searchTerm);

        // Mở tab mới với URL tìm kiếm
        window.open(url, '_blank');
    });
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
            ds_dap_an[dap_an_tra_loi] = 1;
        }
        else {
            $(this).addClass("khung-trac-nghiem-sai");
            $("#dap_an" + dap_an_dung).addClass("khung-trac-nghiem-dung");
            ds_dap_an[dap_an_tra_loi] = 0;

        }
        dap_an_tra_loi++;
        KetThucCauHoi();
        $('[id^="dap_an"]').unbind("click");
    });
}


$("#anh_cau_hoi").click(function () {
    let src = $(this).attr("src");
    $("#phong_to_anh").modal("show");
    $("#anh_phong_to").attr("src", src);
});