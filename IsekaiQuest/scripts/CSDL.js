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
}