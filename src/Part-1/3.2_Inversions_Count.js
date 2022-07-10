
export const calculateInversions = (arr, operationsNum = 0) => {
    // Base cases
    if (arr.length <= 1) {
        return [arr, 0, operationsNum];
    }
    if (arr.length === 2) {
        return arr[0] > arr[1] ? [[arr[1], arr[0]], 1, operationsNum + 1] : [arr, 0, operationsNum + 1];
    }

    // Separate en source array on 2 parts and recursively calculate inversions for them
    const halfSize = Math.round(arr.length / 2);
    const [leftArr, leftInversions, leftOperations] = calculateInversions(arr.slice(0, halfSize), operationsNum);
    const [rightArr, rightInversions, rightOperations] = calculateInversions(arr.slice(halfSize), leftOperations);

    // Calculating inversions
    const resArr = [];
    let inversionsCount = leftInversions + rightInversions;
    let totalOperations = rightOperations;
    let leftIndex = 0, rightIndex = 0;
    for (let i = 0; i < arr.length; i++) {
        totalOperations++;
        if (leftIndex === leftArr.length) {
            resArr.push(rightArr[rightIndex++]);
        } else if (rightIndex === rightArr.length) {
            resArr.push(leftArr[leftIndex++]);
        } else if (leftArr[leftIndex] > rightArr[rightIndex]) {
            resArr.push(rightArr[rightIndex++]);
            inversionsCount += leftArr.length - leftIndex;
        } else {
            resArr.push(leftArr[leftIndex++]);
        }
    }

    return [resArr, inversionsCount, totalOperations];
};

