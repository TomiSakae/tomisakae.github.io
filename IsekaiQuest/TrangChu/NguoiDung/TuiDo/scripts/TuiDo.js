
let du_lieu_trang_tui_do = ``;
function MoTuiDo() {
    let dem = 1;
    for (let vp_tui_do of nhap_tui_do) {
        if (vp_tui_do.so_luong > 0) {
            du_lieu_trang_tui_do += `
                <div id="div`+ vp_tui_do.id + `" class="row pt-2">
                    <div class="card">
                        <div class="card-body">
                            <button type="button" class="btn">
                                <h4 id="`+ vp_tui_do.id + `" class="card-title" data-bs-toggle="collapse" data-bs-target="#td` + dem + `">` + vp_tui_do.ten + `: ` + vp_tui_do.so_luong + `
                                </h4>
                            </button>
                            <div id="td`+ dem + `" class="collapse">
                                <button id="nut_an" type="button" class="btn btn-outline-primary" data-bs-toggle=""
                                data-bs-target="" onclick="AnDoAn(`+ vp_tui_do.id + `)">Ăn</button>
                            </div >
                        </div >
                    </div >
                </div >
                `;
            dem++;
        }
    }
}


