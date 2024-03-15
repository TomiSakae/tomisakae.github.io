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
            {
                id: "7",
                ten: "Cây Cung",
                gia: "10",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "cay_cung",
                url: "/IsekaiStore/img/MCVanilla/VuKhi/CayCung/bow_standby_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "Cây cung duy nhất trong Minecraft.",
                mo_ta: `
                <p>Một cây cung bình thường.</p>
                <p>Thích hợp dùng để săn bắn.</p>
                    `
            },
            {
                id: "8",
                ten: "Cây Nỏ",
                gia: "15",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "cay_no",
                url: "/IsekaiStore/img/MCVanilla/VuKhi/CayNo/crossbow_standby_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "Cây nỏ duy nhất trong Minecraft.",
                mo_ta: `
                <p>Một cây nỏ bình thường.</p>
                <p>Thích hợp dùng để săn bắn.</p>
                    `
            },
            {
                id: "9",
                ten: "Cây Đinh Ba",
                gia: "50",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "cay_giao",
                url: "/IsekaiStore/img/MCVanilla/VuKhi/CayGiao/trident_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "Cây đinh ba khá mạnh trong Minecraft.",
                mo_ta: `
                <p>Một cây đinh ba có thể phóng và đánh.</p>
                <p>Khá mạnh cho người biết sử dụng.</p>
                    `
            },
            {
                id: "10",
                ten: "Nón Xích",
                gia: "10",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "non",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Non/chainmail_helmet_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "11",
                ten: "Nón Sắt",
                gia: "20",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "non",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Non/iron_helmet_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "12",
                ten: "Nón Vàng",
                gia: "25",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "non",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Non/gold_helmet_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "13",
                ten: "Nón Kim Cương",
                gia: "50",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "non",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Non/diamond_helmet_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "14",
                ten: "Nón Netherite",
                gia: "100",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "non",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Non/netherite_helmet_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "15",
                ten: "Nón Mai Rùa",
                gia: "500",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "non",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Non/turtle_helmet_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "16",
                ten: "Áo Xích",
                gia: "50",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "ao",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giap/chainmail_chestplate_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "17",
                ten: "Áo Sắt",
                gia: "100",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "ao",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giap/iron_chestplate_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "18",
                ten: "Áo Vàng",
                gia: "125",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "ao",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giap/gold_chestplate_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "19",
                ten: "Áo Kim Cương",
                gia: "250",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "ao",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giap/diamond_chestplate_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "20",
                ten: "Áo Netherite",
                gia: "500",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "ao",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giap/netherite_chestplate_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "21",
                ten: "Quần Xích",
                gia: "25",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "quan",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Quan/chainmail_leggings_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "22",
                ten: "Quần Sắt",
                gia: "50",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "quan",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Quan/iron_leggings_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "23",
                ten: "Quần Vàng",
                gia: "65",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "quan",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Quan/gold_leggings_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "24",
                ten: "Quần Kim Cương",
                gia: "125",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "quan",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Quan/diamond_leggings_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "25",
                ten: "Quần Netherite",
                gia: "250",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "quan",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Quan/netherite_leggings_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "26",
                ten: "Giầy Xích",
                gia: "10",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "giay",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giay/chainmail_boots_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "27",
                ten: "Giầy Sắt",
                gia: "20",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "giay",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giay/iron_boots_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "28",
                ten: "Giầy Vàng",
                gia: "25",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "giay",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giay/gold_boots_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "29",
                ten: "Giầy Kim Cương",
                gia: "50",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "giay",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giay/diamond_boots_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "30",
                ten: "Giầy Netherite",
                gia: "100",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "giay",
                url: "/IsekaiStore/img/MCVanilla/AoGiap/Giay/netherite_boots_scaled_20x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "31",
                ten: "Kiếm Đồng",
                gia: "6",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Copper_Shortsword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "32",
                ten: "Kiếm Thiếc",
                gia: "12",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Tin_Shortsword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "33",
                ten: "Kiếm Gỗ",
                gia: "5",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Wooden_Sword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "34",
                ten: "Kiếm Gỗ Phương Bắc",
                gia: "6",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Boreal_Wood_Sword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "35",
                ten: "Thanh Kiếm Đồng",
                gia: "12",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Copper_Broadsword_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "36",
                ten: "Kiếm Sắt",
                gia: "10",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Iron_Shortsword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "37",
                ten: "Kiếm Gỗ Cọ",
                gia: "6",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Palm_Wood_Sword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "38",
                ten: "Kiếm Gỗ Gụ",
                gia: "6",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Rich_Mahogany_Sword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "39",
                ten: "Kiếm Xương Rồng",
                gia: "15",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Cactus_Sword_scaled_7x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "40",
                ten: "Kiếm Chì",
                gia: "20",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Lead_Shortsword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "41",
                ten: "Kiếm Bạc",
                gia: "30",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Silver_Shortsword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "42",
                ten: "Thanh Kiếm Thiếc",
                gia: "24",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Tin_Broadsword_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "43",
                ten: "Kiếm Gỗ Mun",
                gia: "7",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Ebonwood_Sword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "44",
                ten: "Thanh Kiếm Sắt",
                gia: "20",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Iron_Broadsword_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "45",
                ten: "Kiếm Gỗ Mát",
                gia: "8",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Shadewood_Sword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "46",
                ten: "Kiếm Vonfram",
                gia: "35",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Tungsten_Shortsword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "47",
                ten: "Kiếm Vàng",
                gia: "40",
                sl_gio_do: "0",
                sl_tui_do: "0",
                loai: "thanh_kiem",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Gold_Shortsword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
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