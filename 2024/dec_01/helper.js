const fs = require('node:fs');

function buildDistanceLists(fileName) {
    let leftItems = [];
    let rightItems = [];
    try {
        const data = fs.readFileSync(fileName, 'utf-8');
        const splitData = data.split('\n');
        
        for (const item of splitData) {
            const itemSplit = item.split('   ');
            leftItems.push(Number(itemSplit[0]));
            rightItems.push(Number(itemSplit[1]));
        }
    } catch (err) {
        console.error(err);
    }

    return [leftItems, rightItems]
}

module.exports = {
    buildDistanceLists
}