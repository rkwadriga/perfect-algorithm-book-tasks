
export const matrixMultiplication = (x, y) => {
    const result = [];

    for (let xi = 0; xi < x.length; xi++) {
        result[xi] = [];
        for (let xj = 0; xj < x.length; xj++) {
            for (let yi = 0; yi < x.length; yi++) {
                const subRes = x[xi][xj] * y[xj][yi];
                if (result[xi][yi] === undefined) {
                    result[xi][yi] = subRes;
                } else {
                    result[xi][yi] += subRes;
                }
            }
        }
    }

    return result;
};

export const separateMatrix = (m) => {
    const halfL = x.length / 2;
    const sub1 = [], sub2 = [], sub3 = [], sub4 = [];
    for (let i = 0; i < x.length / 2; i++) {
        sub1[i] = []; sub2[i] = []; sub3[i] = []; sub4[i] = [];
        for (let j = 0; j < halfL; j++) {
            sub1[i][j] = m[i][j];
            sub2[i][j] = m[i][halfL + j];
            sub3[i][j] = m[halfL + i][j];
            sub4[i][j] = m[halfL + i][halfL + j];
        }
    }

    return [sub1, sub2, sub3, sub4];
};

export const matrixSumOrDiff = (x, y, sum = true) => {
    const result = [];
    for (let i = 0; i < x.length; i++) {
        result[i] = [];
        for (let j = 0; j < x.length; j++) {
            result[i][j] = sum ? x[i][j] + y[i][j] : x[i][j] - y[i][j];
        }
    }

    return result;
}

export const matrixSum = (x, y) => {
    return matrixSumOrDiff(x, y, true);
}

export const matrixDiff = (x, y) => {
    return matrixSumOrDiff(x, y, false);
}

export const matrixMultiplicationStrassen = (x, y) => {
    const n = x.length;
    // Base case
    if (n === 2) {
        return [
            [x[0][0] * y[0][0] + x[0][1] * y[1][0], x[0][0] * y[0][1] + x[0][1] * y[1][1]],
            [x[1][0] * y[0][0] + x[1][1] * y[1][0], x[1][0] * y[0][1] + x[1][1] * y[1][1]]
        ];
    }

    // Separate matrix
    const [A, B, C, D] = separateMatrix(x);
    const [E, F, G, H] = separateMatrix(y);

    // 7 Recursive matrix multiplications by Strassen's method
    const P1 = matrixMultiplication(A, matrixDiff(F, H));
    const P2 = matrixMultiplication(matrixSum(A, B), H);
    const P3 = matrixMultiplication(matrixSum(C, D), E);
    const P4 = matrixMultiplication(D, matrixDiff(G, E));
    const P5 = matrixMultiplication(matrixSum(A, D), matrixSum(E, H));
    const P6 = matrixMultiplication(matrixDiff(B, D), matrixSum(G, H));
    const P7 = matrixMultiplication(matrixDiff(A, C), matrixSum(E, F));

    console.log(P7);

    return [];
};

const x = [[4, 2, 7, 2], [3, 1, 9, 2], [8, 3, 7, 2], [4, 8, 1, 5]];
const y = [[8, 5, 2, 7], [3, 5, 7, 3], [3, 5, 8, 1], [3, 2, 4, 5]];

// const x = [[2, 5], [3, 4]];
// const y = [[1, 3], [5, 2]];

x.forEach(line => console.log(line));
console.log('______________________________________________');
y.forEach(line => console.log(line));
console.log('______________________________________________');

const z = matrixMultiplication(x, y);
//const z = matrixSum(x, y);

let resString = '';
z.forEach(line => {
    resString += '[' + line.join(', ') + "]\n";
});
console.log(resString);
