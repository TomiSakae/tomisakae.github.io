$(function () {
    let width = $(window).width();

    if (width <= 768) {
        let kt_quan_ly_mobile;
        $('[id^="quan_ly"]').click(function () {
            let id = $(this).attr('id'); // Lấy ID của phần tử
            let number = id.match(/\d+$/); // Tìm số ở cuối ID
            kt_quan_ly_mobile = Number(number);
            $(this).addClass("chon-quan-ly");
            for (let i = 1; i <= 6; i++) {
                if (i != number) {
                    $("#quan_ly" + i).removeClass("chon-quan-ly");
                }
            }

            switch (kt_quan_ly_mobile) {
                case 1:
                    $("#ten_cai_dat").text("Tài Khoản");
                    break;
                case 2:
                    $("#ten_cai_dat").text("Hỗ Trợ");
                    break;
                case 3:
                    $("#ten_cai_dat").text("Đào Tạo");
                    break;
                case 4:
                    $("#ten_cai_dat").text("Nhiệm Vụ");
                    break;
                case 5:
                    $("#ten_cai_dat").text("Thành Tựu");
                    break;
                case 6:
                    $("#ten_cai_dat").text("Hòm Thư");
                    break;
            }
            $("#chon_cai_dat").modal("hide");
        });
    }
    if (width > 768) {
        let kt_quan_ly;
        $('[id^="quan_ly"]').click(function () {
            let id = $(this).attr('id'); // Lấy ID của phần tử
            let number = id.match(/\d+$/); // Tìm số ở cuối ID
            kt_quan_ly = Number(number);
            $(this).addClass("chon-quan-ly");
            for (let i = 1; i <= 6; i++) {
                if (i != number) {
                    $("#quan_ly" + i).removeClass("chon-quan-ly");
                }
            }
        });
    }
});