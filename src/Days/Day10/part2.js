import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\r\n")

let cycle = 0;
let X = 1;

let CRT = new Array(6);
for (let i = 0; i < CRT.length; i++) {
    CRT[i] = "";
    for (let j = 0; j < 40; j++) {
        CRT[i] += ".";
    }
}

for (let i = 0; i < lines.length; i++) {
    if (lines[i] == "noop") {
        runCycle();
    } else {
        const line = lines[i].split(" ");
        const V = parseInt(line[1]);
        
        runCycle();
        runCycle();
        X += V;
    }
}

function runCycle() {
    cycle++;
    let line = Math.floor((cycle-1) / 40);
    let pixel = (cycle-1) % 40;

    let spritePos = (line) * 40 + X;
    let diff = cycle - spritePos;
    if (diff == 0 || diff == 1 || diff == 2) {
        CRT[line] = CRT[line].substring(0, pixel) + "#" + CRT[line].substring(pixel + 1);
    }
}

console.log(CRT);
