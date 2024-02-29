const app = Vue.createApp({
    data() {
        return {
            ti_le_trai_cay: phan_tram_tim_thay,
            so_luong_trai_cay: 0,
            gio_hien_tai: gio_trai_cay + ":" + phut_trai_cay_hien_thi,
            canh_bao: ``
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