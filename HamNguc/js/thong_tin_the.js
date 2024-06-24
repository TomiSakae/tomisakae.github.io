let o_trong = 1;

function ThongTinTheBai() {
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
                $("#ky_nang").text("Tăng chỉ số ATK thêm 10.");
                break;
            case 2:
                $("#hang_the_bai").text("Hạng: F");
                $("#anh_the_bai").attr('src', "AnimeCard/The_iDOLM@STER_Cinderella_Girls/kaede-takagaki-3.jpg");
                $("#ten_the_bai").text("Kaede Takagaki");
                $("#ky_nang").text("Tăng thời gian thêm 5 giây.");
                break;
            case 3:
                $("#hang_the_bai").text("Hạng: F");
                $("#anh_the_bai").attr('src', "AnimeCard/The_iDOLM@STER_Cinderella_Girls/mika-jougasaki-3.jpg");
                $("#ten_the_bai").text("Mika Jougasaki");
                $("#ky_nang").text("Tăng chỉ số ATK thêm 1 với mỗi lần nhấn trong 1 giây. ");
                break;
            case 4:
                $("#hang_the_bai").text("Hạng: F");
                $("#anh_the_bai").attr('src', "AnimeCard/The_iDOLM@STER_Cinderella_Girls/mio-honda-3.jpg");
                $("#ten_the_bai").text("Mio Honda");
                $("#ky_nang").text("Tăng thời gian thêm 1 giây với mỗi lần nhấn trong 1 giây.");
                break;
        }
    });
}

$(function () {

    ThongTinTheBai();

    $("#nut_thu_thap").click(function () {
        $("#thong_tin_the_bai").modal("hide");
        $("#thiet_lap_doi_hinh").modal("show");
    });

    $('[id^="doi_hinh"]').click(function () {
        const id_phan_tu = $(this).attr("id");

        // Sử dụng biểu thức chính quy để trích xuất số từ id
        const so_phia_sau = id_phan_tu.match(/\d+$/);
        $("#o_trong" + o_trong).attr('src', "AnimeCard/The_iDOLM@STER_Cinderella_Girls/mio-honda-3.jpg");
        $("#o_trong" + o_trong).attr('id', "the_bai1");
        if (o_trong < 5) {
            o_trong++;
        }
        ThongTinTheBai();
    });

    $("#reset_doi_hinh").click(function () {
        $('[class^="loai_bo"]').attr("src", "AnimeCard/icon_plus.png");
        o_trong = 1;
        $(".loai_bo1").attr("id", "o_trong1");
        $(".loai_bo2").attr("id", "o_trong2");
        $(".loai_bo3").attr("id", "o_trong3");
        $(".loai_bo4").attr("id", "o_trong4");
    });
});