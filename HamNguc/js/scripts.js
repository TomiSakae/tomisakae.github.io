$(function () {
    $('[id^="the_bai"]').click(function () {
        const id_phan_tu = $(this).attr("id");

        // Sử dụng biểu thức chính quy để trích xuất số từ id
        const so_phia_sau = id_phan_tu.match(/\d+$/);

        $("#thong_tin_the_bai").modal("show");
    });
});