$(document).ready(function () {
    $("#giao_dien_modal").html(`
    <div class="modal" id="hien_chi_so_thu_thap">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="text-end"><button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="mx-3">
                        <h6 class="text-center">Chỉ số hiện tại:</h6>
                        <div class="my-1">Phòng Thủ: 0</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="hien_vung_ky_nang_thu_thap">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="text-end"><button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <p class="text-center">Không có kỹ năng nào đang kích hoạt</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="hien_vung_tinh_nang">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="text-end"><button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="hien_vung_ky_nang_anh">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="text-end"><button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <p class="text-center">Không có kỹ năng nào đang kích hoạt</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="hien_chi_so_anh">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="text-end"><button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="mx-3">
                        <h6 class="text-center">Chỉ số hiện tại:</h6>
                        <div class="my-1">Sức Tấn Công: 1</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="icon-container d-flex flex-column justify-content-center align-items-center">
        <i class="fa-solid fa-bars my-2" data-bs-toggle="modal" data-bs-target="#hien_chi_so_thu_thap"></i>
        <i class="fa-solid fa-bolt my-2" data-bs-toggle="modal" data-bs-target="#hien_vung_ky_nang_thu_thap"></i>
        <i class="fa-solid fa-star my-2" data-bs-toggle="modal" data-bs-target="#hien_vung_tinh_nang"></i>
        <i class="fa-solid fa-bolt my-2" data-bs-toggle="modal" data-bs-target="#hien_vung_ky_nang_anh"></i>
        <i class="fa-solid fa-bars my-2" data-bs-toggle="modal" data-bs-target="#hien_chi_so_anh"></i>
    </div>

    <div class="modal" id="hien_buff">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="text-end"><button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <p class="text-center">Không có buff nào đang kích hoạt</p>
                </div>
            </div>
        </div>
    </div>

    <div class="modal" id="hien_debuff">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Modal body -->
                <div class="modal-body">
                    <div class="text-end"><button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <p class="text-center">Không có debuff nào đang kích hoạt</p>
                </div>
            </div>
        </div>
    </div>

    <div class="icon-container-buff d-flex flex-column justify-content-center align-items-center">
     <i class="fa-solid fa-circle-down my-2" data-bs-toggle="modal" data-bs-target="#hien_debuff"></i>
        <i class="fa-solid fa-circle-up my-2" data-bs-toggle="modal" data-bs-target="#hien_buff"></i>
    </div>
    `);
});