const app = Vue.createApp({
    data() {
        return {
            du_lieu_tui_do: ``,
            tui: true
        }
    },
    methods: {
        MoTui() {
            MoTuiDo()
            this.du_lieu_tui_do = du_lieu_trang_tui_do
            this.tui = false
        }
    }
})

app.mount('#app')