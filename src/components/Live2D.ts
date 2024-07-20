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
        default:
            setY = 0.09;
            setX = -125;
            setScale = 0.1;
            break;
    }

    return { setX, setY, setScale };
}
