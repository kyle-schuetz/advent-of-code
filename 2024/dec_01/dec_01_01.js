// sort two lists in ascending order
// iterate both lists
//find (abs) difference between the numbers as the distance
//add the distance to a running total distance
const helpers = require('./helper');


let [left, right] = helpers.buildDistanceLists('input.txt');
// sort pointers in ascending range
left.sort();
right.sort();


let leftPointer = 0;
let rightPointer = 0;
let distance = 0;

while (leftPointer < left.length && rightPointer < right.length ) {
    const localDistance = Math.abs(left[leftPointer] - right[rightPointer]);
    distance += localDistance;
    leftPointer += 1;
    rightPointer += 1;
}

console.log(distance);
