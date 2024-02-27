const app = Vue.createApp({
    template:
        `
        <div class="modal fade" id="diem_danh">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Điểm danh</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <p v-html="qua_diem_danh"></p>
                    <button v-show="nut_diem_danh" type="button" class="btn btn-outline-success"
                        v-on:click="DiemDanh">Nhận</button>
                </div>
            </div>
        </div>
    </div>

    <div class="offcanvas offcanvas-end" id="thong_tin_nhan_vat">
        <div class="offcanvas-header">
            <h2 class="offcanvas-title">{{ten_nhan_vat}}</h2>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
            <div class="list-group pb-3">
                <a href="#" class="list-group-item list-group-item-action">Thông tin nhân vật</a>
                <a href="#" class="list-group-item list-group-item-action">Nhiệm vụ</a>
                <a href="#" class="list-group-item list-group-item-action">Túi đồ</a>
                <a href="#" class="list-group-item list-group-item-action">Chế tạo</a>
                <a href="#" class="list-group-item list-group-item-action">Trang bị</a>
                <a href="#" class="list-group-item list-group-item-action">Cường hóa</a>
                <a href="#" class="list-group-item list-group-item-action">Thành tựu</a>
                <a href="#" class="list-group-item list-group-item-action">Điểm danh hằng ngày</a>
                <a href="#" class="list-group-item list-group-item-action">Điểm danh 7 ngày!</a>
                <a href="#" class="list-group-item list-group-item-action">Hòm thư</a>
                <a href="#" class="list-group-item list-group-item-action">Mã thưởng</a>
                <a href="#" class="list-group-item list-group-item-action">Nhật ký cập nhật</a>
            </div>
            <button type="button" class="btn btn-danger" onclick="XoaDuLieu()">Xóa dữ liệu!</button>
        </div>
    </div>

    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
        <div class="container-fluid">
            <div class="d-flex align-items-center">
                <ul class="nav nav-pills">
                    <li class="nav-item pe-3 py-1">
                        <a v-bind:class="{ 'active': phien_hoat_dong == 1 }" class="nav-link border border-primary" href="#">Isekai Quest</a>
                    </li>
                </ul>
            </div>

            <ul class="navbar-nav">
                <li class="nav-item py-1">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </li>
            </ul>
            <div class="collapse navbar-collapse" id="menu">
                <div class="d-flex align-items-center">
                    <ul class="nav nav-pills">
                        <li class="nav-item pe-3 py-1">
                            <a v-bind:class="{ 'active': phien_hoat_dong == 2 }" class="nav-link border border-primary" href="#">Gacha</a>
                        </li>
                        <li class="nav-item pe-3 py-1">
                            <a v-bind:class="{ 'active': phien_hoat_dong == 3 }" class="nav-link border border-primary" href="#">Cửa hàng</a>
                        </li>
                        <li class="nav-item pe-3 py-1">
                            <a v-bind:class="{ 'active': phien_hoat_dong == 4 }" class="nav-link border border-primary" href="#">Sự kiện</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="d-flex align-items-center">
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="#" data-bs-toggle="modal"
                            data-bs-target="#diem_danh" v-on:click="KiemTraDiemDanh">{{ngay_thang_nam}}</a>
                    </li>
                </ul>

                <button type="button" class="btn btn-dark" data-bs-toggle="offcanvas"
                    data-bs-target="#thong_tin_nhan_vat">
                    <i class="fa-solid fa-user"></i>
                </button>

                <button type="button" class="btn btn-dark" v-on:click="CheDoToi">
                    <i class="fa-solid fa-circle-half-stroke"></i>
                </button>
            </div>
        </div>
    </nav>
    `,
    data() {
        return {
            phien_hoat_dong: phien_hoat_dong_div,
            ten_nhan_vat: localStorage.getItem("ten_nv"),
            ngay_thang_nam: "Ngày " + ngay + " Tháng " + thang + " Năm " + nam,
            qua_diem_danh: `Phần quà điểm danh là <strong>100 xu</strong>`,
            nut_diem_danh: true
        }
    },
    methods: {
        DiemDanh() {
            localStorage.setItem("ngay", ngay)
            this.qua_diem_danh = "Bạn đã nhận được quà điểm danh."
            this.nut_diem_danh = false
        },
        KiemTraDiemDanh() {
            if (localStorage.getItem("ngay") == ngay) {
                this.qua_diem_danh = "Bạn đã nhận được quà điểm danh."
                this.nut_diem_danh = false
            }
        },
        CheDoToi() {
            if (giao_dien_web == null || giao_dien_web == "sang") {
                document.querySelector('html').setAttribute('data-bs-theme', 'dark')
                localStorage.setItem("giao_dien", "toi")
                giao_dien_web = "toi"
            } else {
                document.querySelector('html').removeAttribute('data-bs-theme', 'dark')
                localStorage.setItem("giao_dien", "sang")
                giao_dien_web = "sang"
            }
        }
    }
})

app.mount('#thanh_tien_trinh')