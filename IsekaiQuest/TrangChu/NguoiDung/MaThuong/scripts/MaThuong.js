let nhap_ma_thuong = [];

let request = indexedDB.open("IsekaiQuest", 4);
let db;

request.onsuccess = function (event) {
    db = event.target.result;
    let transaction = db.transaction(["ma_thuong"]);
    let objectStore = transaction.objectStore("ma_thuong");

    let getRequest, id;
    for (let i = 1; i <= 2; i++) {
        id = i.toString();
        getRequest = objectStore.get(id);
        getRequest.onsuccess = function (event) {
            let lay_ma_thuong = event.target.result;
            if (lay_ma_thuong) { // Kiểm tra xem dữ liệu có tồn tại không trước khi thêm vào mảng
                nhap_ma_thuong.push(lay_ma_thuong);
            }
        };
    }

};

function KiemTraMaThuong(ten_ma_thuong) {
    let kiem_tra = -1;
    let dem = 1;
    for (let ten_ma of nhap_ma_thuong) {
        if (ten_ma.ma == ten_ma_thuong) {
            if (ten_ma.da_dung == 0) {
                kiem_tra = dem;
            }
            else {
                kiem_tra = 0;
            }
        }
        dem++;
    }

    return kiem_tra;
}

function XoaMa(kiem_id) {
    let request = indexedDB.open("IsekaiQuest", 4);
    let db;

    request.onsuccess = function (event) {
        db = event.target.result;
        let transaction = db.transaction(["ma_thuong"], "readwrite");
        let objectStore = transaction.objectStore("ma_thuong");

        let id = kiem_id.toString();
        let getRequest = objectStore.get(id);
        getRequest.onsuccess = function (event) {
            let data = event.target.result;

            // Sửa đổi dữ liệu
            data.da_dung = "1";

            // Cập nhật dữ liệu trong object store
            objectStore.put(data);

            nhap_ma_thuong[kiem_id - 1].da_dung = 1;
        };
    };
}

let thong_bao_ma_thuong;
function LayMa(ten_ma) {
    let kiem_ma = KiemTraMaThuong(ten_ma);
    if (kiem_ma > 0) {
        thong_bao_ma_thuong = "Bạn đã nhập mã thành công!";
        XoaMa(kiem_ma);
    }
    else if (kiem_ma == 0) {
        thong_bao_ma_thuong = "Mã đã được sử dụng!";
    }
    else {
        thong_bao_ma_thuong = "Mã không hợp lệ!";
    }
}

