let kt_email_dk = false;
let kt_mat_khau_dk = false;
let kt_ten_nguoi_dung_dk = false;
let kt_mat_khau_dn = false;
let kt_email_dn = false;

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

$(function () {
    $('[id^="email_"]').on("input", function () {
        // Lấy giá trị của thuộc tính ID
        let id = $(this).attr('id');
        // Trích xuất phần sau tiền tố "email_"
        let suffix = id.split('email_')[1];
        let email = $(this).val();
        let dinh_dang_email = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

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
});

function DangKy() {
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

    if (kt_email_dk == true && kt_mat_khau_dk == true && kt_ten_nguoi_dung_dk == true) {
        auth.createUserWithEmailAndPassword($("#email_dk").val(), $("#mat_khau_dk").val())
            .then(function (userCredential) {
                let user = userCredential.user;

                // Add user info to Firestore
                return db.collection('users').doc(user.uid).set({
                    username: $("#ten_nguoi_dung_dk").val(),
                    email: $("#email_dk").val(),
                    created_at: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(function () {
                console.log('User registered and data saved to Firestore');
            })
            .catch(function (error) {
                console.error('Error registering user:', error.message);
            });
    }
}

function DangNhap() {
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
        auth.signInWithEmailAndPassword($("#email_dn").val(), $("#mat_khau_dn").val())
            .then(function (userCredential) {
                console.log('User logged in');
            })
            .catch(function (error) {
                console.error('Error logging in user:', error.message);
            });
    }
}