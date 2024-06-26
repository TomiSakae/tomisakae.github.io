let request = indexedDB.open('AnimeCard', 4);

request.onupgradeneeded = function (event) {
    const db = event.target.result;

    // Kiểm tra nếu Object Store chưa tồn tại thì tạo mới
    if (!db.objectStoreNames.contains('AnhAnime')) {
        const objectStore = db.createObjectStore('AnhAnime', { keyPath: 'id' });
    } else {
        const objectStore = event.target.transaction.objectStore('AnhAnime');
        // Thực hiện các thay đổi khác nếu cần
    }
};

request.onsuccess = function (event) {
    const db = event.target.result;
    // Danh sách dữ liệu cần thêm
    const dataList = [
        {
            id: 1,
            hang: "F",
            url_anh: "AnimeCard/The_iDOLM@STER_Cinderella_Girls/anzu-futaba-2.jpg",
            ten: "Anzu Futaba",
            ky_nang: "Gây 10 sát thương.",
            cd: 30
        },
        {
            id: 2,
            hang: "F",
            url_anh: "AnimeCard/The_iDOLM@STER_Cinderella_Girls/kaede-takagaki-3.jpg",
            ten: "Kaede Takagaki",
            ky_nang: "Tăng thời gian thêm 5 giây.",
            cd: 30
        },
        {
            id: 3,
            hang: "F",
            url_anh: "AnimeCard/The_iDOLM@STER_Cinderella_Girls/mika-jougasaki-3.jpg",
            ten: "Mika Jougasaki",
            ky_nang: "Gây thêm 1 sát thương tương ứng với số lần nhấn trong 1 giây.",
            cd: 30
        },
        {
            id: 4,
            hang: "F",
            url_anh: "AnimeCard/The_iDOLM@STER_Cinderella_Girls/mio-honda-3.jpg",
            ten: "Mio Honda",
            ky_nang: "Tăng thời gian thêm 1 giây tương ứng với số lần nhấn trong 1 giây.",
            cd: 30
        },
        // Thêm nhiều đối tượng dữ liệu tùy ý
    ];

    // Thêm từng dữ liệu vào cơ sở dữ liệu
    addMultipleData(db, dataList);
};

request.onerror = function (event) {
    console.error('Database error:', event.target.errorCode);
};

function addMultipleData(db, dataList) {
    const transaction = db.transaction(['AnhAnime'], 'readwrite');
    const objectStore = transaction.objectStore('AnhAnime');

    dataList.forEach(data => {
        const request = objectStore.put(data);

        request.onsuccess = function (event) {

        };

        request.onerror = function (event) {
            console.error('Error adding/updating data:', event.target.errorCode, data);
        };
    });

    transaction.oncomplete = function () {

    };

    transaction.onerror = function (event) {
        console.error('Transaction error:', event.target.errorCode);
    };
}
