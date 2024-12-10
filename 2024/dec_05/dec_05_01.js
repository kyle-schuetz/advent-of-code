const fs = require('node:fs');
const path = require('path');

function buildList(fileName) {
    const orderingList = [];
    let printingSequences = [];
    try {
        const data = fs.readFileSync(fileName, 'utf-8');
        const splitData = data.split('\n');
        const dividingIndex = splitData.indexOf('');
        const orderingItems = splitData.slice(0,dividingIndex);
        const sequences = splitData.slice(dividingIndex + 1,)
        
        for (const item of orderingItems) {
            const order = item.split('|')
            orderingList.push(order);
        }

        for (const sequence of sequences) {
            const individualSequence = sequence.split(',');
            printingSequences.push(individualSequence);
        }
    } catch (err) {
        console.error(err);
    }

    return [orderingList, printingSequences];
}

function buildPrintOrderingMap(orderingArr) {
    const orderingMap = {};

    for (const order of orderingArr) {
        if (order[0] in orderingMap) {
            orderingMap[order[0]].push(order[1]);
        } else {
            orderingMap[order[0]] = [order[1]];
        }
    }

    return orderingMap;
}

function isCorrectPrintingSequence(orderingMap, printSequence) {
    for (let i = 0; i < printSequence.length; i++) {
        // current item under consideration
        const current = printSequence[i];
        const currentOccursBeforeRules = orderingMap[current];

        if (!currentOccursBeforeRules) {
            continue;
        }

        for (let j = i - 1; j >= 0; j--) {
            const previousItem = printSequence[j];
            if (currentOccursBeforeRules.includes(previousItem)) {
                return false;
            }
        }
    }

    return true;
}
const filePath = path.join(__dirname, 'input.txt');
const [ordering, printingSequences] = buildList(filePath);
const orderingMap = buildPrintOrderingMap(ordering);
let middleItemsSum = 0;
// iterate each printing sequence
// if the sequence is in the correct order
// find the middle value in the array
// add it to the runnning total of middle items in correct printing sequence items
for (const sequence of printingSequences) {
    if (isCorrectPrintingSequence(orderingMap, sequence)) {
        const middleIndex = Math.floor(sequence.length / 2);
        middleItemsSum += Number(sequence[middleIndex]);
    }
}
console.log(middleItemsSum);