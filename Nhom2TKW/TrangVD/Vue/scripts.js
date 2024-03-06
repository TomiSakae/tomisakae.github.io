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
            vd_dau: false,
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
            }
        }
    }
})

app.mount('#app')