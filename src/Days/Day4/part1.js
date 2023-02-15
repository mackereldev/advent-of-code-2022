import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const pairs = data.toString().split(/\r?\n|\r|\n/g);

let overlaps = 0;

for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const ranges = pair.split(",");
    const range1 = ranges[0].split("-");
    const range2 = ranges[1].split("-");

    if (parseInt(range1[0]) >= parseInt(range2[0])) {
        if (parseInt(range1[1]) <= parseInt(range2[1])) {
            overlaps++;
            continue;
        }
    }
    if (parseInt(range2[0]) >= parseInt(range1[0])) {
        if (parseInt(range2[1]) <= parseInt(range1[1])) {
            overlaps++;
            continue;
        }
    }
}

console.log(overlaps);
