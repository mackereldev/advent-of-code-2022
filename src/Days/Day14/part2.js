import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g);

const gridWidth = 1000;
const sandSpawn = [500, 0];
const repetitionLimit = 100000;

const floorOffset = 2;
let floorDepth = floorOffset;
let grid = new Array(floorDepth+1);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(gridWidth).fill(".");
}

for (let i = 0; i < lines.length; i++) {
    const scan = lines[i].split(" -> ").map((coords) => coords.split(",").map((item) => parseInt(item)));
    for (let j = 0; j < scan.length; j++) {
        if (j+1 < scan.length) {
            const pointA = scan[j];
            const pointB = scan[j+1];

            if (Math.max(pointA[1], pointB[1]) > floorDepth - floorOffset) {
                for (let k = 0; k < Math.max(pointA[1], pointB[1]) + floorOffset - floorDepth; k++) {
                    grid.push(new Array(gridWidth).fill("."));
                }
                floorDepth = Math.max(pointA[1], pointB[1]) + floorOffset;
            }

            if (pointA[0] != pointB[0]) {
                let count = Math.abs(pointB[0] - pointA[0]) + (j == scan.length-2 ? 1 : 0);
                for (let k = 0; k < count; k++) {
                    let rock = [pointA[0] + k * Math.sign(pointB[0] - pointA[0]), pointA[1]];
                    grid[rock[1]][rock[0]] = "#";
                }
            } else if (pointA[1] != pointB[1]) {
                let count = Math.abs(pointB[1] - pointA[1]) + (j == scan.length-2 ? 1 : 0);
                for (let k = 0; k < count; k++) {
                    let rock = [pointA[0], pointA[1] + k * Math.sign(pointB[1] - pointA[1])];
                    grid[rock[1]][rock[0]] = "#";
                }
            } else {
                grid[pointA[1]][pointA[0]] = "#";
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
            
            if (isObstructed(sandSpawn[0], sandSpawn[1])) {
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
                grid[sandPosition[1]][sandPosition[0]] = "o";
                break;
            }
        }
    
        restedSandCount++;
    }

    return null;
}

function isObstructed(x, y) {
    const objectObstruction = grid[y][x] != ".";
    return objectObstruction || y >= floorDepth;
}
