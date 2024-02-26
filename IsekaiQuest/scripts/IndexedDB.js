// Tổng hợp lệnh của IndexedDB

// Tạo CSDL
function TaoCSDL() {
    indexedDB.open("ten_csdl", 1);
}

// Xóa CSDL
function XoaCSDL() {
    indexedDB.deleteDatabase("ten_csdl");
}

// Tạo kho CSDL
function TaoKhoCSDL() {
    let request = indexedDB.open("ten_csdl", 4);
    let db;

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.createObjectStore("ten_kho", { keyPath: "id" });
    };
}

// Xóa kho CSDL(Lỗi?)
function XoaKhoCSDL() {
    let request = indexedDB.open("ten_csdl", 2);
    let db;
    request.onupgradeneeded = function (event) {
        db = event.target.result;
        db.deleteObjectStore("ten_kho");
    };
}


// Thêm giá trị vào kho CSDL
function ThemGTCSDL() {
    let request = indexedDB.open("ten_csdl", 1);
    let db;

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["ten_kho"], "readwrite");
        let objectStore = transaction.objectStore("ten_kho");

        objectStore.add({
            id: "id", key: "gia_tri"
        });
    };
}

// Lấy giá trị từ kho CSDL
function LayGTCSDL() {
    let request = indexedDB.open("ten_csdl", 1);
    let db;

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["ten_kho"]);
        let objectStore = transaction.objectStore("ten_kho");

        let getRequest = objectStore.get("id");
        getRequest.onsuccess = function (event) {
            console.log(getRequest.result.key);
        };
    };
}

// Xóa giá trị từ kho CSDL
function XoaGTCSDL() {
    let request = indexedDB.open("ten_csdl", 1);
    let db;

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["ten_kho"], "readwrite");
        let objectStore = transaction.objectStore("ten_kho");

        objectStore.delete("id");
    };
}



