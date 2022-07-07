export const getMaxNum = (arr) => {
    if (arr.length === 0) {
        return undefined;
    }

    let maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (maxVal < arr[i]) {
            maxVal = arr[i];
        }
    }

    return maxVal;
}

export const getSubMaxNum = (arr) => {
    const max = getMaxNum(arr);
    let i = 0;
    let subMax = arr[i++];
    while (subMax === max) {
        subMax = arr[i++];
    }

    for (i; i < arr.length; i++) {
        if (arr[i] < max && arr[i] > subMax) {
            subMax = arr[i];
        }
    }

    return subMax;
}