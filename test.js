const { getScoreForFrames } = require('./solution');

const testData = [
    {
        input: [4, 5, "X", 8],
        expected: [9, null, null],
    },
    {
        input: [4, 5, "X", 8, 1],
        expected: [9, 19, 9],
    },
    {
        input: [6, '/', 6, 3, 9, '/', 'X', 'X', 7, '/', 'X', 'X', 'X'],
        expected: [16, 9, 20, 27, 20, 20, 30, null, null],
    },
    {
        input: [8, '/', 7, '/', 'X', 8, 1, 8, '/', 'X', 'X', 'X', 8],
        expected: [17, 20, 19, 9, 20, 30, 28, null, null],
    },
    {
        input: [5, '/', 4, 0, 8, 1, 'X', 0, '/', 'X', 'X', 'X', 4, '/', 'X', 'X', 5],
        expected: [14, 4, 9, 20, 20, 30, 24, 20, 20, 25],
    },
    {
        input: [0, 4, 5, '/', 6, '/', 'X', 'X', 9, 0, 'X', 5, 4, 3],
        expected: [4, 16, 20, 29, 19, 9, 19, 9, null],
    },
    {
        input: [3, '/', 5, 3, 'X', 5, '/', 'X', 4, 4, 6, 3, 6, '/', 0, '/', 0, 3],
        expected: [15, 8, 20, 20, 18, 8, 9, 10, 10, 3],
    },
]

const typeCheck = (scores) => {
    if (!Array.isArray(scores)) {
        throw Error(`Argument must be an array of number or null.\nArgument: ${scores}`);
    }
    for (const score of scores) {
        if (score !== null && typeof score !== "number") {
            throw Error(`Argument must be an array of number or null.\nArgument: ${JSON.stringify(scores)}`);
        }
    }
}

const assertEqual = (result, expected) => {
    typeCheck(result);
    typeCheck(expected);
    if (result.length != expected.length) {
        throw Error(`Assert Equal Failed:\nResult:   ${JSON.stringify(result)}\nExpected: ${JSON.stringify(expected)}`);
    }

    for (let i = 0; i < result.length; i++) {
        if (result[i] !== expected[i]) {
            throw Error(`Assert Equal Failed:\nResult:   ${JSON.stringify(result)}\nExpected: ${JSON.stringify(expected)}`);
        }
    }
}

for (const {input, expected} of testData) {
    assertEqual(getScoreForFrames(input), expected);
}
console.log('All tests passed!');