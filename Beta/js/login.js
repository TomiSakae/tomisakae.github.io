let kt_email_dk = false;
let kt_mat_khau_dk = false;
let kt_mat_khau_xn_dk = false;
let kt_ten_nguoi_dung_dk = false;
let kt_mat_khau_dn = false;
let kt_email_dn = false;
let dl_nguoi_dung = null;

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyCiFEJKubhDIZFdyB3yrPON0tLN0K4kWy4", authDomain: "tomisakae-c078f.firebaseapp.com", projectId: "tomisakae-c078f", storageBucket: "tomisakae-c078f.appspot.com", messagingSenderId: "1082522587085", appId: "1:1082522587085:web:29731e199f944171f8fe84", measurementId: "G-L8BP0T7QVF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const auth = firebase.auth();

let anh_dai_dien = "";
$('#tim_anh').click(function () {
    $('#anh_anime').html("");
    let characterName = $('#anh_dai_dien').val().trim();
    if (characterName) {
        // Tìm kiếm nhân vật theo tên
        $.get(`https://api.jikan.moe/v4/characters?q=${characterName}`, function (searchData) {
            if (searchData.data && searchData.data.length > 0) {
                let characterId = searchData.data[0].mal_id;

                // Lấy chi tiết nhân vật bằng ID
                $.get(`https://api.jikan.moe/v4/characters/${characterId}`, function (characterData) {
                    if (characterData.data && characterData.data.images && characterData.data.images.jpg) {
                        anh_dai_dien = characterData.data.images.jpg.image_url;
                        $('#anh_anime').html(`<img src="${anh_dai_dien}" class="w-25 h-auto mt-2" alt="${characterName}">
                            <button id="chon_anh" type="button" class="btn btn-primary mt-2">Chọn</button>
                            `);
                        $('#chon_anh').click(function () {
                            $("#chon_anh_dai_dien").addClass("d-none");
                            $("#anh_da_chon").removeClass("d-none");
                            $("#anh_da_chon").attr("src", anh_dai_dien);
                        });
                    } else {
                        $('#anh_anime').text("Hình ảnh không tồn tại!");
                    }
                });
            } else {
                $('#anh_anime').text("Không tìm thấy nhân vật!");
            }
        });
    }
});

$(function () {
    $('[id^="email_"]').on("input", function () {
        // Lấy giá trị của thuộc tính ID
        let id = $(this).attr('id');
        // Trích xuất phần sau tiền tố "email_"
        let suffix = id.split('email_')[1];
        let email = $(this).val();
        let dinh_dang_email = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

        $("#kt_tai_khoan_dn").addClass("d-none");
        $("#kt_tai_khoan_dk").addClass("d-none");

        if (dinh_dang_email.test(email)) {
            $("#kt_email_" + suffix).addClass("d-none");
            $(this).addClass("border-success");
            $(this).removeClass("border-danger");
            if (suffix == "dk") {
                kt_email_dk = true;
            }
            else {
                kt_email_dn = true;
            }
        } else {
            $("#kt_email_" + suffix).removeClass("d-none");
            $(this).addClass("border-danger");
            $(this).removeClass("border-success");
            if (suffix == "dk") {
                kt_email_dk = false;
            }
            else {
                kt_email_dn = false;
            }
        }
    });

    $('[id^="mat_khau_"]').on("input", function () {
        // Lấy giá trị của thuộc tính ID
        let id = $(this).attr('id');
        // Trích xuất phần sau tiền tố "mat_khau_"
        let suffix = id.split('mat_khau_')[1];
        let mat_khau = $(this).val();

        $("#kt_tai_khoan_dn").addClass("d-none");

        if (mat_khau.length >= 6) {
            $("#kt_mat_khau_" + suffix).addClass("d-none");
            $(this).addClass("border-success");
            $(this).removeClass("border-danger");
            if (suffix == "dk") {
                kt_mat_khau_dk = true;
            }
            else {
                kt_mat_khau_dn = true;
            }
        } else {
            $("#kt_mat_khau_" + suffix).removeClass("d-none");
            $(this).addClass("border-danger");
            $(this).removeClass("border-success");
            if (suffix == "dk") {
                kt_mat_khau_dk = false;
            }
            else {
                kt_mat_khau_dn = false;
            }
        }
    });

    $("#ten_nguoi_dung_dk").on("input", function () {
        if ($(this).val().length >= 1) {
            $("#kt_ten_nguoi_dung_dk").addClass("d-none");
            $(this).addClass("border-success");
            $(this).removeClass("border-danger");
            kt_ten_nguoi_dung_dk = true;
        }
        else {
            $("#kt_ten_nguoi_dung_dk").removeClass("d-none");
            $(this).addClass("border-danger");
            $(this).removeClass("border-success");
            kt_ten_nguoi_dung_dk = false;
        }
    });

    $("#mat_khau_xn_dk").on("input", function () {
        if ($(this).val() == $("#mat_khau_dk").val()) {
            $("#kt_mat_khau_xn_dk").addClass("d-none");
            $(this).addClass("border-success");
            $(this).removeClass("border-danger");
            kt_mat_khau_xn_dk = true;
        }
        else {
            $("#kt_mat_khau_xn_dk").removeClass("d-none");
            $(this).addClass("border-danger");
            $(this).removeClass("border-success");
            kt_mat_khau_xn_dk = false;
        }
    });
});

