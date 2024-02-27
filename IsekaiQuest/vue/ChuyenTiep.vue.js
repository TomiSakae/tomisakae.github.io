const app = Vue.createApp({
    data() {
        return {
            dem: 0,
            ten_nhan_vat: "",
            gioi_thieu: 0
        }
    },
    methods: {
        TiepTuc() {
            this.dem++
            if (this.dem != 0 && this.ten_nhan_vat != "") {
                localStorage.setItem("ten_nv", this.ten_nhan_vat)
                this.gioi_thieu++
            }
        },
        ChonNoiBatDau() {
            localStorage.setItem("noi_bt", 1)
            window.location.replace("TrangChu/Steamforest.html")
        }
    }
})

app.mount('#app')