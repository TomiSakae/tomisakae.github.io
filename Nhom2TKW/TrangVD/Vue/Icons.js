const app = Vue.createApp({
    data() {
        return {
            vd1: true,
            vd2: false,
            vd3: false,
            vd_dau: false,
            an_tiep: true,
            vd_cuoi: false,
            dem: 1
        }
    },
    methods: {
        ViDuKe() {
            switch (this.dem) {
                case 1:
                    this.vd1 = false
                    this.vd2 = true
                    this.vd_dau = true
                    break
                case 2:
                    this.vd2 = false
                    this.vd3 = true
                    this.vd_cuoi = true;
                    this.an_tiep = false;
                    break
            }
            this.dem++
        },
        ViDuTruoc() {
            this.dem--
            switch (this.dem) {
                case 1:
                    this.vd1 = true
                    this.vd2 = false
                    this.vd_dau = false
                    break
                case 2:
                    this.vd2 = true
                    this.vd3 = false
                    this.vd_cuoi = false;
                    this.an_tiep = true;
                    break
            }
        }
    }
})

app.mount('#app')