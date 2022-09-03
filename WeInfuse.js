/*
You've been asked to write a calculator to sum an individual player's rolls and return their score for each frame.
The method should accept an array of rolls. 
Possible values include zero through nine, a "/" indicating a spare, and an "X" indicating a strike. 
The return value should be an array of scores for the frames the player has bowled.

The scoring method will be used to calculate a player's running score during the game, so it's important that the method work for games in progress. 
For example,
[4, 5, "X", 8] should return [9, nil, nil], since the second and third frames can't be calculated yet. 
When the second roll of the third frame comes in, all three frames should be returned, 
e.g. [4, 5, "X", 8, 1] would return [9, 19, 9]. (Note that these are the scores for the frames, not the running score).
*/

// helpers
const isStrike = function(score) {
    return score === 'X' || score === 10;
};

const isSpare = function(score) {
    return score === '/';
};

const hasTenFrames = function(frameScore) {
    return frameScore.filter(x => x !== null).length === 10;
}

// main function
const getScoreForFrames = function(scoresForRolls) {
    let frameScore = [];

    let i = 0;
    while (i < scoresForRolls.length) { // everytime the current score will be the first roll for each frame
        let score = scoresForRolls[i];
        let nextScore = scoresForRolls[i + 1] === 'X' ? 10 : scoresForRolls[i + 1];
        let nextNextScore = scoresForRolls[i + 2] === 'X' ? 10 : scoresForRolls[i + 2];

        // need nextScore before pushing score
        if (nextScore === undefined) {
            if (!hasTenFrames(frameScore)) frameScore.push(null);
            break;
        };

        if (score < 10) { // no strike
            if (isSpare(nextScore)) {  // spare; calculate total for frame to include next roll
                // if next is spare, need nextNextScore before pushing score
                if (nextNextScore === undefined) {
                    // console.log('pushing null');
                    if (!hasTenFrames) frameScore.push(null);
                    break;
                }
                // can calculate score for frame
                frameScore.push(10 + nextNextScore);
                i = i + 2; // go to next frame
            } else { // no strike, no spare; calculate total for frame
                // can calculate score for frame
                frameScore.push(score + nextScore);
                i = i + 2; // go to next frame
            }
        }

        if (isStrike(score)) {
            if ((nextNextScore === undefined) && nextScore) { // has nextScore but no score after, need two nulls for two frames
                if (!hasTenFrames) frameScore.push(null);
                if (!hasTenFrames) frameScore.push(null);
                break;
            }
            else if ((nextScore === undefined && nextNextScore === undefined)) {
                if (!hasTenFrames) frameScore.push(null); // need two more rolls for frame score
                break;
            }

            // can calculate score for frame
            if (isSpare(nextNextScore)) { // nextScore won't be spare after a strike, but nextNextScore could be spare
                frameScore.push(20);
            } else {
                frameScore.push(10 + nextScore + nextNextScore);
            }
            i = i + 1; // go to next frame
        }
    }

    return frameScore;
};

// let test1 = [4, 5, "X", 8];
// let test2 = [4, 5, "X", 8, 1];
// let test3 = [6, '/', 6, 3, 9, '/', 'X', 'X', 7, '/', 'X', 'X', 'X'];
// let test4 = [8, '/', 7, '/', 'X', 8, 1, 8, '/', 'X', 'X', 'X', 8];
// let test5 = [5, '/', 4, 0, 8, 1, 'X', 0, '/', 'X', 'X', 'X', 4, '/', 'X', 'X', 5];
// let test6 = [0, 4, 5, '/', 6, '/', 'X', 'X', 9, 0, 'X', 5, 4, 3]
// let test7 = [3, '/', 5, 3, 'X', 5, '/', 'X', 4, 4, 6, 3, 6, '/', 0, '/', 0, 3];

// let result1 = getScoreForFrames(test1);
// let result2 = getScoreForFrames(test2);
// let result3 = getScoreForFrames(test3);
// let result4 = getScoreForFrames(test4);
// let result5 = getScoreForFrames(test5);
// let result6 = getScoreForFrames(test6);
// let result7 = getScoreForFrames(test7);

// console.log('result1', result1);
// // result1 [9, null, null]
// console.log('result2', result2);
// // result2 [9, 19, 9]
// console.log('result3', result3);
// // result3 [16, 9, 20, 27, 20, 20, 30, null, null]
// console.log('result4', result4);
// // result4 [17, 20, 19, 9, 20, 30, 28, null, null]
// console.log('result5', result5);
// result5 [14, 4, 9, 20, 20, 30, 24, 20, 20, 25]
// console.log('result6', result6);
// result6 [4, 16, 20, 29, 19, 9, 19, null]
// console.log('result7', result7);
// result7 [15, 8, 20, 20, 18, 8, 9, 10, 10, 10];