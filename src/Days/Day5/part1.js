import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split(/\r?\n|\r|\n/g); // Get all lines from input
const instructions = lines.slice(lines.indexOf("")+1); // Get instructions from input
const suppliesData = lines.slice(0, lines.indexOf("")); // Get supplies from input (length == height)
const stackCount = suppliesData[suppliesData.length-1].match(/\d+/g).length; // Get stack count from suppliesData (width)
suppliesData.pop(); // Remove stack numbers

// Initialise an array of stacks
let supplies = new Array(stackCount);
for (let i = 0; i < stackCount; i++) {
    supplies[i] = [];
}

// Parse suppliesData to two dimensional array
for (let i = 0; i < suppliesData.length; i++) {
    const row = suppliesData[i];
    for (let j = 0; j < stackCount; j++) {
        let pos = j*4+1;
        let item = row[pos];
        if (item != " ") {
            supplies[j][suppliesData.length-i-1] = item;
        }
    }
}

// Iterate over all instructions
for (let i = 0; i < instructions.length; i++) {
    // Extract variables from instructions
    const nums = instructions[i].match(/\d+/g);
    const count = nums[0];
    const current = nums[1]-1;
    const target = nums[2]-1;

    // Move top crate of {current} stack to {target} stack and repeat for {count} times
    for (let j = 0; j < count; j++) {
        supplies[target].push(supplies[current].pop());
    }
}

// List tops of all stacks
let stackTops = "";
for (let i = 0; i < supplies.length; i++) {
    const stack = supplies[i];
    stackTops += stack[stack.length-1];
}

console.log(stackTops);
