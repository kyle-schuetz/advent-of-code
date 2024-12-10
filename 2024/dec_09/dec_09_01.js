const fs = require('node:fs');
const path = require('path');


// iterate through each item in the dense representation
// if it is an odd numbered item we have found a file
// if it is an even numbered item we have found empty space

const item = "2333133121414131402"


function buildLongRepresentation(discMap) {
    let longRepresentation = [];
    let fileIdCount = 0;
    for (let i = 0; i < discMap.length; i++) {
        if (i % 2 === 0) {
            for (let j = 0; j < Number(discMap[i]); j++) {
                longRepresentation.push(fileIdCount);
            }
            fileIdCount += 1;
        } else {
            for (let j = 0; j < Number(discMap[i]); j++) {
                longRepresentation.push('.');
            }
        }
    }

    return longRepresentation;
}

function packFiles(longRepresentation) {
    let localRepresentation = [...longRepresentation];
    let leftPtr = 0;
    let rightPtr = localRepresentation.length - 1;

    while (leftPtr <= rightPtr) {
        if (localRepresentation[leftPtr] !== '.') {
            leftPtr += 1;
            continue;
        }

        if (localRepresentation[rightPtr] === '.') {
            rightPtr -= 1;
            continue;
        }

        if (localRepresentation[leftPtr] === '.' && localRepresentation[rightPtr] !== '.') {
            const tempLeft = localRepresentation[leftPtr];
            const tempRight = localRepresentation[rightPtr];
            localRepresentation[leftPtr] = tempRight;
            localRepresentation[rightPtr] = tempLeft;
            leftPtr += 1;
            rightPtr -= 1;
        }   
    }

    return localRepresentation;
}

function calculatePackedFilesCheckSum(packedRepresentation) {
    let sum = 0;

    for (let i = 0; i < packedRepresentation.length; i++) {
        if (packedRepresentation[i] === '.') {
            continue;
        }

        const localVal = Number(packedRepresentation[i]) * i;
        sum += localVal;
    }

    return sum;
}

const filePath = path.join(__dirname, 'input.txt');
const data = fs.readFileSync(filePath, 'utf-8');

const longRepresentation = buildLongRepresentation(data);
const packedRepresentation = packFiles(longRepresentation);
const filesCheckSum = calculatePackedFilesCheckSum(packedRepresentation);
console.log(filesCheckSum);

