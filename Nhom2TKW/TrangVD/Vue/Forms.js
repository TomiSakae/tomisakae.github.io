const app = Vue.createApp({
    data() {
        return {
            vd1: true,
            vd2: false,
            vd3: false,
            vd4: false,
            vd5: false,
            vd6: false,
            vd7: false,
            vd8: false,
            vd9: false,
            vd10: false,
            vd11: false,
            vd12: false,
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
                    break
                case 3:
                    this.vd3 = false
                    this.vd4 = true
                    break
                case 4:
                    this.vd4 = false
                    this.vd5 = true
                    break
                case 5:
                    this.vd5 = false
                    this.vd6 = true
                    break
                case 6:
                    this.vd6 = false
                    this.vd7 = true
                    break
                case 7:
                    this.vd7 = false
                    this.vd8 = true
                    break
                case 8:
                    this.vd8 = false
                    this.vd9 = true
                    break
                case 9:
                    this.vd9 = false
                    this.vd10 = true
                    break
                case 10:
                    this.vd10 = false
                    this.vd11 = true
                case 11:
                    this.vd11 = false
                    this.vd12 = true
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
                    break
                case 3:
                    this.vd3 = true
                    this.vd4 = false
                    break
                case 4:
                    this.vd4 = true
                    this.vd5 = false
                    break
                case 5:
                    this.vd5 = true
                    this.vd6 = false
                    break
                case 6:
                    this.vd6 = true
                    this.vd7 = false
                    break
                case 7:
                    this.vd7 = true
                    this.vd8 = false
                    break
                case 8:
                    this.vd8 = true
                    this.vd9 = false
                    break
                case 9:
                    this.vd9 = true
                    this.vd10 = false
                    break
                case 10:
                    this.vd10 = true
                    this.vd11 = false
                    break
                case 11:
                    this.vd11 = true
                    this.vd12 = false
                    this.vd_cuoi = false;
                    this.an_tiep = true;
                    break
            }
        }
    }
})

app.mount('#app')