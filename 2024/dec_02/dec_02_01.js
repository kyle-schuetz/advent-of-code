const fs = require('node:fs');
const path = require('path');

function buildReportsList(fileName) {
    const reportsList = [];
    try {
        const data = fs.readFileSync(fileName, 'utf-8');
        const splitData = data.split('\n');
        
        for (const item of splitData) {
            const itemSplit = item.split(' ');
            const numItems = itemSplit.map(Number);
            reportsList.push(numItems);
        }
    } catch (err) {
        console.error(err);
    }

    return reportsList;
}

function _isIncreasing(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] >= arr[i + 1]) {
            return false;
        }
    }

    return true;
}

function _isIncreasingWithDampening(arr) {

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] >= arr[i + 1]) {
            const editedArr = [];
            for (let j = 0; j < i; j++) {
                editedArr.push(arr[j]);
            }

            for (let j = i + 1; j < arr.length; j++) {
                editedArr.push(arr[j]);
            }
            // check to see if the array with the current
            // item removed 
            if (_isIncreasing(editedArr)) {
                return [true, editedArr];
            }

            return [false, []];
        }
    }

    return [true, arr];
}

function _isDecreasing(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] <= arr[i + 1]) {
            return false;
        }
    }
    return true
}

function _isDecreasingWithDampening(arr) {

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] <= arr[i + 1]) {
            const editedArr = [];
            for (let j = 0; j < i; j++) {
                editedArr.push(arr[j]);
            }

            for (let j = i + 1; j < arr.length; j++) {
                editedArr.push(arr[j]);
            }

            if (_isDecreasing(editedArr)) {
                return [true, editedArr]
            }
            
            return [false, []];
        }
    }
    
    return [true, arr]
}

function _isConstant(arr) {
    let previous = arr[0];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > previous || arr[i] < previous) {
            return false;
        }
        previous = arr[i];
    }

    return true;
}



function _isDecreasingSafe(levelsReport) {
    for (let i = 0; i < levelsReport.length - 1; i++) {
        const difference = levelsReport[i] - levelsReport[i + 1];

        if (difference < 1 || difference > 3) {
            return false;
        }
    }

    return true;
}

function _isIncreasingSafe(levelsReport) {
    for (let i = 0; i < levelsReport.length - 1; i++) {
        const difference = levelsReport[i + 1] - levelsReport[i];

        if (difference < 1 || difference > 3) {
            return false;
        }
    }

    return true;
}

function isSafe(levelsReport) {
    // if the reactor levels are constant
    // it is not safe
    if (_isConstant(levelsReport)) {
        return false;
    }

    // check if something is decreasing
    // if we remove something can it be 

    let [decreasingStatus, decreasingReport] = _isDecreasingWithDampening(levelsReport);
    if (decreasingStatus) {
        if (_isDecreasingSafe(decreasingReport)) {
            return true;
        }
    }

    let [increasingStatus, increasingReport] =  _isIncreasingWithDampening(levelsReport);
    if (increasingStatus) {
        if(_isIncreasingSafe(increasingReport)) {
            return true;
        }
    }

    return false;
}


const filePath = path.join(__dirname, 'input.txt');
const reports = buildReportsList(filePath);
let safetyScore = 0;


for (const report of reports) {
    if (isSafe(report)) {
        safetyScore += 1;
    }
}

console.log(safetyScore);