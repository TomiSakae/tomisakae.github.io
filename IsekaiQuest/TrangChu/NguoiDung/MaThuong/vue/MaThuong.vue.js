const app = Vue.createApp({
    data() {
        return {
            ma_thuong: "",
            thong_bao: ""
        }
    },
    methods: {
        DoiMa() {
            if (this.ma_thuong != "") {
                LayMa(this.ma_thuong)
                this.thong_bao = thong_bao_ma_thuong
            }
        }
    }
})

app.mount('#app')