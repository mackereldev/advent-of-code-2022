import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

let data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
let arr = data.toString().split("\r\n");

let mostCals = 0;
let currCals = 0;
for (let i = 0; i < arr.length; i++) {
    let cals = parseInt(arr[i]);
    if (cals) {
        currCals += cals;
    } else {
        if (currCals > mostCals) {
            mostCals = currCals;
        }
        currCals = 0;
    }
}
console.log(mostCals);
