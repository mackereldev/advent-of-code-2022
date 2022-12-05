import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const rounds = data.toString().split("\r\n");

let totalScore = 0;
for (let i = 0; i < rounds.length; i++) {
    const opp = rounds[i][0];
    const res = rounds[i][2];

    let winScore = 0;
    let playScore = 0;

    if (res == "X") {
        winScore = 0;
        if (opp == "A") playScore = 3;
        if (opp == "B") playScore = 1;
        if (opp == "C") playScore = 2;
    }
    if (res == "Y") {
        winScore = 3;
        if (opp == "A") playScore = 1;
        if (opp == "B") playScore = 2;
        if (opp == "C") playScore = 3;
    }
    if (res == "Z") {
        winScore = 6;
        if (opp == "A") playScore = 2;
        if (opp == "B") playScore = 3;
        if (opp == "C") playScore = 1;
    }

    totalScore += playScore+winScore;
}

console.log(totalScore);
