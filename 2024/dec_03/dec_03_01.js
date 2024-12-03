const fs = require('node:fs');
const path = require('path');

function buildCommandsList(fileName) {
    const commandsList = [];
    try {
        const data = fs.readFileSync(fileName, 'utf-8');
        const splitData = data.split('\n');
        
        for (const item of splitData) {
            commandsList.push(item);
        }
    } catch (err) {
        console.error(err);
    }

    return commandsList;
}

const filePath = path.join(__dirname, 'input.txt');
const output = buildCommandsList(filePath);
// console.log(output);



let cumulativeTotal = 0;
// iterate each item in the ouput
for (const item of output) {
    const regex = /mul\(\d*\,\d*\)/g;
    const matches = item.match(regex);

    for (const match of matches) {
        const [first, second] = match.split('(')[1].split(')')[0].split(',');
        const sum = Number(first) * Number(second);
        cumulativeTotal += sum;
    }
}

console.log(cumulativeTotal);