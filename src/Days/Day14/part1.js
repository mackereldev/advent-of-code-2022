import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g);

const sandSpawn = [500, 0];
const repetitionLimit = 10000;

let obstructions = [];
let lowestRock = 0;
for (let i = 0; i < lines.length; i++) {
    const scan = lines[i].split(" -> ").map((coords) => coords.split(",").map((item) => parseInt(item)));
    for (let j = 0; j < scan.length; j++) {
        if (j+1 < scan.length) {
            const pointA = scan[j];
            const pointB = scan[j+1];

            if (pointA[0] != pointB[0]) {
                let count = Math.abs(pointB[0] - pointA[0]) + (j == scan.length-2 ? 1 : 0);
                for (let k = 0; k < count; k++) {
                    let rock = [pointA[0] + k * Math.sign(pointB[0] - pointA[0]), pointA[1]];
                    obstructions.push(rock);
                }
            } else if (pointA[1] != pointB[1]) {
                let count = Math.abs(pointB[1] - pointA[1]) + (j == scan.length-2 ? 1 : 0);
                for (let k = 0; k < count; k++) {
                    let rock = [pointA[0], pointA[1] + k * Math.sign(pointB[1] - pointA[1])];
                    obstructions.push(rock);
                }
            } else {
                obstructions.push(pointA);
            }

            if (Math.max(pointA[1], pointB[1]) > lowestRock) {
                lowestRock = Math.max(pointA[1], pointB[1]);
            }
        }
    }
}

console.log(getSandCount());

function getSandCount() {
    let restedSandCount = 0;
    while (restedSandCount < repetitionLimit) {
        let sandPosition = [sandSpawn[0], sandSpawn[1]];
        
        let safeBreak = 0;
        while (safeBreak < repetitionLimit) {
            safeBreak++;
            
            if (sandPosition[1] >= lowestRock) {
                return restedSandCount;
            }
            
            if (!isObstructed(sandPosition[0], sandPosition[1]+1)) {
                sandPosition[1] += 1;
            } else if (!isObstructed(sandPosition[0]-1, sandPosition[1]+1)) {
                sandPosition[0] -= 1;
                sandPosition[1] += 1;
            } else if (!isObstructed(sandPosition[0]+1, sandPosition[1]+1)) {
                sandPosition[0] += 1;
                sandPosition[1] += 1;
            } else {
                obstructions.push(sandPosition);
                break;
            }
        }
    
        restedSandCount++;
    }

    return null;
}

function isObstructed(x, y) {
    return obstructions.find((item) => item[0] == x && item[1] == y) != null;
}
