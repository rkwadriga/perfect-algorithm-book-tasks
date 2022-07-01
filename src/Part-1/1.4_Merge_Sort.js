export const mergeSort = (arr, compareFn) => {
    // Base case: if source array is empty on have only one element - it's already sorted, just return it
    if (arr.length <= 1) {
        return Array.from(arr);
    }

    // Separate en source array on 2 parts and recursively sort them
    const halfSize = Math.round(arr.length / 2);
    const leftArr = mergeSort(arr.slice(0, halfSize), compareFn);
    const rightArr = mergeSort(arr.slice(halfSize, arr.length), compareFn);

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
