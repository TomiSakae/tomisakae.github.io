$(function () {
    let trang = Number(localStorage.getItem("trang"));

    if (trang == 0) {
        localStorage.setItem("trang", 1);
        trang = 1;
    }

    switch (trang) {
        case 1:
            window.location.href = "Trang1/index.html";
            break;
    }
});