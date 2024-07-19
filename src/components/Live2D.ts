// utils/live2d.ts

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
        default:
            setY = 0.09;
            setX = -125;
            setScale = 0.1;
            break;
    }

    return { setX, setY, setScale };
}
