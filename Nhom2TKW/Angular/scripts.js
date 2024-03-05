var app = angular.module("ds_thanh_vien", []);

app.controller("ham_dstv", function ($scope) {
    $scope.ds_tv = false;
    $scope.chan_trang = false;
    $scope.tieu_de1 = false;
    $scope.tieu_de2 = false;
    $scope.tieu_de3 = false;
    // Đăng ký hàm DanhSachThanhVien với sự kiện window.onload
    window.onload = function () {
        $scope.ThoiGianHienThi();
        $scope.$apply(); // Cần gọi $apply() để áp dụng các thay đổi vào scope
    };

    $scope.ThoiGianHienThi = function () {
        $scope.tieu_de1 = true;
        setTimeout(function () {
            $scope.$apply(function () {
                // Code bạn muốn thực thi sau khoảng thời gian
                $scope.tieu_de2 = true;
                setTimeout(function () {
                    $scope.$apply(function () {
                        // Code bạn muốn thực thi sau khoảng thời gian
                        $scope.tieu_de3 = true;
                    });
                }, 900);
            });
        }, 600);

    }

    $scope.DanhSachThanhVien = function () {
        $scope.ds_tv = true;
        $scope.chan_trang = true;
    }
});