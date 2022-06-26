import { expect } from "chai";
import { karatsubaMultiplication } from "../../src/Part-1/1.3_Karatsuba_Multiplication.js";

describe('Test Part 1', () => {
    before(() => {});

    describe('Chapter 1.3. Karatsuba Multiplication', () => {
        const testValues = [
            {x: 3, y: 5, res: 15},
            {x: 13, y: 5, res: 65},
            {x: 15, y: 30, res: 450},
            {x: 56, y: 34, res: 1904},
            {x: 742, y: 34, res: 25228},
            {x: 742, y: 341, res: 253022},
            {x: 8921, y: 3657, res: 32624097},
            {x: 8930, y: 3657, res: 32657010},
            {x: 7420, y: 3410, res: 25302200},
            {x: 8900, y: 3657, res: 32547300},
            {x: 8900, y: 3600, res: 32040000},
            {x: 8000, y: 3600, res: 28800000},
            {x: 8000, y: 3000, res: 24000000},
            {x: 8001, y: 3000, res: 24003000},
            {x: 8001, y: 3002, res: 24019002},
            {x: 35632, y: 1289, res: 45929648},
            {x: 35632, y: 36914, res: 1315319648},
            {x: 35630, y: 36914, res: 1315245820},
            {x: 35630, y: 36910, res: 1315103300},
            {x: 35030, y: 36910, res: 1292957300},
            {x: 64200, y: 21456, res: 1377475200},
            {x: 64000, y: 21456, res: 1373184000},
            {x: 60000, y: 21456, res: 1287360000},
            {x: 35030, y: 369103, res: 12929678090},
            {x: 350303, y: 369103, res: 129297888209},
            {x: 350303, y: 369, res: 129261807},
            {x: 350303, y: 36, res: 12610908},
            {x: 350303, y: 7, res: 2452121},
            {x: 7, y: 350303, res: 2452121},
        ];

        testValues.forEach(testCase => {
            it(`karatsubaMultiplication(${testCase.x}, ${testCase.y}) = ${testCase.res}`, () => {
                expect(karatsubaMultiplication(testCase.x, testCase.y)).to.equals(testCase.res);
            });
        });
    });
});