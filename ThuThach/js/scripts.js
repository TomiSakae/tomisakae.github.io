let kt_che_do = 0;
let kt_che_do_mobile = 0;
function BatDau() {
    let width = $(window).width();

    if (width <= 768) {
        if (kt_che_do_mobile == 0 || kt_che_do_mobile == 1) {
            window.location.href = "../Anime/ThuThachCoBan/mobile.html";
        }
        if (kt_che_do_mobile == 2) {
            window.location.href = "../Anime/ThuThachNhanVat/mobile.html";
        }
        if (kt_che_do_mobile == 3) {
            window.location.href = "../Anime/ThuThachSinhTon/mobile.html";
        }
        if (kt_che_do_mobile == 4) {
            window.location.href = "../Anime/ThuThachTenNhanVat/mobile.html";
        }
        if (kt_che_do_mobile == 5) {
            window.location.href = "../Anime/ThuThachStudio/mobile.html";
        }
        if (kt_che_do_mobile == 6) {
            window.location.href = "../Anime/ThuThachAI/mobile.html";
        }
    }
    if (width > 768) {
        if (kt_che_do == 1) {
            window.location.href = "../Anime/ThuThachCoBan/pc.html";
        }
        if (kt_che_do == 2) {
            window.location.href = "../Anime/ThuThachNhanVat/pc.html";
        }
        if (kt_che_do == 3) {
            window.location.href = "../Anime/ThuThachSinhTon/pc.html";
        }
        if (kt_che_do == 4) {
            window.location.href = "../Anime/ThuThachTenNhanVat/pc.html";
        }
        if (kt_che_do == 5) {
            window.location.href = "../Anime/ThuThachStudio/pc.html";
        }
        if (kt_che_do == 6) {
            window.location.href = "../Anime/ThuThachAI/pc.html";
        }
    }

}

$('[id^="chon_che_do"]').click(function () {
    let id = $(this).attr('id'); // Lấy ID của phần tử
    let number = id.match(/\d+$/); // Tìm số ở cuối ID
    kt_che_do = Number(number);
    $("#nut_bat_dau").removeAttr('data-bs-toggle');
    $("#nut_bat_dau").removeAttr('data-bs-target');
    $(this).removeClass("che-do-choi");
    $(this).addClass("che-do-choi-chon");
    for (let i = 1; i <= 6; i++) {
        if (i != number) {
            $("#chon_che_do" + i).removeClass("che-do-choi-chon");
            $("#chon_che_do" + i).addClass("che-do-choi");
        }
    }
});

$('[id^="che_do_mobile"]').click(function () {
    let id = $(this).attr('id'); // Lấy ID của phần tử
    let number = id.match(/\d+$/); // Tìm số ở cuối ID
    kt_che_do_mobile = Number(number);
    $("#lua_chon_che_do").modal("hide");
    switch (Number(number)) {
        case 1:
            $("#ten_che_do").html(`Cơ Bản <i id="lua_che_do" class="ms-2 fa-solid fa-repeat"></i>`);
            break;
        case 2:
            $("#ten_che_do").html(`Nhân Vật <i id="lua_che_do" class="ms-2 fa-solid fa-repeat"></i>`);
            break;
        case 3:
            $("#ten_che_do").html(`Sinh Tồn <i id="lua_che_do" class="ms-2 fa-solid fa-repeat"></i>`);
            break;
        case 4:
            $("#ten_che_do").html(`Tên Nhân Vật <i id="lua_che_do" class="ms-2 fa-solid fa-repeat"></i>`);
            break;
        case 5:
            $("#ten_che_do").html(`Studio <i id="lua_che_do" class="ms-2 fa-solid fa-repeat"></i>`);
            break;
        case 6:
            $("#ten_che_do").html(`AI <i id="lua_che_do" class="ms-2 fa-solid fa-repeat"></i>`);
            break;
    }

});
