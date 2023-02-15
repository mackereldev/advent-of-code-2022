import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g)

let trees = new Array(lines.length);
for (let i = 0; i < lines.length; i++) {
    trees[i] = new Array(lines[i].length);
    trees[i] = lines[i].split("").map(item => parseInt(item));
}

let highestScenicScore = 0;
for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
        if (i != 0 && i != lines.length-1 && j != 0 && j != trees[i].length-1) {
            highestScenicScore = Math.max(highestScenicScore, getScenicScore(trees, j, i));
        }
    }
}

function getScenicScore(trees, x, y) {
    const tree = trees[y][x];

    // Up
    let upScore = 0;
    for (let i = y-1; i >= 0; i--) {
        const targetTree = trees[i][x];
        upScore++;
        if (targetTree >= tree) {
            break;
        }
    }
    
    // Down
    let downScore = 0;
    for (let i = y+1; i < trees.length; i++) {
        const targetTree = trees[i][x];
        downScore++;
        if (targetTree >= tree) {
            break;
        }
    }
    
    // Left
    let leftScore = 0;
    for (let i = x-1; i >= 0; i--) {
        const targetTree = trees[y][i];
        leftScore++;
        if (targetTree >= tree) {
            break;
        }
    }
    
    // Right
    let rightScore = 0;
    for (let i = x+1; i < trees[y].length; i++) {
        const targetTree = trees[y][i];
        rightScore++;
        if (targetTree >= tree) {
            break;
        }
    }

    return upScore*downScore*leftScore*rightScore;
}

console.log(highestScenicScore);
