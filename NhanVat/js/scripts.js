function MobileFix() {
    let width = $(window).width();

    if (width <= 768) {
        $("#mobile-fix-anime").html(`
            <button type="button" class="nut-chon-anime mb-3 py-2 px-3">Anime</button>
            <h4>Date A Live</h4>
        <p class="text-muted">Danh sách thẻ nhân vật</p>
        <div class="row mobile-fix-row">
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center me-5 my-4">
                <h6 class="mb-2">Độ Hiếm: SR</h6>
                <img src="../anime/date_a_live/tohka/tohka-yatogami-1-1.jpg" alt="ảnh Yatogami Tohka"
                    class="w-50 h-auto">
                <h5 class="mt-2">Yatogami Tohka</h5>
            </div>
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center my-4">
                <h6 class="mb-2">Độ Hiếm: SR</h6>
                <img src="../anime/date_a_live/yoshino/yoshino-1-1.jpg" alt="ảnh Yatogami Tohka" class="w-50 h-auto">
                <h5 class="mt-2">Yoshino</h5>
            </div>
        </div>

        <div class="row mobile-fix-row">
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center me-5 my-4">
                <h6 class="mb-2">Độ Hiếm: UR</h6>
                <img src="../anime/date_a_live/kurumi/kurumi-tokisaki-1-1.jpg" alt="ảnh Yatogami Tohka"
                    class="w-50 h-auto">
                <h5 class="mt-2">Tokisaki Kurumi</h5>
            </div>
            <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center my-4">
                <h6 class="mb-2">Độ Hiếm: SR</h6>
                <img src="../anime/date_a_live/kotori/kotori-itsuka-1-1.jpg" alt="ảnh Yatogami Tohka"
                    class="w-50 h-auto">
                <h5 class="mt-2">Itsuka Kotori</h5>
            </div>
        </div>
            `);
        $(".mobile-fix-the").removeClass("container");
        $(".mobile-fix-the").addClass("mx-3");
        $(".mobile-fix-row").addClass("mx-2");
    }

    if (width > 768) {
        $(".mobile-fix-the").removeClass("mx-3");
        $(".mobile-fix-the").addClass("container");
        $("#mobile-fix-anime").html(`
            <div class="row">
            <div class="col-2 border-end">
                <h5 class="vung-chon-anime px-3 py-3">Date A Live</h5>
            </div>
            <div class="col-10 px-5">
                <h4>Date A Live</h4>
                <p class="text-muted">Danh sách thẻ nhân vật</p>

                <div class="row my-4">
                    <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center me-5">
                        <h6 class="mb-2">Độ Hiếm: SR</h6>
                        <img src="../anime/date_a_live/tohka/tohka-yatogami-1-1.jpg" alt="ảnh Yatogami Tohka"
                            class="w-50 h-auto">
                        <h5 class="mt-2">Yatogami Tohka</h5>
                    </div>
                    <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center">
                        <h6 class="mb-2">Độ Hiếm: SR</h6>
                        <img src="../anime/date_a_live/yoshino/yoshino-1-1.jpg" alt="ảnh Yatogami Tohka"
                            class="w-50 h-auto">
                        <h5 class="mt-2">Yoshino</h5>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center me-5">
                        <h6 class="mb-2">Độ Hiếm: UR</h6>
                        <img src="../anime/date_a_live/kurumi/kurumi-tokisaki-1-1.jpg" alt="ảnh Yatogami Tohka"
                            class="w-50 h-auto">
                        <h5 class="mt-2">Tokisaki Kurumi</h5>
                    </div>
                    <div class="col-lg-5 the-nhan-vat py-4 px-4 text-center">
                        <h6 class="mb-2">Độ Hiếm: SR</h6>
                        <img src="../anime/date_a_live/kotori/kotori-itsuka-1-1.jpg" alt="ảnh Yatogami Tohka"
                            class="w-50 h-auto">
                        <h5 class="mt-2">Itsuka Kotori</h5>
                    </div>
                </div>
            </div>
        </div>
            `);
    }
}

$(function () {
    MobileFix();
});

$(window).resize(function () {
    MobileFix();
});