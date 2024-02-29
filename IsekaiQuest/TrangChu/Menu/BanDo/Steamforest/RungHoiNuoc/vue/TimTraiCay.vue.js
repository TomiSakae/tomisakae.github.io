const app = Vue.createApp({
    data() {
        return {
            ti_le_trai_cay: phan_tram_tim_thay,
            so_luong_trai_cay: 0,
            gio_hien_tai: gio_trai_cay + ":" + phut_trai_cay_hien_thi,
            canh_bao: ``,
            hop_canh_bao: `
            <div class="modal" id="hop_canh_bao">
                <div class="modal-dialog">
                    <div class="modal-content">

                    <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Isekai Quest</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                    <!-- Modal body -->
                        <div class="modal-body">
                            <p>Bạn quá mệt để thực hiện hành động này!</p>
                            <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
    },
    methods: {
        TimTraiCay() {
            KiemTraTraiCay()
            this.so_luong_trai_cay = sl_trai_cay_tim_thay
            this.ti_le_trai_cay = phan_tram_tim_thay
            this.gio_hien_tai = gio_trai_cay + ":" + phut_trai_cay_hien_thi
            this.canh_bao = canh_bao_nguoi_choi
        }
    }
})

app.mount('#app')