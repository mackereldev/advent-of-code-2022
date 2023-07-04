import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g);

let packets = [];
for (let i = 0; i < lines.length; i += 3) {
    packets.push(JSON.parse(lines[i]), JSON.parse(lines[i+1]));
}
packets.push([[2]], [[6]]);
packets.sort((a, b) => comparePair([a, b]));
let div1 = packets.findIndex((item) => JSON.stringify(item) == JSON.stringify([[2]])) + 1;
let div2 = packets.findIndex((item) => JSON.stringify(item) == JSON.stringify([[6]])) + 1;
console.log(div1 * div2);

function comparePair(pair) {
    for (let j = 0; j < Math.max(pair[0].length, pair[1].length); j++) {
        const leftValue = pair[0][j];
        const rightValue = pair[1][j];

        if (leftValue == undefined) {
            return -1;
        } else if (rightValue == undefined) {
            return 1;
        } else {
            if (typeof(leftValue) == "number" && typeof(rightValue) == "number") {
                if (leftValue < rightValue) {
                    return -1;
                } else if (leftValue > rightValue) {
                    return 1;
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
