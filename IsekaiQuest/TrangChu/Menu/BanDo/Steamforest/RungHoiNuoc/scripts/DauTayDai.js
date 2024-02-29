let trai_cay_ngay = localStorage.getItem("dau_tay_dai_ngay");
let phan_tram_tim_thay_trai_cay = localStorage.getItem("phan_tram_tim_dau_tay_dai");
let trai_cay_hien_tai = localStorage.getItem("dau_tay_dai_ngay_con_lai");

function TraiCay() {
    localStorage.setItem("phan_tram_tim_dau_tay_dai", phan_tram_tim_thay_trai_cay);
    localStorage.setItem("dau_tay_dai_ngay_con_lai", trai_cay_hien_tai);
}

function KhoiTao() {
    let request = indexedDB.open("IsekaiQuest", 4);
    let db;

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["tui_do"], "readwrite");
        let objectStore = transaction.objectStore("tui_do");

        objectStore.add({
            id: "3", ten: "Dâu tây dại", loai: "thuc_an", so_luong: "1"
        });
    };
}

function NhapTraiCay() {
    let request = indexedDB.open("IsekaiQuest", 4);
    let db;

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["tui_do"], "readwrite");
        let objectStore = transaction.objectStore("tui_do");

        let getRequest = objectStore.get("3");
        getRequest.onsuccess = function (event) {
            let data = event.target.result;

            if (data != undefined) {
                // Sửa đổi dữ liệu
                let so_luong_vp = Number(data.so_luong);
                so_luong_vp++;
                data.so_luong = so_luong_vp.toString();

                // Cập nhật dữ liệu trong object store
                objectStore.put(data);
            }
            else {
                KhoiTao();
            }

        };
    };
}