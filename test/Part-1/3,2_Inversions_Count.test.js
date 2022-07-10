import { expect, assert } from "chai";
import { calculateInversions } from "../../src/Part-1/3.2_Inversions_Count.js";

describe('Chapter 3.2. Inversions Count', () => {
    const testValues = [
        {arr: [1], inv: 0},
        {arr: [1, 2], inv: 0},
        {arr: [1, 2, 3], inv: 0},
        {arr: [1, 2, 3, 4], inv: 0},
        {arr: [1, 2, 3, 4, 5], inv: 0},
        {arr: [1, 2, 3, 4, 5, 6], inv: 0},
        {arr: [1, 2, 3, 4, 5, 6, 7], inv: 0},
        {arr: [1, 2, 3, 4, 5, 6, 7, 8], inv: 0},
        {arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], inv: 0},
        {arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], inv: 0},
        {arr: [2, 1], inv: 1},
        {arr: [3, 2, 1], inv: 3},
        {arr: [4, 3, 2, 1], inv: 6},
        {arr: [5, 4, 3, 2, 1], inv: 10},
        {arr: [6, 5, 4, 3, 2, 1], inv: 15},
        {arr: [7, 6, 5, 4, 3, 2, 1], inv: 21},
        {arr: [8, 7, 6, 5, 4, 3, 2, 1], inv: 28},
        {arr: [9, 8, 7, 6, 5, 4, 3, 2, 1], inv: 36},
        {arr: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], inv: 45},
        {arr: [1, 3, 2], inv: 1},
        {arr: [3, 1, 2], inv: 2},
        {arr: [2, 3, 1], inv: 2},
        {arr: [2, 3, 1, 4], inv: 2},
        {arr: [2, 3, 4, 1], inv: 3},
        {arr: [3, 2, 4, 1], inv: 4},
        {arr: [3, 4, 2, 1], inv: 5},
        {arr: [2, 1, 3, 4, 5], inv: 1},
        {arr: [2, 3, 1, 4, 5], inv: 2},
        {arr: [2, 3, 4, 1, 5], inv: 3},
        {arr: [2, 3, 4, 5, 1], inv: 4},
        {arr: [3, 2, 4, 5, 1], inv: 5},
        {arr: [3, 4, 2, 5, 1], inv: 6},
        {arr: [3, 4, 5, 2, 1], inv: 7},
        {arr: [3, 4, 5, 1, 2], inv: 6},
        {arr: [4, 3, 5, 2, 1], inv: 8},
        {arr: [4, 5, 3, 2, 1], inv: 9},
        {arr: [2, 1, 3, 4, 5, 6], inv: 1},
        {arr: [2, 1, 4, 3, 5, 6], inv: 2},
        {arr: [1, 3, 5, 2, 4, 6], inv: 3},
        {arr: [2, 1, 4, 3, 6, 5], inv: 3},
    ];

    describe('Test "calculateInversions" function', () => {
        testValues.forEach(testCase => {
            const [inversions, operations] = calculateInversions(testCase.arr).slice(1);
            const maxOperations = testCase.arr.length * Math.log2(testCase.arr.length);
            it(`calculateInversions([${testCase.arr.join(', ')}]) = ${inversions}`, () => {
                expect(inversions).to.equal(testCase.inv);
                expect(operations).to.lessThanOrEqual(maxOperations);
            });
        });
    });
});