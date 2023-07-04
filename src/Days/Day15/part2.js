import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g);

let pairs = [];

for (let i = 0; i < lines.length; i++) {
    const pairRaw = lines[i].split(":");
    const sensor = pairRaw[0].match(/-?\d+/g).map((item) => parseInt(item));
    const beacon = pairRaw[1].match(/-?\d+/g).map((item) => parseInt(item));
    pairs.push([sensor, beacon]);
}

for (let i = 1; i <= 4000000; i++) {
    const rowCheck = i;

    let ignore = new Set();
    let initialRanges = [];
    for (let j = 0; j < pairs.length; j++) {
        const pair = pairs[j];
        const radius = Math.abs(pair[1][0] - pair[0][0]) + Math.abs(pair[1][1] - pair[0][1]);
        const yDist = Math.abs(pair[0][1] - rowCheck);
        const coverageRadius = radius - yDist;
        const coverMin = pair[0][0] - coverageRadius;
        const coverMax = pair[0][0] + coverageRadius;
        
        if (coverageRadius >= 0) {
            initialRanges.push([coverMin, coverMax]);
        }
    
        if (pair[0][1] == rowCheck) {
            ignore.add(pair[0][0]);
        }
        if (pair[1][1] == rowCheck) {
            ignore.add(pair[1][0]);
        }
    }
    
    initialRanges.sort((a, b) => a[0] - b[0]);
    
    let reducedRanges = [[...initialRanges[0]]];
    for (let j = 1; j < initialRanges.length; j++) {
        const range = initialRanges[j];
        for (let j = 0; j < reducedRanges.length; j++) {
            const reducedRange = reducedRanges[j];
            if ((range[0] >= reducedRange[0] - 1 && range[0] <= reducedRange[1] + 1) || (range[1] >= reducedRange[0] - 1 && range[1] <= reducedRange[1] + 1)) {
                reducedRange[0] = Math.min(range[0], reducedRange[0]);
                reducedRange[1] = Math.max(range[1], reducedRange[1]);
            } else if (j == reducedRanges.length - 1) {
                reducedRanges.push(range);
            }
        }
    }
    
    if (reducedRanges.length > 1) {
        console.log((reducedRanges[0][1] + 1) * 4000000 + i);
        break;
    }
}
