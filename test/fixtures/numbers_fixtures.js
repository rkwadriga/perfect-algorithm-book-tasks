export const generateRandomNum = (min, max) => {
    if (max === undefined || min > max) {
        max = min;
        min = 0;
    } else if (max === min) {
        return max;
    }
    if (max === 1) {
        return Math.random();
    } else if (max === 0) {
        return 0;
    }

    const diff = max - min;
    return min + diff - Math.round(diff * Math.random());
}

export const generate2powerArray = (maxSize) => {
    let size = maxSize;
    if (size > 2) {
        const randomPow = generateRandomNum(Math.log2(size) - 1);
        for (let i = 0; i < randomPow; i++) {
            size /= 2;
        }
    }

    const arr = [], keys = [];
    for (let j = 0; j < size; j++) {
        const coef = size * (Math.random() > 0.5 ? 2 : 3);
        let randomNum = generateRandomNum(coef);
        while (keys[randomNum] !== undefined) {
            randomNum = generateRandomNum(coef);
        }
        keys[randomNum] = true;
        arr.push(randomNum);
    }

    return arr;
}