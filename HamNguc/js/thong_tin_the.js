$(function () {
    $('[id^="the_bai"]').click(function () {
        const id_phan_tu = $(this).attr("id");

        // Sử dụng biểu thức chính quy để trích xuất số từ id
        const so_phia_sau = id_phan_tu.match(/\d+$/);

        $("#thong_tin_the_bai").modal("show");

        switch (Number(so_phia_sau)) {
            case 1:
                $("#hang_the_bai").text("Hạng: F");
                $("#anh_the_bai").attr('src', "AnimeCard/The_iDOLM@STER_Cinderella_Girls/anzu-futaba-2.jpg");
                $("#ten_the_bai").text("Anzu Futaba");
                $("#ky_nang").text("Tăng 10 chỉ số ATK.");
                break;
            case 2:
                $("#hang_the_bai").text("Hạng: F");
                $("#anh_the_bai").attr('src', "AnimeCard/The_iDOLM@STER_Cinderella_Girls/kaede-takagaki-3.jpg");
                $("#ten_the_bai").text("Kaede Takagaki");
                $("#ky_nang").text("Tăng thời gian lên 5 giây.");
                break;
            case 3:
                $("#hang_the_bai").text("Hạng: F");
                $("#anh_the_bai").attr('src', "AnimeCard/The_iDOLM@STER_Cinderella_Girls/mika-jougasaki-3.jpg");
                $("#ten_the_bai").text("Mika Jougasaki");
                $("#ky_nang").text("Tăng 5% tỷ lệ chí mạng.");
                break;
            case 4:
                $("#hang_the_bai").text("Hạng: F");
                $("#anh_the_bai").attr('src', "AnimeCard/The_iDOLM@STER_Cinderella_Girls/mio-honda-3.jpg");
                $("#ten_the_bai").text("Mio Honda");
                $("#ky_nang").text("Tăng 10% sát thương chí mạng.");
                break;
        }
    });
});