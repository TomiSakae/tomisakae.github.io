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
        },
        {
            model: '/live2d/models/bulaimodun_5/bulaimodun_5.model3.json',
            modelname: 'Bulaimodun',
            modelid: '32',
            name: 'Bulaimodun 3'
        },
        {
            model: '/live2d/models/buleisite_2/buleisite_2.model3.json',
            modelname: 'Buleisite',
            modelid: '33',
            name: 'Buleisite'
        },
        {
            model: '/live2d/models/chaijun_3/chaijun_3.model3.json',
            modelname: 'Chaijun',
            modelid: '34',
            name: 'Chaijun 1'
        },
        {
            model: '/live2d/models/chaijun_4/chaijun_4.model3.json',
            modelname: 'Chaijun',
            modelid: '35',
            name: 'Chaijun 2'
        },
        {
            model: '/live2d/models/chaijun_4_hx/chaijun_4_hx.model3.json',
            modelname: 'Chaijun',
            modelid: '36',
            name: 'Chaijun 2 HX'
        },
        {
            model: '/live2d/models/chicheng_5/chicheng_5.model3.json',
            modelname: 'Chicheng',
            modelid: '37',
            name: 'Chicheng'
        },
        {
            model: '/live2d/models/chuixue_3/chuixue_3.model3.json',
            modelname: 'Chuixue',
            modelid: '38',
            name: 'Chuixue'
        },
        {
            model: '/live2d/models/chuyue_2/chuyue_2.model3.json',
            modelname: 'Chuyue',
            modelid: '39',
            name: 'Chuyue'
        },
        {
            model: '/live2d/models/dafeng_2/dafeng_2.model3.json',
            modelname: 'Dafeng',
            modelid: '40',
            name: 'Dafeng 1'
        },
        {
            model: '/live2d/models/dafeng_2_hx/dafeng_2_hx.model3.json',
            modelname: 'Dafeng',
            modelid: '41',
            name: 'Dafeng 1 HX'
        },
        {
            model: '/live2d/models/dafeng_3/dafeng_3.model3.json',
            modelname: 'Dafeng',
            modelid: '42',
            name: 'Dafeng 2'
        },
        {
            model: '/live2d/models/dafeng_4/dafeng_4.model3.json',
            modelname: 'Dafeng',
            modelid: '43',
            name: 'Dafeng 3'
        },
        {
            model: '/live2d/models/dafeng_6/dafeng_6.model3.json',
            modelname: 'Dafeng',
            modelid: '44',
            name: 'Dafeng 4'
        },
        {
            model: '/live2d/models/daofeng_4/daofeng_4.model3.json',
            modelname: 'Daofeng',
            modelid: '45',
            name: 'Daofeng 1'
        },
        {
            model: '/live2d/models/daofeng_5/daofeng_5.model3.json',
            modelname: 'Daofeng',
            modelid: '46',
            name: 'Daofeng 2'
        },
        {
            model: '/live2d/models/daofeng_5_hx/daofeng_5_hx.model3.json',
            modelname: 'Daofeng',
            modelid: '47',
            name: 'Daofeng 2 HX'
        },
        {
            model: '/live2d/models/dujiaoshou_4/dujiaoshou_4.model3.json',
            modelname: 'Dujiaoshou',
            modelid: '48',
            name: 'Dujiaoshou 1'
        },
        {
            model: '/live2d/models/deyizhi_3/deyizhi_3.model3.json',
            modelname: 'Deyizhi',
            modelid: '49',
            name: 'Deyizhi'
        },
        {
            model: '/live2d/models/biaoqiang/biaoqiang.model3.json',
            modelname: 'Biaoqiang',
            modelid: '50',
            name: 'Biaoqiang'
        },
        {
            model: '/live2d/models/dujiaoshou_6/dujiaoshou_6.model3.json',
            modelname: 'Dujiaoshou',
            modelid: '51',
            name: 'Dujiaoshou 2'
        },
        {
            model: '/live2d/models/dunkeerke_2/dunkeerke_2.model3.json',
            modelname: 'Dunkeerke',
            modelid: '52',
            name: 'Dunkeerke'
        },
        {
            model: '/live2d/models/edu_3/edu_3.model3.json',
            modelname: 'Edu',
            modelid: '53',
            name: 'Edu 1'
        },
        {
            model: '/live2d/models/edu_3_hx/edu_3_hx.model3.json',
            modelname: 'Edu',
            modelid: '54',
            name: 'Edu 1 HX'
        },
        {
            model: '/live2d/models/edu_4/edu_4.model3.json',
            modelname: 'Edu',
            modelid: '55',
            name: 'Edu 2'
        },
        {
            model: '/live2d/models/fengyun_4/fengyun_4.model3.json',
            modelname: 'Fengyun',
            modelid: '56',
            name: 'Fengyun'
        },
        {
            model: '/live2d/models/geliqiya_2/geliqiya_2.model3.json',
            modelname: 'Geliqiya',
            modelid: '57',
            name: 'Geliqiya'
        },
        {
            model: '/live2d/models/genaisennao_2/genaisennao_2.model3.json',
            modelname: 'Genaisennao',
            modelid: '58',
            name: 'Genaisennao'
        },
        {
            model: '/live2d/models/guandao_2/guandao_2.model3.json',
            modelname: 'Guandao',
            modelid: '59',
            name: 'Guandao'
        },
        {
            model: '/live2d/models/guangrong_3/guangrong_3.model3.json',
            modelname: 'Guangrong',
            modelid: '60',
            name: 'Guangrong'
        },
        {
            model: '/live2d/models/hailunna_4/hailunna_4.model3.json',
            modelname: 'Hailunna',
            modelid: '61',
            name: 'Hailunna'
        },
        {
            model: '/live2d/models/heitaizi_2/heitaizi_2.model3.json',
            modelname: 'Heitaizi',
            modelid: '62',
            name: 'Heitaizi'
        },
        {
            model: '/live2d/models/hemin_2/hemin_2.model3.json',
            modelname: 'Hemin',
            modelid: '63',
            name: 'Hemin 1'
        },
        {
            model: '/live2d/models/hemin_3/hemin_3.model3.json',
            modelname: 'Hemin',
            modelid: '64',
            name: 'Hemin 2'
        },
        {
            model: '/live2d/models/huangjiafangzhou_3/huangjiafangzhou_3.model3.json',
            modelname: 'Huangjiafangzhou',
            modelid: '65',
            name: 'Huangjiafangzhou'
        },
        {
            model: '/live2d/models/huonululu_3/huonululu_3.model3.json',
            modelname: 'Huonululu',
            modelid: '66',
            name: 'Huonululu 1'
        },
        {
            model: '/live2d/models/huonululu_5/huonululu_5.model3.json',
            modelname: 'Huonululu',
            modelid: '67',
            name: 'Huonululu 2'
        },
        {
            model: '/live2d/models/jialisuoniye_3/jialisuoniye_3.model3.json',
            modelname: 'Jialisuoniye',
            modelid: '68',
            name: 'Jialisuoniye'
        },
        {
            model: '/live2d/models/jialisuoniye_3_hx/jialisuoniye_3_hx.model3.json',
            modelname: 'Jialisuoniye',
            modelid: '69',
            name: 'Jialisuoniye HX'
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
        case 32:
            setY = -76;
            setX = -150;
            setScale = 0.1;
            break;
        case 33:
            setY = -119;
            setX = -225;
            setScale = 0.1;
            break;
        case 34:
            setY = -35;
            setX = -225;
            setScale = 0.08;
            break;
        case 35:
            setY = -378;
            setX = -540;
            setScale = 0.08;
            break;
        case 36:
            setY = -378;
            setX = -540;
            setScale = 0.08;
            break;
        case 37:
            setY = -218;
            setX = -237;
            setScale = 0.1;
            break;
        case 38:
            setY = 25;
            setX = -38;
            setScale = 0.1;
            break;
        case 39:
            setY = -70;
            setX = -164;
            setScale = 0.08;
            break;
        case 40:
            setY = -52;
            setX = -152;
            setScale = 0.1;
            break;
        case 41:
            setY = -52;
            setX = -152;
            setScale = 0.1;
            break;
        case 42:
            setY = -24;
            setX = -98;
            setScale = 0.1;
            break;
        case 43:
            setY = -33;
            setX = -145;
            setScale = 0.1;
            break;
        case 44:
            setY = -113;
            setX = -144;
            setScale = 0.1;
            break;
        case 45:
            setY = -14;
            setX = -230;
            setScale = 0.12;
            break;
        case 46:
            setY = -54;
            setX = -185;
            setScale = 0.12;
            break;
        case 47:
            setY = -54;
            setX = -185;
            setScale = 0.12;
            break;
        case 48:
            setY = 3;
            setX = -146;
            setScale = 0.12;
            break;
        case 49:
            setY = 77;
            setX = -45;
            setScale = 0.15;
            break;
        case 50:
            setY = 10;
            setX = -117;
            setScale = 0.5;
            break;
        case 51:
            setY = -156;
            setX = -269;
            setScale = 0.1;
            break;
        case 52:
            setY = -8;
            setX = -154;
            setScale = 0.08;
            break;
        case 53:
            setY = 18;
            setX = -206;
            setScale = 0.1;
            break;
        case 54:
            setY = 18;
            setX = -206;
            setScale = 0.1;
            break;
        case 55:
            setY = -81;
            setX = -308;
            setScale = 0.1;
            break;
        case 56:
            setY = -161;
            setX = -336;
            setScale = 0.1;
            break;
        case 57:
            setY = -129;
            setX = -277;
            setScale = 0.08;
            break;
        case 58:
            setY = -93;
            setX = -212;
            setScale = 0.11;
            break;
        case 59:
            setY = -207;
            setX = -380;
            setScale = 0.15;
            break;
        case 60:
            setY = -96;
            setX = -213;
            setScale = 0.1;
            break;
        case 61:
            setY = -103;
            setX = -124;
            setScale = 0.1;
            break;
        case 62:
            setY = 37;
            setX = -72;
            setScale = 0.1;
            break;
        case 63:
            setY = -19;
            setX = -96;
            setScale = 0.15;
            break;
        case 64:
            setY = -70;
            setX = -166;
            setScale = 0.1;
            break;
        case 65:
            setY = -40;
            setX = -165;
            setScale = 0.25;
            break;
        case 66:
            setY = -33;
            setX = -162;
            setScale = 0.12;
            break;
        case 67:
            setY = -152;
            setX = -282;
            setScale = 0.2;
            break;
        case 68:
            setY = -15;
            setX = -305;
            setScale = 0.1;
            break;
        case 69:
            setY = -15;
            setX = -305;
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
