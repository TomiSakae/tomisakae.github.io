const app = Vue.createApp({
    data() {
        return {
            dem: 0,
            ten_nhan_vat: ""
        }
    },
    methods: {
        TiepTuc() {
            this.dem++
            if (this.dem != 0 && this.ten_nhan_vat != "") {
                localStorage.setItem("ten_nv", this.ten_nhan_vat)
                window.location.replace("TrangChu/TrangChu.html")
            }
        }
    }
})

app.mount('#app')