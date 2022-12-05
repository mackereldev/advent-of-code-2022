import { fileURLToPath } from 'url';
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const instructions = data.toString().slice(data.indexOf("move")).split("\r\n");
const initArr = data.toString().slice(0, data.indexOf("move")-3).split("\r\n");

const posLength = initArr[initArr.length-1].match(/\d+/g).length;

let arrangement = new Array(posLength);
for (let i = 0; i < posLength; i++) {
    arrangement[i] = [];
}

for (let i = 0; i < initArr.length-1; i++) {
    for (let j = 0; j < posLength; j++) {
        let pos;
        if (j == 0) {
            pos = 1;
        } else {
            pos = j*4+1;
        }
        let item = initArr[i][pos];
        if (item != " ") {
            arrangement[j][initArr.length-i-2] = item;
        }
    }
}

for (let i = 0; i < instructions.length; i++) {
    const instruction = instructions[i];
    const steps = parseInt(instruction.match(/move (\d+)/g)[0].match(/(\d+)/g)[0]);
    const start = instruction.match(/from (\d+)/g)[0].match(/(\d+)/g)-1;
    const end = instruction.match(/to (\d+)/g)[0].match(/(\d+)/g)-1;

    arrangement[end].push(...arrangement[start].splice(arrangement[start].length-steps, steps));
}

let stackTops = "";

for (let i = 0; i < arrangement.length; i++) {
    const stack = arrangement[i];
    stackTops+= stack[stack.length-1];
}

console.log(stackTops);
