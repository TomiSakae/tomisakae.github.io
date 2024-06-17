$(function () {
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
});