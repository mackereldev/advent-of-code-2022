import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\r\n")

let cycle = 0;
let X = 1;
let signalStrength = 0;

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
    if ((cycle+20) % 40 == 0) {
        signalStrength += cycle * X;
    }
}

console.log(signalStrength);