async function DangKy() {
    if ($("#ten_nguoi_dung_dk").val().length >= 1) {
        $("#kt_ten_nguoi_dung_dk").addClass("d-none");
        $("#ten_nguoi_dung_dk").addClass("border-success");
        $("#ten_nguoi_dung_dk").removeClass("border-danger");
        kt_ten_nguoi_dung_dk = true;
    }
    else {
        $("#kt_ten_nguoi_dung_dk").removeClass("d-none");
        $("#ten_nguoi_dung_dk").addClass("border-danger");
        $("#ten_nguoi_dung_dk").removeClass("border-success");
        kt_ten_nguoi_dung_dk = false;
    }

    if ($("#email_dk").val().length == 0) {
        $("#kt_email_dk").removeClass("d-none");
        $("#email_dk").addClass("border-danger");
        $("#email_dk").removeClass("border-success");
        kt_email_dk = false;
    }

    if ($("#mat_khau_dk").val().length == 0) {
        $("#kt_mat_khau_dk").removeClass("d-none");
        $("#mat_khau_dk").addClass("border-danger");
        $("#mat_khau_dk").removeClass("border-success");
        kt_mat_khau_dk = false;
    }

    if ($("#mat_khau_xn_dk").val() != $("#mat_khau_dk").val() || $("#mat_khau_xn_dk").val().length == 0) {
        $("#kt_mat_khau_xn_dk").removeClass("d-none");
        $("#mat_khau_xn_dk").addClass("border-danger");
        $("#mat_khau_xn_dk").removeClass("border-success");
        kt_mat_khau_xn_dk = false;
    }

    if (kt_email_dk == true && kt_mat_khau_dk == true && kt_ten_nguoi_dung_dk == true && kt_mat_khau_xn_dk == true) {

        $("#dang_ky").modal("hide");
        $("#dk_thanh_cong").modal("show");
        $(".ten_nguoi_dung").text($("#ten_nguoi_dung_dk").val());

        // Add user info to Firestore
        $("#nut_dk").click(async function () {
            try {
                showLoadingOverlay();
                let userCredential = await auth.createUserWithEmailAndPassword($("#email_dk").val(), $("#mat_khau_dk").val());
                let user = userCredential.user;
                if (anh_dai_dien == "") {
                    anh_dai_dien = "img/khong_co_anh.gif";
                }
                await db.collection('users').doc(user.uid).set({
                    ten_nguoi_dung: $("#ten_nguoi_dung_dk").val(),
                    email: $("#email_dk").val(),
                    anh_dai_dien: anh_dai_dien,
                    ngay_tao: firebase.firestore.FieldValue.serverTimestamp()
                });
                $("#dk_thanh_cong").modal("hide");
            } catch (error) {
                $("#kt_tai_khoan_dk").removeClass("d-none");
                $("#email_dk").addClass("border-danger");
                $("#email_dk").removeClass("border-success");
            } finally {
                hideLoadingOverlay(); // Ẩn overlay sau khi hoàn thành quá trình đăng ký
            }
        });
    }
}


async function DangNhap() {
    let kt_email_dn = true;
    let kt_mat_khau_dn = true;

    if ($("#email_dn").val().length == 0) {
        $("#kt_email_dn").removeClass("d-none");
        $("#email_dn").addClass("border-danger");
        $("#email_dn").removeClass("border-success");
        kt_email_dn = false;
    }

    if ($("#mat_khau_dn").val().length == 0) {
        $("#kt_mat_khau_dn").removeClass("d-none");
        $("#mat_khau_dn").addClass("border-danger");
        $("#mat_khau_dn").removeClass("border-success");
        kt_mat_khau_dn = false;
    }

    if (kt_email_dn == true && kt_mat_khau_dn == true) {
        try {
            showLoadingOverlay();
            let userCredential = await auth.signInWithEmailAndPassword($("#email_dn").val(), $("#mat_khau_dn").val());
            await TaiDLNguoiDung();
            $("#dang_nhap").modal("hide");
            $("#dn_thanh_cong").modal("show");
            $(".ten_nguoi_dung").text(dl_nguoi_dung.ten_nguoi_dung);
            $("#anh_dai_dien_dn").attr("src", dl_nguoi_dung.anh_dai_dien);
        } catch (error) {
            $("#kt_tai_khoan_dn").removeClass("d-none");
            $("#email_dn").addClass("border-danger");
            $("#email_dn").removeClass("border-success");
            $("#mat_khau_dn").addClass("border-danger");
            $("#mat_khau_dn").removeClass("border-success");
        } finally {
            hideLoadingOverlay(); // Ẩn overlay sau khi hoàn thành quá trình đăng ký
        }
    }
}

