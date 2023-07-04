import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g);

let pairs = [];
for (let i = 0; i < lines.length; i += 3) {
    pairs.push([JSON.parse(lines[i]), JSON.parse(lines[i+1])])
}

let sum = 0;
for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    sum += comparePair(pair) ? i+1 : 0;
}
console.log(sum);

function comparePair(pair) {
    for (let j = 0; j < Math.max(pair[0].length, pair[1].length); j++) {
        const leftValue = pair[0][j];
        const rightValue = pair[1][j];

        if (leftValue == undefined) {
            return true;
        } else if (rightValue == undefined) {
            return false;
        } else {
            if (typeof(leftValue) == "number" && typeof(rightValue) == "number") {
                if (leftValue < rightValue) {
                    return true;
                } else if (leftValue > rightValue) {
                    return false;
                }
            } else if (typeof(leftValue) == "object" && typeof(rightValue) == "object") {
                let result = comparePair([leftValue, rightValue]);
                if (result != null) {
                    return result;
                }
            } else {
                if (typeof(leftValue) == "number") {
                    let result = comparePair([[leftValue], rightValue]);
                    if (result != null) {
                        return result;
                    }
                } else {
                    let result = comparePair([leftValue, [rightValue]]);
                    if (result != null) {
                        return result;
                    }
                }
            }
        }
    }

    return null;
}
