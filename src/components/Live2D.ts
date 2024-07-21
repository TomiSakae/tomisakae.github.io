// utils/live2d.ts

const modelData = {
    models: [
        {
            model: '/live2d/models/abeikelongbi_3_hx/abeikelongbi_3_hx.model3.json',
            modelname: 'HMS Abercrombie (F109)',
            modelid: '1',
            name: 'HMS Abercrombie (F109) HX'
        },
        {
            model: '/live2d/models/abeikelongbi_3/abeikelongbi_3.model3.json',
            modelname: 'HMS Abercrombie (F109)',
            modelid: '2',
            name: 'HMS Abercrombie (F109)'
        },
        {
            model: '/live2d/models/adaerbote_2/adaerbote_2.model3.json',
            modelname: 'KMS Prinz Adalbert',
            modelid: '3',
            name: 'KMS Prinz Adalbert'
        },
        {
            model: '/live2d/models/aerbien_3/aerbien_3.model3.json',
            modelname: 'Albion',
            modelid: '4',
            name: 'Albion'
        },
        {
            model: '/live2d/models/aersasi_2/aersasi_2.model3.json',
            modelname: 'Essex',
            modelid: '5',
            name: 'Essex'
        },
        {
            model: '/live2d/models/aierdeliqi_4/aierdeliqi_4.model3.json',
            modelname: 'Aierdeliqi',
            modelid: '6',
            name: 'Aierdeliqi 1'
        },
        {
            model: '/live2d/models/aierdeliqi_5/aierdeliqi_5.model3.json',
            modelname: 'Aierdeliqi',
            modelid: '7',
            name: 'Aierdeliqi 2'
        },
        {
            model: '/live2d/models/aijier_2/aijier_2.model3.json',
            modelname: 'Aijier',
            modelid: '8',
            name: 'Aijier 1'
        },
        {
            model: '/live2d/models/aijier_3/aijier_3.model3.json',
            modelname: 'Aijier',
            modelid: '9',
            name: 'Aijier 2'
        },
        {
            model: '/live2d/models/aijier_3_hx/aijier_3_hx.model3.json',
            modelname: 'Aijier',
            modelid: '10',
            name: 'Aijier 2 HX'
        },
        {
            model: '/live2d/models/ailunsamuna_2/ailunsamuna_2.model3.json',
            modelname: 'Ailunsamuna',
            modelid: '11',
            name: 'Ailunsamuna'
        },
        {
            model: '/live2d/models/aimierbeierding_2/aimierbeierding_2.model3.json',
            modelname: 'Aimierbeierding',
            modelid: '12',
            name: 'Aimierbeierding'
        },
        {
            model: '/live2d/models/aimudeng_2/aimudeng_2.model3.json',
            modelname: 'Aimudeng',
            modelid: '13',
            name: 'Aimudeng'
        },
        {
            model: '/live2d/models/aimudeng_2_hx/aimudeng_2_hx.model3.json',
            modelname: 'Aimudeng',
            modelid: '14',
            name: 'Aimudeng HX'
        },
        {
            model: '/live2d/models/aisaikesi_4/aisaikesi_4.model3.json',
            modelname: 'Aisaikesi',
            modelid: '15',
            name: 'Aisaikesi'
        },
        {
            model: '/live2d/models/ankeleiqi_2/ankeleiqi_2.model3.json',
            modelname: 'Ankeleiqi',
            modelid: '16',
            name: 'Ankeleiqi 1'
        },
        {
            model: '/live2d/models/ankeleiqi_2_hx/ankeleiqi_2_hx.model3.json',
            modelname: 'Ankeleiqi',
            modelid: '17',
            name: 'Ankeleiqi 1 HX'
        },
        {
            model: '/live2d/models/ankeleiqi_3/ankeleiqi_3.model3.json',
            modelname: 'Ankeleiqi',
            modelid: '18',
            name: 'Ankeleiqi 2'
        },
        {
            model: '/live2d/models/baerdimo_5/baerdimo_5.model3.json',
            modelname: 'Baerdimo',
            modelid: '19',
            name: 'Baerdimo 1'
        },
        {
            model: '/live2d/models/baerdimo_6/baerdimo_6.model3.json',
            modelname: 'Baerdimo',
            modelid: '20',
            name: 'Baerdimo 2'
        },
        {
            model: '/live2d/models/bailong_3/bailong_3.model3.json',
            modelname: 'Bailong',
            modelid: '21',
            name: 'Bailong'
        },
        {
            model: '/live2d/models/banrenma_2/banrenma_2.model3.json',
            modelname: 'Banrenma',
            modelid: '22',
            name: 'Banrenma'
        },
        {
            model: '/live2d/models/beikaluolaina_2/beikaluolaina_2.model3.json',
            modelname: 'Beikaluolaina',
            modelid: '23',
            name: 'Beikaluolaina'
        },
        {
            model: '/live2d/models/biaoqiang_3/biaoqiang_3.model3.json',
            modelname: 'Biaoqiang',
            modelid: '24',
            name: 'Biaoqiang'
        },
        {
            model: '/live2d/models/bisimai_2/bisimai_2.model3.json',
            modelname: 'Bisimai',
            modelid: '25',
            name: 'Bisimai'
        },
        {
            model: '/live2d/models/bisimai_2_hx/bisimai_2_hx.model3.json',
            modelname: 'Bisimai',
            modelid: '26',
            name: 'Bisimai HX'
        },
        {
            model: '/live2d/models/bola_2/bola_2.model3.json',
            modelname: 'Bola',
            modelid: '27',
            name: 'Bola'
        },
        {
            model: '/live2d/models/boyixi_2/boyixi_2.model3.json',
            modelname: 'Boyixi',
            modelid: '28',
            name: 'Boyixi'
        },
        {
            model: '/live2d/models/bulaimodun_2/bulaimodun_2.model3.json',
            modelname: 'Bulaimodun',
            modelid: '29',
            name: 'Bulaimodun 1'
        },
        {
            model: '/live2d/models/bulaimodun_4/bulaimodun_4.model3.json',
            modelname: 'Bulaimodun',
            modelid: '30',
            name: 'Bulaimodun 2'
        },
        {
            model: '/live2d/models/bulaimodun_4_hx/bulaimodun_4_hx.model3.json',
            modelname: 'Bulaimodun',
            modelid: '31',
            name: 'Bulaimodun 2 HX'
        }
    ]
};

