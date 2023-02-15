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

let visibleCount = 0;
for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[i].length; j++) {
        if (i != 0 && i != lines.length-1 && j != 0 && j != trees[i].length-1) {
            if (isVisible(trees, j, i)) {
                visibleCount++;
            }
        } else {
            visibleCount++;
        }
    }
}

function isVisible(trees, x, y) {
    const tree = trees[y][x];
    let visibleScore = 4;

    // Vertical
    for (let i = 0; i < trees.length; i++) {
        const targetTree = trees[i][x];
        if (i != y) {
            if (targetTree >= tree) {
                visibleScore--;
                if (i < y) {
                    i = y;
                    continue;
                }
                if (i > y) {
                    break;
                }
            }
        }
    }
    
    // Horizontal
    for (let i = 0; i < trees[y].length; i++) {
        const targetTree = trees[y][i];
        if (i != x) {
            if (targetTree >= tree) {
                visibleScore--;
                if (i < x) {
                    i = x;
                    continue;
                }
                if (i > x) {
                    break;
                }
            }
        }
    }

    return visibleScore != 0;
}

console.log(visibleCount);
