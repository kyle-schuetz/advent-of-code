// build a frequency map for each item in right
// iterate left list
// multiply the current item by the
// frequency number from the left list
// add the frequency number of the current item to the
// total frequency score

const helpers = require('./helper');

const [left, right] = helpers.buildDistanceLists('input.txt');

const rightFreqMap = {};

for (const item of right) {
    if (item in rightFreqMap) {
        rightFreqMap[item] += 1;
    } else {
        rightFreqMap[item] = 1;
    }
}

let frequencyScore = 0;

for (const item of left) {
    let freq = 0;
    if (item in rightFreqMap) {
        freq = Number(item) * rightFreqMap[item];
    }
    frequencyScore += freq;
}

console.log(frequencyScore);

