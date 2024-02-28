function CSDL_KiemTraMa(ten_ma_thuong) {
    let request = indexedDB.open("IsekaiQuest", 1);
    let db;
    let ma = 0;

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["ma_thuong"]);
        let objectStore = transaction.objectStore("ma_thuong");

        let id;
        let getRequest;
        // kiểm tra tên
        for (let i = 1; i <= 2; i++) {
            getRequest = objectStore.get(id);
            getRequest.onsuccess = function (event) {
                if (ten_ma_thuong == getRequest.result.ma) {
                    if (getRequest.result.da_dung == 0) {
                        ma = getRequest.result.id;
                    }
                }
            };
        }

        return ma;
    };

    return ma;
}