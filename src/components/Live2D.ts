// utils/live2d.ts

const modelData = {
    models: [
        {
            model: '/live2d/models/abeikelongbi_3_hx/abeikelongbi_3_hx.model3.json',
            modelname: 'HMS Abercrombie (F109)',
            modelid: '1'
        },
        {
            model: '/live2d/models/adaerbote_2/adaerbote_2.model3.json',
            modelname: 'KMS Prinz Adalbert',
            modelid: '2'
        },
        {
            model: '/live2d/models/aerbien_3/aerbien_3.model3.json',
            modelname: 'Albion',
            modelid: '3'
        },
        {
            model: '/live2d/models/aersasi_2/aersasi_2.model3.json',
            modelname: 'Essex',
            modelid: '4'
        },
        {
            model: '/live2d/models/abeikelongbi_3_hx/abeikelongbi_3_hx.model3.json',
            modelname: 'HMS Abercrombie (F109)',
            modelid: '5'
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
            setY = -89;
            setX = -200;
            setScale = 0.1;
            break;
        case 3:
            setY = -113;
            setX = -233;
            setScale = 0.1;
            break;
        case 4:
            setY = -145;
            setX = -264;
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
