import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

let data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
let pairs = data.toString().split("\r\n");

let overlaps = 0;

for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i];
    const ranges = pair.split(",");
    const range1 = ranges[0].split("-");
    const range2 = ranges[1].split("-");

    if (parseInt(range1[0]) <= parseInt(range2[1]) && parseInt(range2[0]) <= parseInt(range1[1])) {
        overlaps++;
        continue;
    }
}

console.log(overlaps);
