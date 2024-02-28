const app = Vue.createApp({
    data() {
        return {
            ma_thuong: ""
        }
    },
    methods: {
        DoiMa() {
            if (this.ma_thuong != "") {
                LayMa(this.ma_thuong)
            }
        }
    }
})

app.mount('#app')