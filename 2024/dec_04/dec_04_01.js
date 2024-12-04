const fs = require('node:fs');
const path = require('path');

function buildWordList(fileName) {
    const wordsList = [];
    try {
        const data = fs.readFileSync(fileName, 'utf-8');
        const splitData = data.split('\n');
        
        for (const item of splitData) {
            const charsArr = item.split('');
            wordsList.push(charsArr);
        }
    } catch (err) {
        console.error(err);
    }

    return wordsList;
}

function checkXmas(string) {
    const xMasForward = 'XMAS';

    const xMasBackward = 'SAMX';

    if (string === xMasForward || string === xMasBackward) {
        return true;
    }

    return false;
}
const filePath = path.join(__dirname, 'input.txt');
const output = buildWordList(filePath);
let xMasCount = 0;


// check vertical
for (let i = 0; i < output.length - 3; i++) {
    for (let j = 0; j < output[0].length; j++) {
        const verticalStr = output[i][j] + output[i + 1][j] + output[i + 2][j] + output[i + 3][j];
        if (checkXmas(verticalStr)) {
            xMasCount += 1;
        }
    }
}

// check horizontal
for (let i = 0; i < output.length; i++) {
    for (let j = 0; j < output[0].length - 3; j++) {
        const horizontalStr = output[i][j] + output[i][j + 1] + output[i][j + 2] + output[i][j + 3];
        if (checkXmas(horizontalStr)) {
            xMasCount += 1;
        }
    }  
}

// // check diagonal
for (let i = 0; i < output.length - 3; i++) {
    for (let j = 0; j < output[0].length - 3; j++) {
        let diagonal = output[i][j] + output[i + 1][j + 1] + output[i + 2][j + 2] + output[i + 3][j + 3];
    if (checkXmas(diagonal)) {
        xMasCount += 1;
    }

    diagonal = output[i][j + 3] + output[i + 1][j + 2] + output[i + 2][j + 1] + output[i + 3][j];
    if (checkXmas(diagonal)) {
        xMasCount += 1;
    }
    }
    
}

console.log(xMasCount);