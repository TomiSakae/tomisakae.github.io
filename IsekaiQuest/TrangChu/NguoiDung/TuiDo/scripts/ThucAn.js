let nhap_tui_do = [];

let request = indexedDB.open("IsekaiQuest", 4);
let db;

request.onsuccess = function (event) {
    db = event.target.result;
    let transaction = db.transaction(["tui_do"]);
    let objectStore = transaction.objectStore("tui_do");

    let getRequest, id;
    for (let i = 1; i <= 3; i++) {
        id = i.toString();
        getRequest = objectStore.get(id);
        getRequest.onsuccess = function (event) {
            let lay_tui_do = event.target.result;
            if (lay_tui_do) { // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào mảng
                nhap_tui_do.push(lay_tui_do);
            }
        };
    }

};

function AnDoAn(ma_do_an) {
    let dl_doi = localStorage.getItem("doi_nv");
    let doi = Number(dl_doi);
    if (doi < 100) {
        switch (ma_do_an) {
            case 1:
                doi += 5;
                break;
            case 2:
                doi += 3;
                break;
            case 3:
                doi += 10;
                break;
        }

        let ten_ma = ma_do_an.toString();
        for (let vp_tui_do of nhap_tui_do) {
            if (vp_tui_do.id == ma_do_an) {
                vp_tui_do.so_luong--;
                if (vp_tui_do.so_luong <= 0) {
                    vp_tui_do.so_luong = 0;
                    document.getElementById("div" + vp_tui_do.id).classList.add("d-none");
                }
                document.getElementById(ten_ma).innerHTML = vp_tui_do.ten + ": " + vp_tui_do.so_luong;
            }
        }

        let request = indexedDB.open("IsekaiQuest", 4);
        let db;

        request.onsuccess = function (event) {
            db = event.target.result;
            let transaction = db.transaction(["tui_do"], "readwrite");
            let objectStore = transaction.objectStore("tui_do");

            let getRequest = objectStore.get(ten_ma);
            getRequest.onsuccess = function (event) {
                let data = event.target.result;
                // Sửa đổi dữ liệu
                let so_luong_vp = Number(data.so_luong);
                so_luong_vp--;
                if (so_luong_vp <= 0) {
                    so_luong_vp = 0;
                }
                data.so_luong = so_luong_vp.toString();

                // Cập nhật dữ liệu trong object store
                objectStore.put(data);
            };
        };


        if (doi >= 100) {
            doi = 100;
        }

        localStorage.setItem("doi_nv", doi);
    } else {
        // Lấy tham chiếu đến thẻ button bằng ID
        let button = document.getElementById("nut_an");

        // Thay đổi thuộc tính data-bs-toggle
        button.setAttribute("data-bs-toggle", "modal");

        // Thay đổi thuộc tính data-bs-target
        button.setAttribute("data-bs-target", "#hop_canh_bao");
    }

}