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
// match first command and add to cumulative total

let active = true;
// iterate each item in the ouput
for (const item of output) {
    const regex = /(?:do\(\)|don't\(\)|mul\(\d*\,\d*\))/g;
    const matches = item.match(regex);
    
    for (const match of matches) {
        if (match === 'do()') {
            active = true;
            continue;
        }
        
        if (match === `don't()`) {
            active = false;
            continue;
        }
        
        if (active) {
            const [first, second] = match.split('(')[1].split(')')[0].split(',');
            const sum = Number(first) * Number(second);
            cumulativeTotal += sum;
        }
    }
}

console.log(cumulativeTotal);


// find the first multiplication command and execute it
// after that we are only executing the multiplication commands that are after the do command