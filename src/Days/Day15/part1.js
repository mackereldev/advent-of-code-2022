import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g);

let pairs = [];

for (let i = 0; i < lines.length; i++) {
    const pairRaw = lines[i].split(":");
    const sensor = pairRaw[0].match(/\d+/g).map((item) => parseInt(item));
    const beacon = pairRaw[1].match(/\d+/g).map((item) => parseInt(item));
    pairs.push([sensor, beacon]);
}

const rowCheck = 2000000;
let checkedColumns = new Set();

for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const radius = Math.abs(pair[1][0] - pair[0][0]) + Math.abs(pair[1][1] - pair[0][1]);
    const yDist = Math.abs(rowCheck - pair[0][1]);
    const checkMin = pair[0][0] - (radius - yDist);
    const checkMax = pair[0][0] + (radius - yDist);
    
    for (let j = checkMin; j <= checkMax; j++) {
        checkedColumns.add(j);
    }
}

// Prune known beacons
for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    if (pair[1][1] == rowCheck) {
        if (checkedColumns.has(pair[1][0])) {
            checkedColumns.delete(pair[1][0]);
        }
    }
}

console.log(checkedColumns.size);