// Example usage after registration or login
auth.onAuthStateChanged(async function (user) {
    if (user) {
        showLoadingOverlay();
        await TaiDLNguoiDung();
        TaiKhoanDaDN();
    } else {
        console.log('Không có người dùng đăng nhập');
        hideLoadingOverlay();
        TaiKhoanChuaDN();
    }
});

// Load user profile
async function TaiDLNguoiDung() {
    let user = auth.currentUser;
    if (user) {
        try {
            let doc = await db.collection('users').doc(user.uid).get();
            if (doc.exists) {
                dl_nguoi_dung = doc.data();
                // Cập nhật HTML sau khi tải dữ liệu xong

            } else {
                console.log('Không tìm thấy dữ liệu người dùng');
            }
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu người dùng:', error);
        } finally {
            hideLoadingOverlay(); // Ẩn overlay sau khi tải dữ liệu xong
        }
    }
}


function TaiKhoanDaDN() {
    let width = $(window).width();

    if (width <= 768) {
        $("#thu_thach").html(`
            <a href="ThuThach/mobile.html" class="btn btn-light nut-choi-mobile rounded mt-3">Thử Thách</a>
        `);
        $("#nguoi_dung").html(`
            <img src="`+ dl_nguoi_dung.anh_dai_dien + `" class="w-25 h-auto mt-2">
            <p class="mt-3">`+ dl_nguoi_dung.ten_nguoi_dung + `</p>
        `);
        $("#chinh_choi_ngay").removeClass("mb-4").addClass("mb-2");
    }

    if (width > 768) {
        $("#thu_thach").html(`
            <a href="ThuThach/pc.html" class="btn btn-outline-primary nut-choi-pc rounded mt-3">Thử Thách</a>
        `);
        $("#nguoi_dung").html(`
            <img id="cai_dat" src="`+ dl_nguoi_dung.anh_dai_dien + `" class="w-50 h-auto mt-2">
            <p class="mt-3">`+ dl_nguoi_dung.ten_nguoi_dung + `</p>
        `);
        $("#cai_dat").click(function () {
            $("#giao_dien_cai_dat").modal("show");
        });
    }
}

function TaiKhoanChuaDN() {
    let width = $(window).width();

    if (width <= 768) {
        $("#thu_thach").html(`
            <button type="button" class="btn btn-light nut-choi-mobile rounded mt-3" data-bs-toggle="modal"
                    data-bs-target="#kt_tai_khoan">Thử Thách</button>
        `);
        $("#nguoi_dung").html(`
            <button type="button" class="btn btn-primary nut-dang-nhap-dang-ky-mobile rounded mb-3"
                    data-bs-toggle="modal" data-bs-target="#dang_nhap">Đăng
                    Nhập</button>
                <button type="button" class="btn btn-primary nut-dang-nhap-dang-ky-mobile rounded mb-3"
                    data-bs-toggle="modal" data-bs-target="#dang_ky">Đăng Ký</button>
       `);
    }

    if (width > 768) {
        $("#thu_thach").html(`
            <button type="button" class="btn btn-outline-primary nut-choi-pc rounded mt-3"
                            data-bs-toggle="modal" data-bs-target="#kt_tai_khoan">Thử Thách</button>
        `);
        $("#nguoi_dung").html(`
            <button type="button" class="btn btn-primary nut-dang-nhap-dang-ky-pc rounded mb-3"
                               data-bs-toggle="modal" data-bs-target="#dang_nhap">Đăng
                               Nhập</button>
                           <button type="button" class="btn btn-primary nut-dang-nhap-dang-ky-pc rounded mb-3"
                               data-bs-toggle="modal" data-bs-target="#dang_ky">Đăng Ký</button>
       `);
    }
}

function showLoadingOverlay() {
    document.getElementById('loading-overlay').style.display = 'flex';
}

// Hide loading overlay
function hideLoadingOverlay() {
    document.getElementById('loading-overlay').style.display = 'none';
}