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

// Solution

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
                    if (!hasTenFrames(frameScore)) frameScore.push(null);
                    break;
                }
                // can calculate score for frame
                frameScore.push(10 + nextNextScore);
            } else { // no strike, no spare; calculate total for frame
                frameScore.push(score + nextScore);
            }
            i += 2; // go to next frame
        }

        if (isStrike(score)) {
            if (nextNextScore === undefined) { // has nextScore but no score after, need two nulls for two frames
                if (!hasTenFrames(frameScore)) frameScore.push(null);
                if (!hasTenFrames(frameScore)) frameScore.push(null);
                break;
            }

            // can calculate score for frame
            if (isSpare(nextNextScore)) { // nextScore won't be spare after a strike, but nextNextScore could be spare
                frameScore.push(20);
            } else {
                frameScore.push(10 + nextScore + nextNextScore);
            }
            i += 1; // go to next frame
        }
    }

    return frameScore;
};

module.exports = {
    getScoreForFrames
}