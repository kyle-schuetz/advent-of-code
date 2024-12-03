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

function _isDecreasing(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] <= arr[i + 1]) {
            return false;
        }
    }
    return true
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

function _isDecreasingWithDampening(arr) {
    for (let i = 0; i < arr.length; i++) {
        let subArr = [];
        
        for (let j = 0; j < i; j++) {
            subArr.push(arr[j]);
        }

        for (let j = i + 1; j < arr.length; j++) {
            subArr.push(arr[j]);
        }

        if (_isDecreasing(subArr)) {
            return [true, subArr];
        }
    }
    
    return [false, arr];
}

function _isIncreasingWithDampening(arr) {
    for (let i = 0; i < arr.length; i++) {
        let subArr = [];

        for (let j = 0; j < i; j++) {
            subArr.push(arr[j]);
        }

        for (let j = i + 1; j < arr.length; j++) {
            subArr.push(arr[j]);
        }

        if (_isIncreasing(subArr)) {
            return [true, subArr];
        }
    }

    return [false, arr];
}

function _isIncreasingSafeWithDampening(arr) {
    for (let i = 0; i < arr.length; i++) {
        let subArr = [];

        for (let j = 0; j < i; j++) {
            subArr.push(arr[j]);
        }

        for (let j = i + 1; j < arr.length; j++) {
            subArr.push(arr[j]);
        }

        if (_isIncreasingSafe(subArr)) {
            return true;
        }
    }

    return false;
}

function _isDecreasingSafeWithDampening(arr) {
    for (let i = 0; i < arr.length; i++) {
        let subArr = [];

        for (let j = 0; j < i; j++) {
            subArr.push(arr[j]);
        }

        for (let j = i + 1; j < arr.length; j++) {
            subArr.push(arr[j]);
        }

        if (_isDecreasingSafe(subArr)) {
            return true;
        }
    }

    return false;
}

function isSafe(levelsReport) {
    // if the reactor levels are constant
    // it is never safe
    if (_isConstant(levelsReport)) {
        return false;
    }

    // check if report is decreasing
    // if it is check if it is safe
    let decreasingStatus = _isDecreasing(levelsReport);
    // report is decreasing check if it is safe
    if (decreasingStatus && _isDecreasingSafe(levelsReport)) {
        return true;
    }

    // we know we have a decreasing report, check to see if we can make it safe by removing an item
    if (decreasingStatus && _isDecreasingSafeWithDampening(levelsReport)) {
        return true;
    }

    // check to see if we can dampen to make the report decreasing
    let [dampenedDecreasingStatus, dampenedDecreasingLevelsReport] = _isDecreasingWithDampening(levelsReport);
    // we now have a decreasing report, check if it is safe
    if (dampenedDecreasingStatus && _isDecreasingSafe(dampenedDecreasingLevelsReport)) {
        return true;
    }
    
    

    // check if report is increasing
    // if it is check if it is safe
    let increasingStatus = _isIncreasing(levelsReport);
    if (increasingStatus && _isIncreasingSafe(levelsReport)) {
        return true;
    }

    // we know we have an increasing report, check to see if we can make it safe by removing an item
    if (increasingStatus && _isIncreasingSafeWithDampening(levelsReport)) {
        return true;
    }

    // check to see if we can dampen to make the report increasing
    let [dampenedIncreasingStatus, dampenedIncreasingLevelsReport] = _isIncreasingWithDampening(levelsReport);
    // we now have an increasing report, check if it is safe
    if (dampenedIncreasingStatus && _isIncreasingSafe(dampenedIncreasingLevelsReport)) {
        return true;
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