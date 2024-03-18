import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBwGPorxX6qj7E1E-kOdjbOFoHvs5rXUGA",
    authDomain: "tomisakaewb.firebaseapp.com",
    databaseURL: "https://tomisakaewb-default-rtdb.firebaseio.com",
    projectId: "tomisakaewb",
    storageBucket: "tomisakaewb.appspot.com",
    messagingSenderId: "1052630182822",
    appId: "1:1052630182822:web:3fc29454827e134a047d67",
    measurementId: "G-CB10V6ETBS"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import { getDatabase, ref, onChildAdded, onChildChanged, child, get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const db = getDatabase();

const jq = $.noConflict();

jq(function () {

    let ten_nguoi_choi;

    jq("#kiem_tra_ten").on('click', () => {
        ten_nguoi_choi = jq("#ten").val();
        if (ten_nguoi_choi != '') {
            sessionStorage.setItem("ten_nv", ten_nguoi_choi);
            jq("#chon_phong").removeClass("d-none");
            jq("#nhap_ten").addClass("d-none");
            jq("#ten_nv").text(sessionStorage.getItem("ten_nv"));

        }
    });

    jq("#tao_phong").on('click', () => {
        jq("#trang_tao_phong").removeClass("d-none");
        jq("#chon_phong").addClass("d-none");
    });

    jq("#tim_phong").on('click', () => {
        jq("#trang_tim_phong").removeClass("d-none");
        jq("#chon_phong").addClass("d-none");
    });

    jq("#kiem_tra_tim_id").on('click', () => {
        let id_phong = jq("#tim_ma_phong").val();
        if (id_phong != '') {
            const dbRef = ref(db);
            get(child(dbRef, 'PhongChoi/' + id_phong)).then((snapshot) => {
                if (snapshot.exists()) {
                    jq("#trong_phong").removeClass("d-none");
                    jq("#trang_tim_phong").addClass("d-none");
                    const lay_dl_check = ref(db, 'PhongChoi/' + id_phong);
                    let cap_nhat_check = {};
                    cap_nhat_check["nguoi_choi2"] = ten_nguoi_choi;
                    cap_nhat_check["so_luong_nguoi"] = 2;
                    update(lay_dl_check, cap_nhat_check);
                    const lay_dl_ten = ref(db, 'PhongChoi/' + id_phong + '/nguoi_choi1');
                    onValue(lay_dl_ten, (snapshot) => {
                        jq("#ten_p1").text(snapshot.val());
                    });
                    jq("#ten_p2").text(sessionStorage.getItem("ten_nv"));
                    jq("#ma_phong").text(id_phong);
                }
                else {
                    alert("Mã phòng không tồn tại!");
                }
            });
        }
    });

    let ma_phong;
    jq("#kiem_tra_id").on('click', () => {
        let id_phong = jq("#tao_ma_phong").val();
        ma_phong = id_phong;
        if (id_phong != '') {
            const dbRef = ref(db);
            get(child(dbRef, 'PhongChoi/' + id_phong)).then((snapshot) => {
                if (snapshot.exists()) {
                    alert("Mã phòng đã tồn tại!");
                }
                else {
                    set(ref(db, 'PhongChoi/' + id_phong), {
                        so_luong_nguoi: 1,
                        nguoi_choi1: ten_nguoi_choi,
                        nguoi_choi2: "",
                        check_p1: false,
                        check_p2: false,
                        chia_bai: false,
                        la_bai: [],
                        mo_bai: [0, 0, 0, 0, 0, 0],
                        trong_tran: false,
                        nguoi_thang: ""
                    });
                    jq("#trong_phong").removeClass("d-none");
                    jq("#trang_tao_phong").addClass("d-none");
                    jq("#ten_p1").text(sessionStorage.getItem("ten_nv"));
                    jq("#ma_phong").text(id_phong);
                    jq("#bat_dau").removeClass("d-none");
                }
            });
        }
    });

    jq("#san_sang").on('click', () => {
        ma_phong = jq("#ma_phong").text();
        for (let i = 1; i <= 2; i++) {
            const lay_dl_ten = ref(db, 'PhongChoi/' + ma_phong + '/nguoi_choi' + i);
            onValue(lay_dl_ten, (snapshot) => {
                if (snapshot.exists()) {
                    if (ten_nguoi_choi == snapshot.val()) {
                        const lay_dl_check = ref(db, 'PhongChoi/' + ma_phong);
                        let cap_nhat_check = {};
                        cap_nhat_check["check_p" + i] = true;
                        update(lay_dl_check, cap_nhat_check);
                    }
                }
            });
        }

    });

    jq("#chia_bai").on('click', () => {

        const lay_dl_trong_tran = ref(db, 'PhongChoi/' + ma_phong);
        let cap_nhat_trong_tran = {};
        cap_nhat_trong_tran["trong_tran"] = false;
        update(lay_dl_trong_tran, cap_nhat_trong_tran);

        const lay_dl_chia_bai = ref(db, 'PhongChoi/' + ma_phong);
        let cap_nhat_chia_bai = {};
        cap_nhat_chia_bai["chia_bai"] = true;
        update(lay_dl_chia_bai, cap_nhat_chia_bai);


        var numbers = [];

        // Tạo một hàm để kiểm tra xem một số có tồn tại trong mảng không
        function containsNumber(array, number) {
            return array.indexOf(number) > -1;
        }

        // Tạo 6 số ngẫu nhiên không trùng lặp
        while (numbers.length < 6) {
            var randomNumber = Math.floor(Math.random() * 52) + 1;
            if (!containsNumber(numbers, randomNumber)) {
                numbers.push(randomNumber);

            }
        }

        const lay_dl_la_bai = ref(db, 'PhongChoi/' + ma_phong);
        let cap_nhat_la_bai = {};
        cap_nhat_la_bai["la_bai"] = numbers;
        update(lay_dl_la_bai, cap_nhat_la_bai);

    });

    let kt_mo_bai1 = false;
    let kt_mo_bai2 = false;
    let kt_mo_bai3 = false;

    function ChonBai(id) {
        switch (id) {
            case 1:
                return "Cards/card_clubs_02.png";
            case 2:
                return "Cards/card_clubs_03.png";
            case 3:
                return "Cards/card_clubs_04.png";
            case 4:
                return "Cards/card_clubs_05.png";
            case 5:
                return "Cards/card_clubs_06.png";
            case 6:
                return "Cards/card_clubs_07.png";
            case 7:
                return "Cards/card_clubs_08.png";
            case 8:
                return "Cards/card_clubs_09.png";
            case 9:
                return "Cards/card_clubs_10.png";
            case 10:
                return "Cards/card_clubs_A.png";
            case 11:
                return "Cards/card_clubs_J.png";
            case 12:
                return "Cards/card_clubs_Q.png";
            case 13:
                return "Cards/card_clubs_K.png";
            case 14:
                return "Cards/card_diamonds_02.png";
            case 15:
                return "Cards/card_diamonds_03.png";
            case 16:
                return "Cards/card_diamonds_04.png";
            case 17:
                return "Cards/card_diamonds_05.png";
            case 18:
                return "Cards/card_diamonds_06.png";
            case 19:
                return "Cards/card_diamonds_07.png";
            case 20:
                return "Cards/card_diamonds_08.png";
            case 21:
                return "Cards/card_diamonds_09.png";
            case 22:
                return "Cards/card_diamonds_10.png";
            case 23:
                return "Cards/card_diamonds_A.png";
            case 24:
                return "Cards/card_diamonds_J.png";
            case 25:
                return "Cards/card_diamonds_Q.png";
            case 26:
                return "Cards/card_diamonds_K.png";
            case 27:
                return "Cards/card_hearts_02.png";
            case 28:
                return "Cards/card_hearts_03.png";
            case 29:
                return "Cards/card_hearts_04.png";
            case 30:
                return "Cards/card_hearts_05.png";
            case 31:
                return "Cards/card_hearts_06.png";
            case 32:
                return "Cards/card_hearts_07.png";
            case 33:
                return "Cards/card_hearts_08.png";
            case 34:
                return "Cards/card_hearts_09.png";
            case 35:
                return "Cards/card_hearts_10.png";
            case 36:
                return "Cards/card_hearts_A.png";
            case 37:
                return "Cards/card_hearts_J.png";
            case 38:
                return "Cards/card_hearts_Q.png";
            case 39:
                return "Cards/card_hearts_K.png";
            case 40:
                return "Cards/card_spades_02.png";
            case 41:
                return "Cards/card_spades_03.png";
            case 42:
                return "Cards/card_spades_04.png";
            case 43:
                return "Cards/card_spades_05.png";
            case 44:
                return "Cards/card_spades_06.png";
            case 45:
                return "Cards/card_spades_07.png";
            case 46:
                return "Cards/card_spades_08.png";
            case 47:
                return "Cards/card_spades_09.png";
            case 48:
                return "Cards/card_spades_10.png";
            case 49:
                return "Cards/card_spades_A.png";
            case 50:
                return "Cards/card_spades_J.png";
            case 51:
                return "Cards/card_spades_Q.png";
            case 52:
                return "Cards/card_spades_K.png";
        }
    }

    jq("#lap1_1").on('click', () => {
        if (kt_mo_bai1 == false) {
            kt_mo_bai1 = true;
            let id = 0;
            const lay_dl_bai = ref(db, 'PhongChoi/' + ma_phong + '/la_bai');
            onValue(lay_dl_bai, (data) => {
                if (data.exists()) {
                    for (let i = 1; i <= 2; i++) {
                        const lay_dl_ten = ref(db, 'PhongChoi/' + ma_phong + '/nguoi_choi' + i);
                        onValue(lay_dl_ten, (snapshot) => {
                            if (snapshot.exists()) {
                                if (ten_nguoi_choi == snapshot.val()) {
                                    if (i == 1) {
                                        const lay_dl_mo_bai = ref(db, 'PhongChoi/' + ma_phong + '/mo_bai');
                                        let cap_nhat_mo_bai = {};
                                        cap_nhat_mo_bai["0"] = 1;
                                        update(lay_dl_mo_bai, cap_nhat_mo_bai);
                                        id = data.val()[0];
                                    }
                                    else {
                                        const lay_dl_mo_bai = ref(db, 'PhongChoi/' + ma_phong + '/mo_bai');
                                        let cap_nhat_mo_bai = {};
                                        cap_nhat_mo_bai["3"] = 1;
                                        update(lay_dl_mo_bai, cap_nhat_mo_bai);
                                        id = data.val()[3];
                                    }
                                    jq("#lap1_1").attr("src", ChonBai(id));
                                }
                            }
                        });
                    }

                }
            });
        }
    });

    jq("#lap1_2").on('click', () => {
        if (kt_mo_bai2 == false) {
            kt_mo_bai2 = true;
            let id = 0;
            const lay_dl_bai = ref(db, 'PhongChoi/' + ma_phong + '/la_bai');
            onValue(lay_dl_bai, (data) => {
                if (data.exists()) {
                    for (let i = 1; i <= 2; i++) {
                        const lay_dl_ten = ref(db, 'PhongChoi/' + ma_phong + '/nguoi_choi' + i);
                        onValue(lay_dl_ten, (snapshot) => {
                            if (snapshot.exists()) {
                                if (ten_nguoi_choi == snapshot.val()) {
                                    if (i == 1) {
                                        const lay_dl_mo_bai = ref(db, 'PhongChoi/' + ma_phong + '/mo_bai');
                                        let cap_nhat_mo_bai = {};
                                        cap_nhat_mo_bai["1"] = 1;
                                        update(lay_dl_mo_bai, cap_nhat_mo_bai);
                                        id = data.val()[1];
                                    }
                                    else {
                                        const lay_dl_mo_bai = ref(db, 'PhongChoi/' + ma_phong + '/mo_bai');
                                        let cap_nhat_mo_bai = {};
                                        cap_nhat_mo_bai["4"] = 1;
                                        update(lay_dl_mo_bai, cap_nhat_mo_bai);
                                        id = data.val()[4];
                                    }
                                    jq("#lap1_2").attr("src", ChonBai(id));
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    jq("#lap1_3").on('click', () => {
        if (kt_mo_bai3 == false) {
            kt_mo_bai3 = true;
            let id = 0;
            const lay_dl_bai = ref(db, 'PhongChoi/' + ma_phong + '/la_bai');
            onValue(lay_dl_bai, (data) => {
                if (data.exists()) {
                    for (let i = 1; i <= 2; i++) {
                        const lay_dl_ten = ref(db, 'PhongChoi/' + ma_phong + '/nguoi_choi' + i);
                        onValue(lay_dl_ten, (snapshot) => {
                            if (snapshot.exists()) {
                                if (ten_nguoi_choi == snapshot.val()) {
                                    if (i == 1) {
                                        const lay_dl_mo_bai = ref(db, 'PhongChoi/' + ma_phong + '/mo_bai');
                                        let cap_nhat_mo_bai = {};
                                        cap_nhat_mo_bai["2"] = 1;
                                        update(lay_dl_mo_bai, cap_nhat_mo_bai);
                                        id = data.val()[2];
                                    }
                                    else {
                                        const lay_dl_mo_bai = ref(db, 'PhongChoi/' + ma_phong + '/mo_bai');
                                        let cap_nhat_mo_bai = {};
                                        cap_nhat_mo_bai["5"] = 1;
                                        update(lay_dl_mo_bai, cap_nhat_mo_bai);
                                        id = data.val()[5];
                                    }
                                    jq("#lap1_3").attr("src", ChonBai(id));
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    jq("#bat_dau").on('click', () => {
        const lay_dl_trong_tran = ref(db, 'PhongChoi/' + ma_phong);
        let cap_nhat_trong_tran = {};
        cap_nhat_trong_tran["trong_tran"] = true;
        update(lay_dl_trong_tran, cap_nhat_trong_tran);
    });

    onChildChanged(ref(db, 'PhongChoi/'), (data) => {
        const lay_dl_chia_bai = ref(db, 'PhongChoi/' + ma_phong + '/chia_bai');
        const lay_dl_p1 = ref(db, 'PhongChoi/' + ma_phong + '/check_p1');
        const lay_dl_p2 = ref(db, 'PhongChoi/' + ma_phong + '/check_p2');
        const lay_dl_nguoi_choi2 = ref(db, 'PhongChoi/' + ma_phong + '/nguoi_choi2');
        const lay_dl_nguoi_choi1 = ref(db, 'PhongChoi/' + ma_phong + '/nguoi_choi1');
        const lay_dl_trong_tran = ref(db, 'PhongChoi/' + ma_phong + '/trong_tran');
        const lay_dl_mo_bai = ref(db, 'PhongChoi/' + ma_phong + '/mo_bai');
        onValue(lay_dl_mo_bai, (bai) => {
            if (bai.exists()) {
                let id = 0;
                const lay_dl_bai = ref(db, 'PhongChoi/' + ma_phong + '/la_bai');
                onValue(lay_dl_bai, (data) => {
                    if (data.exists()) {
                        for (let i = 1; i <= 2; i++) {
                            const lay_dl_ten = ref(db, 'PhongChoi/' + ma_phong + '/nguoi_choi' + i);
                            onValue(lay_dl_ten, (snapshot) => {
                                if (snapshot.exists()) {
                                    if (ten_nguoi_choi == snapshot.val()) {
                                        if (i == 1) {
                                            if (bai.val()[3] == 1) {
                                                id = data.val()[3];
                                                jq("#lap2_1").attr("src", ChonBai(id));
                                            }
                                            if (bai.val()[4] == 1) {
                                                id = data.val()[4];
                                                jq("#lap2_2").attr("src", ChonBai(id));
                                            }
                                            if (bai.val()[5] == 1) {
                                                id = data.val()[5];
                                                jq("#lap2_3").attr("src", ChonBai(id));
                                            }
                                        }
                                        else {
                                            if (bai.val()[0] == 1) {
                                                id = data.val()[0];
                                                jq("#lap2_1").attr("src", ChonBai(id));
                                            }
                                            if (bai.val()[1] == 1) {
                                                id = data.val()[1];
                                                jq("#lap2_2").attr("src", ChonBai(id));
                                            }
                                            if (bai.val()[2] == 1) {
                                                id = data.val()[2];
                                                jq("#lap2_3").attr("src", ChonBai(id));
                                            }
                                        }
                                    }
                                }
                            });
                        }
                    }
                });
            }
        });

        onValue(lay_dl_chia_bai, (snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val() == true) {
                    jq("#anh_bai").removeClass("d-none");
                    jq("#chia_bai_de").addClass("d-none");
                    jq("#cho_chia_bai").addClass("d-none");


                }
            }
        });
        onValue(lay_dl_p1, (snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val() == true) {
                    jq("#checkp1").removeClass("d-none");
                }
                else {
                    jq("#checkp1").addClass("d-none");
                }
            }
        });
        onValue(lay_dl_p2, (snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val() == true) {
                    jq("#checkp2").removeClass("d-none");
                }
                else {
                    jq("#checkp2").addClass("d-none");
                }
            }
        });
        onValue(lay_dl_nguoi_choi2, (snapshot) => {
            if (snapshot.exists()) {
                jq("#ten_p2").text(snapshot.val());
            }
        });

        onValue(lay_dl_trong_tran, (snapshot) => {
            if (snapshot.exists()) {
                if (snapshot.val() == true) {
                    jq("#tro_choi_chinh").removeClass("d-none");
                    jq("#trong_phong").addClass("d-none");
                    jq("#ten_pl1").text(sessionStorage.getItem("ten_nv"));
                    onValue(lay_dl_nguoi_choi2, (snapshot) => {
                        if (snapshot.exists()) {
                            if (ten_nguoi_choi != snapshot.val()) {
                                jq("#ten_pl2").text(snapshot.val());
                            } else {
                                jq("#cho_chia_bai").removeClass("d-none");
                            }
                        }
                    });
                    onValue(lay_dl_nguoi_choi1, (snapshot) => {
                        if (snapshot.exists()) {
                            if (ten_nguoi_choi != snapshot.val()) {
                                jq("#ten_pl2").text(snapshot.val());
                            }
                            else {
                                jq("#chia_bai_de").removeClass("d-none");
                            }
                        }
                    });
                }
            }
        });
    });

});

// let ten_nhan_vat = localStorage.getItem("ten");
// sendButton.addEventListener('click', function () {
//     let message = messageInput.value.trim();

//     if (message !== '') {
//         const dbRef = ref(db);
//         get(child(dbRef, 'DLNguoiDung/' + ten_nhan_vat)).then((snapshot) => {
//             if (snapshot.exists()) {
//                 message = ten_nhan_vat + ": " + message;
//                 appendMessage(message);
//                 messageInput.value = '';
//             }
//         });
//     }
// });

// function appendMessage(message) {
//     const dbRef = ref(db);
//     get(child(dbRef, 'PhongChatTest/')).then((snapshot) => {
//         if (snapshot.exists()) {
//             let kt_sl = snapshot.val().so_luong.sl;
//             let check_dl = "tin_nhan" + kt_sl;

//             // Tạo một đối tượng để định nghĩa các thuộc tính động
//             let dataToUpdate = {};
//             dataToUpdate['so_luong/sl'] = kt_sl + 1;
//             dataToUpdate[check_dl] = { tin_nhan: message };

//             update(ref(db, 'PhongChatTest/'), dataToUpdate);
//         }
//         else {
//             set(ref(db, 'PhongChatTest/'), {
//                 so_luong: { sl: 1 },
//                 tin_nhan0: { tin_nhan: message }
//             });
//         }
//     });
// }

// // Lắng nghe sự kiện khi có tin nhắn mới được thêm vào cơ sở dữ liệu

// let sl_tin_nhan_db = 0;
// onChildAdded(ref(db, 'PhongChatTest/so_luong/'), (data) => {
//     sl_tin_nhan_db = data.val();
//     console.log(sl_tin_nhan_db);
//     for (let i = 0; i < sl_tin_nhan_db; i++) {
//         const test_db = ref(db, 'PhongChatTest/tin_nhan' + i + '/tin_nhan');
//         onValue(test_db, (snapshot) => {
//             const newMessage = snapshot.val();
//             console.log(newMessage);
//             appendMessageToUI(newMessage);
//         });
//     }
// });

// onChildChanged(ref(db, 'PhongChatTest/so_luong/'), (data) => {
//     sl_tin_nhan_db = data.val() - 1;
//     console.log(sl_tin_nhan_db);
//     const test_db = ref(db, 'PhongChatTest/tin_nhan' + sl_tin_nhan_db + '/tin_nhan');
//     onValue(test_db, (snapshot) => {
//         const li = document.createElement('li');
//         li.textContent = snapshot.val();
//         li.classList.add('list-group-item');
//         messageList.appendChild(li);
//     });
// });

// // Hàm để hiển thị tin nhắn trên giao diện của trang
// function appendMessageToUI(message) {
//     // Lấy phần tử DOM để hiển thị tin nhắn
//     const messageList = document.getElementById('message-list');
//     // Tạo một phần tử để chứa tin nhắn mới
//     const li = document.createElement('li');
//     li.textContent = message;
//     li.classList.add('list-group-item');
//     // Thêm tin nhắn vào danh sách
//     messageList.appendChild(li);
// }