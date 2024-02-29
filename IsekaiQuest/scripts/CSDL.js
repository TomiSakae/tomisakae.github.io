function NgauNhienTrongDoan(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

if (localStorage.getItem("csdl") == 0) {
    let request = indexedDB.open("IsekaiQuest", 4);
    let db;

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.createObjectStore("ma_thuong", { keyPath: "id" });
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["ma_thuong"], "readwrite");
        let objectStore = transaction.objectStore("ma_thuong");

        let nhap_ma_thuong = [
            { id: "1", ma: "TOMISAKAE", da_dung: "0" },
            { id: "2", ma: "ISEKAIQUEST", da_dung: "0" }
        ];

        for (var i in nhap_ma_thuong) {
            objectStore.add(nhap_ma_thuong[i]);
        }

    };

    localStorage.setItem("csdl", 1);
    localStorage.setItem("mau_nv", 100);
    localStorage.setItem("doi_nv", 100);
    localStorage.setItem("khat_nv", 100);
    localStorage.setItem("the_luc_nv", 100);

    localStorage.setItem("ngay_game", 1);
    localStorage.setItem("gio_game", 6);
    localStorage.setItem("phut_game", "00");


    let viet_quat = NgauNhienTrongDoan(100, 200);
    localStorage.setItem("viet_quat_ngay", viet_quat);
    let mam_xoi = NgauNhienTrongDoan(200, 400);
    localStorage.setItem("mam_xoi_ngay", mam_xoi);
    let dau_tay_dai = NgauNhienTrongDoan(50, 100);
    localStorage.setItem("dau_tay_dai_ngay", dau_tay_dai);
}

