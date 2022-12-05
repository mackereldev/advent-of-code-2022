import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const inventories = data.toString().split("\r\n\r\n").map(inv => inv.split(/\r\n+/g).map(item => parseInt(item)));

let greatestTotals = [0, 0, 0];
for (let i = 0; i < inventories.length; i++) {
    let currentTotal = inventories[i].reduce((a, b) => a + b);
    if (currentTotal > greatestTotals.at(-1)) {
        greatestTotals.push(currentTotal);
        greatestTotals.sort((a, b) => b - a);
        greatestTotals.pop();
    }
}

console.log(greatestTotals.reduce((a, b) => a + b));
