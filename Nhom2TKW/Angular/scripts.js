var app = angular.module("ds_thanh_vien", []);

app.controller("ham_dstv", function ($scope) {
    $scope.ds_tv = false;
    $scope.chan_trang = false;
    $scope.gioi_thieu = false;
    $scope.nut_gioi_thieu = false;
    $scope.tieu_de1 = false;
    $scope.tieu_de2 = false;
    $scope.tieu_de3 = false;
    $scope.tv1 = false;
    $scope.tv2 = false;
    $scope.tv3 = false;
    $scope.tv4 = false;
    $scope.tv5 = false;
    $scope.tv6 = false;
    $scope.tv7 = false;
    $scope.icon1 = true;
    $scope.huy_hieu = true;
    $scope.sl_thanh_vien = 7;
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

    $scope.GioiThieu = function () {
        $scope.gioi_thieu = true;
    }

    $scope.ThanhVien = function () {
        if ($scope.sl_thanh_vien != 0) {
            switch ($scope.sl_thanh_vien) {
                case 7:
                    $scope.tv1 = true;
                    $scope.sl_thanh_vien--;
                    break;
                case 6:
                    $scope.tv2 = true;
                    $scope.sl_thanh_vien--;
                    break;
                case 5:
                    $scope.tv3 = true;
                    $scope.sl_thanh_vien--;
                    break;
                case 4:
                    $scope.tv4 = true;
                    $scope.sl_thanh_vien--;
                    break;
                case 3:
                    $scope.tv5 = true;
                    $scope.sl_thanh_vien--;
                    break;
                case 2:
                    $scope.tv6 = true;
                    $scope.sl_thanh_vien--;
                    break;
                case 1:
                    $scope.tv7 = true;
                    $scope.sl_thanh_vien--;
                    $scope.huy_hieu = false;
                    $scope.icon1 = false;
                    $scope.nut_gioi_thieu = true;
                    break;
            }
        }
    }
});