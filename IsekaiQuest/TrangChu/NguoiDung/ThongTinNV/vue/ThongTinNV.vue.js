const app = Vue.createApp({
    data() {
        return {
            ten_nv: localStorage.getItem("ten_nv"),
            mau_nv: localStorage.getItem("mau_nv"),
            doi_nv: localStorage.getItem("doi_nv"),
            khat_nv: localStorage.getItem("khat_nv"),
            the_luc_nv: localStorage.getItem("the_luc_nv")
        }
    },
    methods: {

    }
})

app.mount('#app')