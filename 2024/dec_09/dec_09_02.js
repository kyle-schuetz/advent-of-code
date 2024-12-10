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
    const localRepresentation = longRepresentation;
    let ptr = localRepresentation.length - 1;
    // iterate the long representation backwards
    while (ptr >= 0) {
        // we have found a file
        if (ptr !== '.') {
            let currChar = localRepresentation[ptr];
            let fileEnd = ptr;
            let fileStart = ptr;
            while (localRepresentation[fileStart] === currChar) {
                fileStart -= 1;
            }
            let fileLength = fileEnd - fileStart;
            
            let spaceStart = 0;
            while (spaceStart < fileEnd) { 
                // we have found the start of a block of space
                if (localRepresentation[spaceStart] === '.') {
                    let spaceEnd = spaceStart;
                    while (localRepresentation[spaceEnd] === '.') {
                        spaceEnd += 1;
                    }
                    let spaceLength = spaceEnd - spaceStart;

                    // if the size of the file is less than or equal to the available space
                    // move the file into the beginning of the empty space
                    if (fileLength <= spaceLength) {
                        // iterate through the file to swap the file and the space
                        for (let i = 0; i < fileLength; i++) {
                            const temp = localRepresentation[spaceStart];
                            localRepresentation[spaceStart] = localRepresentation[fileEnd];
                            localRepresentation[fileEnd] = temp;
                            spaceStart += 1;
                            fileEnd -= 1;
                        }
                        // start a new window at the fileStart position
                        ptr = fileStart;
                        // break the current loop
                        break;
                    } else {
                        spaceStart = spaceEnd + 1;
                    }
                } else {
                    // move the start of the space window forward
                    spaceStart += 1;
                }
            }

            // we didn't find enough available space for the file
            // start a new window
            if (spaceStart === fileEnd) {
                ptr = fileStart;
            }
        } else {
            ptr -= 1;
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

