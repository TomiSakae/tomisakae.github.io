import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyC7suGvkLTcVUNihZI2Rf5j-Wa1Gf33MWY";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

async function GeminiAI(input) {
    const chatSession = model.startChat({
        generationConfig,
        // safetySettings: Adjust safety settings
        // See https://ai.google.dev/gemini-api/docs/safety-settings
        history: [
            {
                role: "user",
                parts: [
                    { text: "gemini sẽ tạo ra câu hỏi dựa trên tên anime nhập vào. Và xuất ra định dạng với cau_hoi:\"\" cau_tra_loi1:\"\" cau_tra_loi2 cau_tra_loi3 cau_tra_loi4 và mỗi câu trả lời có ket_qua: true hoặc false, và chỉ có 1 câu trả lời đúng nên ket_qua chỉ có 1 true và 3 false" },
                ],
            },
            {
                role: "model",
                parts: [
                    { text: "{\"cau_hoi\": \"Bạn có biết Anime nào có tên là?\", \"cau_tra_loi_1\": {\"noi_dung\": \"One Piece\", \"ket_qua\": false}, \"cau_tra_loi_2\": {\"noi_dung\": \"Naruto\", \"ket_qua\": true}, \"cau_tra_loi_3\": {\"noi_dung\": \"Conan\", \"ket_qua\": false}, \"cau_tra_loi_4\": {\"noi_dung\": \"Doraemon\", \"ket_qua\": false}}\n" },
                ],
            },
        ],
    });

    const result = await chatSession.sendMessage(input);
    console.log(result.response.text());
    return result.response.text();
}


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

        ds_anime = allAnime;
        $(".anime_mua").text(ten_mua_anime);
        $(".anime_nam").text(nam_anime)

        $('#kt_che_do').modal('show');
    }

    TimAnime();
});

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
        cau_hoi_anime = TaoSoNgauNhien(0, so_luong_anime - 1);
    } while (id_cau_hoi.includes(cau_hoi_anime));

    id_cau_hoi.push(cau_hoi_anime);
    ds_anime_cau_hoi.push(ds_anime[cau_hoi_anime]);

    // Parse JSON string to JavaScript object

    let du_lieu_cau_hoi;
    let gemini_cau_hoi;
    let kt_ai = 0;
    do {
        try {
            gemini_cau_hoi = await GeminiAI(ds_anime[cau_hoi_anime].attributes.canonicalTitle);
            du_lieu_cau_hoi = JSON.parse(gemini_cau_hoi);
            kt_ai = 1;
        } catch (error) {
            kt_ai = 0;
        }
    } while (kt_ai == 0);


    // Extract answers
    let ai_dap_an = [];
    for (let key in du_lieu_cau_hoi) {
        if (key.startsWith('cau_tra_loi_')) {
            ai_dap_an.push({
                noi_dung: du_lieu_cau_hoi[key].noi_dung,
                ket_qua: du_lieu_cau_hoi[key].ket_qua
            });
        }
    }

    $("#ai_cau_hoi").text(du_lieu_cau_hoi.cau_hoi);

    for (let i = 1; i <= 4; i++) {
        $("#dap_an" + i).text(ai_dap_an[i - 1].noi_dung);
        if (ai_dap_an[i - 1].ket_qua == true) {
            dap_an_dung = i;
        }
    }

    $("#tai_cau_hoi").addClass("d-none");
    $("#tai_xong_cau_hoi").removeClass("d-none");
    $("#ai_cau_hoi").removeClass("d-none");
    $("#fix_mobile").removeClass("d-none");
    DemThoiGian();
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

$("#nut_chien").click(function () {
    $("#vung_choi").removeClass("d-none");
    $("#load").addClass("d-none");

    diem_so = 0;
    so_cau_hien_tai = 0;

    TaoCauHoi();
    DapAn();
});

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
            $("#phong_to_anh").modal("hide");
            FixDapAnMobile();
            $("#fix_mobile").addClass("d-none");
            $("#ai_cau_hoi").addClass("d-none");
            $("#tai_cau_hoi").removeClass("d-none");
            $("#tai_xong_cau_hoi").addClass("d-none");
            TaoCauHoi();
            DapAn();
        }, 3000); // 3000 milliseconds = 3 seconds
    }
    else {
        KetQua();

    }
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