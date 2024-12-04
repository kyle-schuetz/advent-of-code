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
    const xMasForward = 'MAS';

    const xMasBackward = 'SAM';

    if (string === xMasForward || string === xMasBackward) {
        return true;
    }

    return false;
}
const filePath = path.join(__dirname, 'input.txt');
const output = buildWordList(filePath);
let xMasCount = 0;


// check diagonal
for (let i = 0; i < output.length - 2; i++) {
    for (let j = 0; j < output[0].length - 2; j++) {
        const diagonalOne = output[i][j] + output[i + 1][j + 1] + output[i + 2][j + 2];
        const diagonalTwo = output[i][j + 2] + output[i + 1][j + 1] + output[i + 2][j];
        
        if (checkXmas(diagonalOne) && checkXmas(diagonalTwo)) {
            xMasCount += 1;
        }
    }
}

console.log(xMasCount);