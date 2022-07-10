export const mergeSort = (arr, compareFn) => {
    // Base case: if source array is empty or have only one element - it's already sorted, just return it
    if (arr.length <= 1) {
        return Array.from(arr);
    }

    // Separate en source array on 2 parts and recursively sort them
    const halfSize = Math.round(arr.length / 2);
    const leftArr = mergeSort(arr.slice(0, halfSize), compareFn);
    const rightArr = mergeSort(arr.slice(halfSize), compareFn);

    // Merge the left and the right parts
    const resArr = [], maxLeftI = leftArr.length, maxRightI = rightArr.length;
    let leftI = 0, rightI = 0;
    while (resArr.length < arr.length) {
        const el1 = leftArr[leftI], el2 = rightArr[rightI];
        if (leftI === maxLeftI) {
            resArr.push(el2);
            rightI++;
        } else if (rightI === maxRightI) {
            resArr.push(el1);
            leftI++;
        } else if (compareFn(el1, el2) > 0) {
            resArr.push(el2);
            rightI++;
        } else {
            resArr.push(el1);
            leftI++;
        }
    }

    return resArr;
}

export const subMaxNumber = arr => {
    const tmpArr = {};
    let comparingNum = 0;
    let maxVal = arr[0];
    for (let i = 1; i < arr.length; i++) {
        const diff = maxVal - arr[i];
        comparingNum++;
        if (diff < 0) {
            tmpArr[maxVal] = true;
            maxVal = arr[i];
        } else {
            tmpArr[arr[i]] = true;
        }
    }

    const keysArr = Object.keys(tmpArr);
    return [Number(keysArr[keysArr.length - 1]), comparingNum];
};

//const arr = [2, 10, 12, 6, 17, 23, 13, 1];
//const arr = [11, 5, 9, 12, 10, 14, 22, 7];
//const arr = [6, 2, 11, 4];
//const arr = [4, 2, 11, 6];
//const arr = [22, 5, 11, 9, 12, 10, 14, 7];
/*const [res, comparingNum] = subMaxNumber(arr);
console.log(`subMaxNumber(${arr.join(', ')}) = ${res}`);
console.log(`${arr.length} + log2(${arr.length}) – 2 = ${arr.length} + ${Math.log2(arr.length)} – 2 = ${arr.length + Math.log2(arr.length) - 2}`);
console.log(`Comparing number: ${comparingNum}`);*/
