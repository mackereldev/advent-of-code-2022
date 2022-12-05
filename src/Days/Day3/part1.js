import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

let data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
let rucksacks = data.toString().split("\r\n");
const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
let matchSum = 0;

for (let i = 0; i < rucksacks.length; i++) {
    const rucksack = rucksacks[i];
    const compartmentA = rucksack.slice(0, rucksack.length/2);
    const compartmentB = rucksack.slice(rucksack.length/2, rucksack.length);

    let match = checkMatch(compartmentA, compartmentB);
    let sum = alphabet.indexOf(match.toLowerCase())+1;
    if (match == match.toUpperCase()) {
        sum += 26;
    }
    matchSum += sum;
}

console.log(matchSum);

function checkMatch(a, b) {
    for (let j = 0; j < a.length; j++) {
        const itemA = a[j];
        for (let k = 0; k < b.length; k++) {
            const itemB = b[k];
            if (itemA == itemB) {
                return itemA;
            }
        }
    }
}
