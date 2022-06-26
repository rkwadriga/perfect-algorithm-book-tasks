function getNumberHalves(num) {
    const str = String(num);
    if (str.length === 1) {
        return null;
    }
    const halfLength = Math.round(str.length / 2);
    const [half1, half2] = [str.substring(0, halfLength), str.substring(halfLength)];
    let [num1, num2] = [Number(half1), Number(half2)];
    if (num2 !== 0 && half1.length > half2.length) {
        num2 *= 10;
    }
    return [num1, num2];
}

export const karatsubaMultiplication = (x, y) => {
    // 1. Take into account the case of an odd number of digits
    let [xLength, yLength] = [String(x).length, String(y).length];
    let degree = Math.max(xLength, yLength), coefficient = 1;
    if (degree > 1 && degree % 2 !== 0) {
        degree++;
    }
    if (yLength > xLength) {
        const powDiff = Math.pow(10, yLength - xLength);
        x *= powDiff;
        coefficient /= powDiff;
    } else if (xLength > yLength) {
        const powDiff = Math.pow(10, xLength - yLength);
        y *= powDiff;
        coefficient /= powDiff;
    }

    [xLength, yLength] = [String(x).length, String(y).length];
    if (xLength > 1 && xLength % 2 !== 0) {
        x *= 10;
        coefficient /= 10;
    }
    if (yLength > 1 && yLength % 2 !== 0) {
        y *= 10;
        coefficient /= 10;
    }

    // 2. Get number halves
    const [half1, half2] = [getNumberHalves(x), getNumberHalves(y)];
    if (half1 === null || half2 === null) {
        return x * y * coefficient;
    }
    const [[a, b], [c, d]] = [half1, half2];

    // 3. Get halves multiplications
    const [ac, bd] = [karatsubaMultiplication(a, c), karatsubaMultiplication(b, d)];

    // 4. Difference
    const diff = karatsubaMultiplication(a + b, c + d) - ac - bd;

    // 5. Result
    return (ac * Math.pow(10, degree) + diff * Math.pow(10, degree / 2) + bd) * coefficient;
};