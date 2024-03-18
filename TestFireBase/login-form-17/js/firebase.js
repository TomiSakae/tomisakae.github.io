
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

import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js";

const db = getDatabase();

let ten_dang_nhap = document.getElementById("ten_dang_nhap");
let mat_khau = document.getElementById("mat_khau");
let nut_dang_nhap = document.getElementById("nut_dang_nhap");
let nut_dang_ky = document.getElementById("nut_dang_ky");

function ThemDL() {
    set(ref(db, 'TestDangNhap/'), {
        NguoiDung: { Ten: ten.value }
    }).then(() => {
        alert("Them thanh cong");
    }).catch((error) => {
        alert("That bai");
        console.log(error);
    })
}

function LayDL() {
    const dbRef = ref(db);
    get(child(dbRef, 'TestCSDL/')).then((snapshot) => {
        if (snapshot.exists()) {
            hien_ten.innerHTML = snapshot.val().NguoiDung.Ten;
        }
    })
}

nut_dang_nhap.addEventListener('click', () => {
    const dbRef = ref(db);
    get(child(dbRef, ten_dang_nhap.value + '/')).then((snapshot) => {
        if (snapshot.exists()) {
            let kt_mk = snapshot.val().MatKhau.mk;
            if (mat_khau.value == kt_mk) {
                alert("Đăng nhập thành công!");
            }
            else {
                alert("Mật khẩu không hợp lệ!");
            }
        }
        else {
            document.getElementById("xac_nhan_mk").classList.remove("d-none");
            document.getElementById("form_dang_ky").classList.remove("d-none");
            document.getElementById("form_dang_nhap").classList.add("d-none");
        }
    });
});

nut_dang_ky.addEventListener('click', () => {
    let xac_nhan_mk = document.getElementById("mat_khau_xac_nhan");
    if (mat_khau.value == xac_nhan_mk.value) {
        set(ref(db, ten_dang_nhap.value + '/'), {
            MatKhau: { mk: mat_khau.value }
        })
        alert("Đăng ký thành công!");
        document.getElementById("xac_nhan_mk").classList.add("d-none");
        document.getElementById("form_dang_ky").classList.add("d-none");
        document.getElementById("form_dang_nhap").classList.remove("d-none");
        ten_dang_nhap.value = '';
        mat_khau.value = '';
    }
    else {
        alert("Mật khẩu không hợp lệ!");
    }
})