if (localStorage.getItem("csdl") == 0) {

}
else {
    localStorage.setItem("csdl", "0");
    localStorage.setItem("so_du", "100");
    let request = indexedDB.open("IsekaiStore", 4);
    let db;

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.createObjectStore("san_pham", { keyPath: "id" });
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["san_pham"], "readwrite");
        let objectStore = transaction.objectStore("san_pham");

        let nhap_gio_do = [
            { id: "0", key: "null" },
            {
                id: "1",
                ten: "Kiếm Gỗ",
                gia: "5",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/MCVanilla/VuKhi/ThanhKiem/wood_sword_scaled_20x_pngcrushed.png",
                mo_ta: `
                <p>Đây là 1 thanh kiếm làm bằng gỗ. Có thể gây sát thương nhất định cho những kẻ thù yếu. Một sản phẩm phù hợp để đấu luyện.</p>
                    `
            },
        ];

        for (var i in nhap_gio_do) {
            objectStore.add(nhap_gio_do[i]);
        }

    };
}