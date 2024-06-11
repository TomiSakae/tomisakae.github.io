let kt_che_do = 0;
function BatDau() {
    if (kt_che_do != 0) {

    }
}

$("#chon_che_do").click(function () {
    kt_che_do = 1;
    $("#nut_bat_dau").removeAttr('data-bs-toggle');
    $("#nut_bat_dau").removeAttr('data-bs-target');
    $("#chon_che_do").removeClass("che-do-choi");
    $("#chon_che_do").addClass("che-do-choi-chon");
});
