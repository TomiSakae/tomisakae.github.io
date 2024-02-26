let tien = localStorage.getItem("tien");

if (tien == null) {
    tien = 0;
}

document.getElementById("tien").innerHTML = "Tiền: " + tien + " VNĐ"