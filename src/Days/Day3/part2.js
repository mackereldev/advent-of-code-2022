import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

let data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
let rucksacks = data.toString().split("\r\n");
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let matchSum = 0;

for (let i = 0; i < rucksacks.length; i+=3) {
    const rucksackA = rucksacks[i];
    const rucksackB = rucksacks[i+1];
    const rucksackC = rucksacks[i+2];

    let match = checkMatch(rucksackA, rucksackB, rucksackC);
    let sum = alphabet.indexOf(match.toLowerCase())+1;
    if (match == match.toUpperCase()) {
        sum += 26;
    }
    matchSum += sum;
}

console.log(matchSum);

function checkMatch(a, b, c) {
    for (let j = 0; j < a.length; j++) {
        const itemA = a[j];
        for (let k = 0; k < b.length; k++) {
            const itemB = b[k];
            if (itemA == itemB) {
                for (let l = 0; l < c.length; l++) {
                    const itemC = c[l];
                    if (itemB == itemC) {
                        return itemA;
                    }
                }
            }
        }
    }
}
