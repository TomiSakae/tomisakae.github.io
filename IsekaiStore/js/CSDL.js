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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "minecraft",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "minecraft",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "minecraft",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "minecraft",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "minecraft",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "minecraft",
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
                dang: "vu_khi",
                loai: "cay_cung",
                game: "minecraft",
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
                dang: "vu_khi",
                loai: "cay_no",
                game: "minecraft",
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
                dang: "vu_khi",
                loai: "cay_giao",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "non",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "non",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "non",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "non",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "non",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "non",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "ao",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "ao",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "ao",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "ao",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "ao",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "quan",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "quan",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "quan",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "quan",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "quan",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "giay",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "giay",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "giay",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "giay",
                game: "minecraft",
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
                dang: "giap_tru",
                loai: "giay",
                game: "minecraft",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
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
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Gold_Shortsword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "48",
                ten: "Thanh Kiếm Chì",
                gia: "40",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Lead_Broadsword_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "49",
                ten: "Thanh Kiếm Bạc",
                gia: "60",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Silver_Broadsword_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "50",
                ten: "Kiếm Gỗ Tần Bì",
                gia: "8",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Ash_Wood_Sword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
                <p>...</p>
                    `
            },
            {
                id: "51",
                ten: "Kiếm Ruồi",
                gia: "50",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Flymeal_scaled_8x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "52",
                ten: "Găng Tay Lưỡi Đao",
                gia: "25",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Bladed_Glove_scaled_14x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "53",
                ten: "Thanh Kiếm Vonfram",
                gia: "100",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Tungsten_Broadsword_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "54",
                ten: "Tay Thây Ma",
                gia: "35",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Zombie_Arm_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "55",
                ten: "Thanh Kiếm Vàng",
                gia: "110",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Gold_Broadsword_scaled_8x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "56",
                ten: "Kiếm Bạch Kim",
                gia: "60",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Platinum_Shortsword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "57",
                ten: "Lưỡi Dao Hàm Dưới",
                gia: "44",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Mandible_Blade_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "58",
                ten: "Kéo Sành Điệu",
                gia: "77",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Stylish_Scissors_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "59",
                ten: "Cây Thước",
                gia: "1",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Ruler_scaled_12x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "60",
                ten: "Thanh Kiếm Bạch Kim",
                gia: "200",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Platinum_Broadsword_scaled_8x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "61",
                ten: "Cây Dù",
                gia: "20",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Umbrella_scaled_7x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "62",
                ten: "Sậy Thở",
                gia: "10",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Breathing_Reed_scaled_7x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "63",
                ten: "Gladius",
                gia: "25",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Gladius_scaled_8x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "64",
                ten: "Kiếm Xương",
                gia: "35",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Bone_Sword_scaled_7x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "65",
                ten: "Kiếm Cánh Dơi",
                gia: "200",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Bat_Bat_scaled_6x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "66",
                ten: "Xúc Tu Nhọn",
                gia: "45",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Tentacle_Spike_scaled_7x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "67",
                ten: "Kiếm Kẹo Mía",
                gia: "80",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Candy_Cane_Sword_scaled_6x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "68",
                ten: "Katana",
                gia: "66",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Katana_scaled_7x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "69",
                ten: "Lưỡi Dao Băng",
                gia: "40",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Ice_Blade_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "70",
                ten: "Tai Ương Của Ánh Sáng",
                gia: "55",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Light's_Bane_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "71",
                ten: "Chiếc Ô Bi Kịch",
                gia: "48",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Tragic_Umbrella_scaled_6x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "72",
                ten: "Muramasa",
                gia: "150",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Muramasa_scaled_6x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "73",
                ten: "Đao Kiếm Kỳ Lạ",
                gia: "120",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Exotic_Scimitar_scaled_8x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "74",
                ten: "Phaseblade",
                gia: "169",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Phaseblade_scaled_7x_minified.gif",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "75",
                ten: "Đồ Tể Máu",
                gia: "202",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Blood_Butcherer_scaled_7x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "76",
                ten: "Kiếm Ngôi Sao",
                gia: "245",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Starfury_scaled_8x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "77",
                ten: "Kiếm Phù Phép",
                gia: "165",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Enchanted_Sword_(item)_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "78",
                ten: "Kiếm Hội Cá Tím",
                gia: "320",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Purple_Clubberfish_scaled_7x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "79",
                ten: "Kiếm Ong",
                gia: "290",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Bee_Keeper_scaled_8x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "80",
                ten: "Lưỡi Dao Ưng",
                gia: "230",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Falcon_Blade_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "81",
                ten: "Kiếm Ngọn Cỏ",
                gia: "35",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Blade_of_Grass_scaled_5x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "82",
                ten: "Kiếm Núi Lửa",
                gia: "450",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Volcano_scaled_5x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "83",
                ten: "Kiếm Bóng Đêm",
                gia: "550",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Night's_Edge_scaled_8x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "84",
                ten: "Kiếm Gỗ Ngọc",
                gia: "288",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Pearlwood_Sword_scaled_10x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "85",
                ten: "Mía Sang Trọng",
                gia: "85",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Classy_Cane_scaled_12x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "86",
                ten: "Gậy Tát",
                gia: "680",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Slap_Hand_scaled_9x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "87",
                ten: "Kiếm Coban",
                gia: "480",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Cobalt_Sword_scaled_6x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "88",
                ten: "Kiếm Palladium",
                gia: "520",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Palladium_Sword_scaled_7x_pngcrushed.png",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "89",
                ten: "Kiếm Ánh Sáng",
                gia: "510",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Phasesaber_scaled_7x_minified.gif",
                mo_ta_ngan: "...",
                mo_ta: `
    <p>...</p>
        `
            },
            {
                id: "90",
                ten: "Liềm Băng",
                gia: "670",
                sl_gio_do: "0",
                sl_tui_do: "0",
                dang: "vu_khi",
                loai: "thanh_kiem",
                game: "terraria",
                url: "/IsekaiStore/img/Terraria/VuKhi/ThanhKiem/Ice_Sickle_scaled_8x_pngcrushed.png",
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