export default modelData;

type Live2dResult = {
    setX: number;
    setY: number;
    setScale: number;
};

export function Live2d(id: number): Live2dResult {
    let setY: number;
    let setX: number;
    let setScale: number;

    switch (id) {
        case 1:
            setY = 28;
            setX = -125;
            setScale = 0.1;
            break;
        case 2:
            setY = 28;
            setX = -125;
            setScale = 0.1;
            break;
        case 3:
            setY = -89;
            setX = -200;
            setScale = 0.1;
            break;
        case 4:
            setY = -113;
            setX = -233;
            setScale = 0.1;
            break;
        case 5:
            setY = -145;
            setX = -264;
            setScale = 0.1;
            break;
        case 6:
            setY = 83;
            setX = -90;
            setScale = 0.1;
            break;
        case 7:
            setY = 35;
            setX = -170;
            setScale = 0.1;
            break;
        case 8:
            setY = -50;
            setX = -162;
            setScale = 0.1;
            break;
        case 9:
            setY = -193;
            setX = -293;
            setScale = 0.1;
            break;
        case 10:
            setY = -193;
            setX = -293;
            setScale = 0.1;
            break;
        case 11:
            setY = 23;
            setX = -177;
            setScale = 0.1;
            break;
        case 12:
            setY = 105;
            setX = -9;
            setScale = 0.13;
            break;
        case 13:
            setY = -197;
            setX = -275;
            setScale = 0.15;
            break;
        case 14:
            setY = -197;
            setX = -275;
            setScale = 0.15;
            break;
        case 15:
            setY = -146;
            setX = -236;
            setScale = 0.1;
            break;
        case 16:
            setY = -7;
            setX = -288;
            setScale = 0.1;
            break;
        case 17:
            setY = -7;
            setX = -288;
            setScale = 0.1;
            break;
        case 18:
            setY = -246;
            setX = -295;
            setScale = 0.1;
            break;
        case 19:
            setY = -11;
            setX = -155;
            setScale = 0.1;
            break;
        case 20:
            setY = -81;
            setX = -239;
            setScale = 0.1;
            break;
        case 21:
            setY = -95;
            setX = -179;
            setScale = 0.1;
            break;
        case 22:
            setY = -3;
            setX = -124;
            setScale = 0.17;
            break;
        case 23:
            setY = -94;
            setX = -273;
            setScale = 0.1;
            break;
        case 24:
            setY = -39;
            setX = -181;
            setScale = 0.1;
            break;
        case 25:
            setY = -80;
            setX = -209;
            setScale = 0.1;
            break;
        case 26:
            setY = -80;
            setX = -209;
            setScale = 0.1;
            break;
        case 27:
            setY = -96;
            setX = -268;
            setScale = 0.1;
            break;
        case 28:
            setY = -104;
            setX = -220;
            setScale = 0.1;
            break;
        case 29:
            setY = 11;
            setX = -203;
            setScale = 0.1;
            break;
        case 30:
            setY = -94;
            setX = -154;
            setScale = 0.1;
            break;
        case 31:
            setY = -94;
            setX = -154;
            setScale = 0.1;
            break;
        default:
            setY = 0.09;
            setX = -125;
            setScale = 0.1;
            break;
    }

    return { setX, setY, setScale };
}
