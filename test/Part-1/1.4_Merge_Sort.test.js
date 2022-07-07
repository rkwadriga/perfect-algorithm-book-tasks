import { expect, assert } from "chai";
import { mergeSort, subMaxNumber } from "../../src/Part-1/1.4_Merge_Sort.js";
import { generate2powerArray } from "../fixtures/numbers_fixtures.js";
import { getSubMaxNum } from "../helpers/number-helpers.js";

describe('Chapter 1.4. Merge Sort', () => {
    const testValues = [
        {source: [], dir: [], rev: []},
        {source: [1], dir: [1], rev: [1]},
        {source: [0, 1], dir: [0, 1], rev: [1, 0]},
        {source: [1, 0], dir: [0, 1], rev: [1, 0]},
        {source: [2, 3], dir: [2, 3], rev: [3, 2]},
        {source: [3, 2], dir: [2, 3], rev: [3, 2]},
        {source: [3, 3, 3], dir: [3, 3, 3], rev: [3, 3, 3]},
        {source: [3, 2, 2], dir: [2, 2, 3], rev: [3, 2, 2]},
        {source: [1, 2, 3], dir: [1, 2, 3], rev: [3, 2, 1]},
        {source: [3, 2, 1], dir: [1, 2, 3], rev: [3, 2, 1]},
        {source: [2, 1, 3], dir: [1, 2, 3], rev: [3, 2, 1]},
        {source: [2, 3, 1], dir: [1, 2, 3], rev: [3, 2, 1]},
        {source: [3, 1, 2], dir: [1, 2, 3], rev: [3, 2, 1]},
        {source: [1, 2, 3, 1, 2, 2], dir: [1, 1, 2, 2, 2, 3], rev: [3, 2, 2, 2, 1, 1]},
        {source: [1, 2, 3, 4], dir: [1, 2, 3, 4], rev: [4, 3, 2, 1]},
        {source: [4, 3, 2, 1], dir: [1, 2, 3, 4], rev: [4, 3, 2, 1]},
        {source: [3, 2, 4, 1], dir: [1, 2, 3, 4], rev: [4, 3, 2, 1]},
        {source: [3, 2, 2, 4, 3, 1], dir: [1, 2, 2, 3, 3, 4], rev: [4, 3, 3, 2, 2, 1]},
        {source: [1, 2, 3, 4, 5], dir: [1, 2, 3, 4, 5], rev: [5, 4, 3, 2, 1]},
        {source: [5, 4, 3, 2, 1], dir: [1, 2, 3, 4, 5], rev: [5, 4, 3, 2, 1]},
        {source: [3, 5, 1, 2, 4], dir: [1, 2, 3, 4, 5], rev: [5, 4, 3, 2, 1]},
        {source: [3, 5, 5, 4, 1, 2, 4, 1], dir: [1, 1, 2, 3, 4, 4, 5, 5], rev: [5, 5, 4, 4, 3, 2, 1, 1]},
        {source: [1, 2, 3, 4, 5, 6], dir: [1, 2, 3, 4, 5, 6], rev: [6, 5, 4, 3, 2, 1]},
        {source: [6, 5, 4, 3, 2, 1], dir: [1, 2, 3, 4, 5, 6], rev: [6, 5, 4, 3, 2, 1]},
        {source: [3, 5, 1, 6, 2, 4], dir: [1, 2, 3, 4, 5, 6], rev: [6, 5, 4, 3, 2, 1]},
        {source: [3, 5, 4, 1, 6, 5, 2, 4], dir: [1, 2, 3, 4, 4, 5, 5, 6], rev: [6, 5, 5, 4, 4, 3, 2, 1]},
        {source: [1, 2, 3, 4, 5, 6, 7], dir: [1, 2, 3, 4, 5, 6, 7], rev: [7, 6, 5, 4, 3, 2, 1]},
        {source: [7, 6, 5, 4, 3, 2, 1], dir: [1, 2, 3, 4, 5, 6, 7], rev: [7, 6, 5, 4, 3, 2, 1]},
        {source: [3, 5, 1, 6, 2, 7, 4], dir: [1, 2, 3, 4, 5, 6, 7], rev: [7, 6, 5, 4, 3, 2, 1]},
        {source: [3, 5, 1, 6, 2, 7, 4, 7], dir: [1, 2, 3, 4, 5, 6, 7, 7], rev: [7, 7, 6, 5, 4, 3, 2, 1]},
        {source: [1, 2, 3, 4, 5, 6, 7, 8], dir: [1, 2, 3, 4, 5, 6, 7, 8], rev: [8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [8, 7, 6, 5, 4, 3, 2, 1], dir: [1, 2, 3, 4, 5, 6, 7, 8], rev: [8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [8, 3, 5, 1, 6, 2, 7, 4], dir: [1, 2, 3, 4, 5, 6, 7, 8], rev: [8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [8, 3, 1, 5, 1, 6, 1, 8, 2, 7, 4], dir: [1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 8], rev: [8, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1]},
        {source: [1, 2, 3, 4, 5, 6, 7, 8, 9], dir: [1, 2, 3, 4, 5, 6, 7, 8, 9], rev: [9, 8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [9, 8, 7, 6, 5, 4, 3, 2, 1], dir: [1, 2, 3, 4, 5, 6, 7, 8, 9], rev: [9, 8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [8, 3, 5, 1, 9, 6, 2, 7, 4], dir: [1, 2, 3, 4, 5, 6, 7, 8, 9], rev: [9, 8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [8, 3, 3, 5, 1, 9, 5, 6, 2, 7, 4], dir: [1, 2, 3, 3, 4, 5, 5, 6, 7, 8, 9], rev: [9, 8, 7, 6, 5, 5, 4, 3, 3, 2, 1]},
        {source: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], dir: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rev: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], dir: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rev: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [8, 3, 5, 1, 9, 6, 10, 2, 7, 4], dir: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rev: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [8, 3, 10, 5, 1, 9, 2, 6, 10, 2, 7, 4], dir: [1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10], rev: [10, 10, 9, 8, 7, 6, 5, 4, 3, 2, 2, 1]},
        {source: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], dir: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], rev: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], dir: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], rev: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [8, 3, 5, 1, 9, 11, 6, 10, 2, 7, 4], dir: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], rev: [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]},
        {source: [8, 3, 5, 6, 1, 9, 11, 6, 6, 10, 2, 7, 4, 3], dir: [1, 2, 3, 3, 4, 5, 6, 6, 6, 7, 8, 9, 10, 11], rev: [11, 10, 9, 8, 7, 6, 6, 6, 5, 4, 3, 3, 2, 1]},
    ];

    describe('Test condition "el1 > el2 ? 1 : -1"', () => {
        testValues.forEach(testCase => {
            const resArr = mergeSort(testCase.source, (el1, el2) => el1 > el2 ? 1 : -1);
            it(`mergeSort([${testCase.source.join(', ')}])`, () => {
                assert.deepEqual(resArr, testCase.dir);
            });
        });
    });

    describe('Test condition "el1 > el2 ? -1 : 1"', () => {
        testValues.forEach(testCase => {
            const resArr = mergeSort(testCase.source, (el1, el2) => el1 > el2 ? -1 : 1);
            it(`mergeSort([${testCase.source.join(', ')}])`, () => {
                assert.deepEqual(resArr, testCase.rev);
            });
        });
    });

    describe('Test "subMax" function', () => {
        for (let i = 1; i <= 20; i++) {
            const arr = generate2powerArray(32);
            const maxComparings = arr.length + Math.log2(arr.length) - 2;
            const [res, comparings] = subMaxNumber(arr);
            const itText = `subMaxNumber(${arr.join(', ')}) = ${res}; Max comparings: ${maxComparings}, Actual comparings: ${comparings}`;

            it(itText, () => {
                expect(res).to.equals(getSubMaxNum(arr));
                expect(comparings).to.lessThanOrEqual(maxComparings);
            });
        }
    });
});