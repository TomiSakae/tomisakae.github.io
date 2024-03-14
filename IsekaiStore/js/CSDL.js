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
                mo_ta_ngan: "Đây là 1 thanh kiếm gỗ.",
                mo_ta: `
                <p>Đây là 1 thanh kiếm làm bằng gỗ.</p>
                <p>Có thể gây sát thương nhất định cho những kẻ thù yếu.</p>
                <p>Một sản phẩm phù hợp để đấu luyện.</p>
                    `
            },
            {
                id: "2",
                ten: "Kiếm Đá",
                gia: "10",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/MCVanilla/VuKhi/ThanhKiem/stone_sword_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "Đây là 1 thanh kiếm đá.",
                mo_ta: `
                <p>Đây là 1 thanh kiếm làm bằng đá.</p>
                <p>Có thể gây sát thương nhất định cho những kẻ thù yếu.</p>
                <p>Một sản phẩm phù hợp cho người mới.</p>
                    `
            },
            {
                id: "3",
                ten: "Kiếm Sắt",
                gia: "15",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/MCVanilla/VuKhi/ThanhKiem/iron_sword_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "Đây là 1 thanh kiếm sắt.",
                mo_ta: `
                <p>Đây là 1 thanh kiếm làm bằng sắt.</p>
                <p>Có thể gây sát thương lớn cho những kẻ thù yếu.</p>
                <p>Một sản phẩm phù hợp cho các nhà mạo hiểm.</p>
                    `
            },
            {
                id: "4",
                ten: "Kiếm Vàng",
                gia: "20",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/MCVanilla/VuKhi/ThanhKiem/gold_sword_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "Đây là 1 thanh kiếm vàng.",
                mo_ta: `
                <p>Đây là 1 thanh kiếm làm bằng vàng.</p>
                <p>Có thể gây sát thương lớn cho những kẻ thù yếu.</p>
                <p>Một sản phẩm phù hợp cho các mạo hiểm giả.</p>
                    `
            },
            {
                id: "5",
                ten: "Kiếm Kim Cương",
                gia: "50",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/MCVanilla/VuKhi/ThanhKiem/diamond_sword_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "Đây là 1 thanh kiếm kim cương.",
                mo_ta: `
                <p>Đây là 1 thanh kiếm làm bằng kim cương.</p>
                <p>Có thể gây sát thương lớn cho những kẻ thù mạnh.</p>
                <p>Một sản phẩm phù hợp cho các mạo hiểm giả mạnh.</p>
                    `
            },
            {
                id: "6",
                ten: "Kiếm Netherite",
                gia: "100",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/MCVanilla/VuKhi/ThanhKiem/netherite_sword_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "Thanh kiếm mạnh nhất Minecraft.",
                mo_ta: `
                <p>Đây là 1 thanh kiếm làm bằng netherite.</p>
                <p>Có thể gây sát thương cực lớn cho những kẻ thù mạnh.</p>
                <p>Một sản phẩm phù hợp cho các mạo hiểm giả cấp cao.</p>
                    `
            },
        ];

        let dem = 0;
        for (var i in nhap_gio_do) {
            objectStore.add(nhap_gio_do[i]);
            dem++;
        }
        localStorage.setItem("so_sp", dem - 1);
        localStorage.setItem("sl_vp_gio", 0);

    };
}