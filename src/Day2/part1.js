import { readFileSync } from "fs";

let data = readFileSync("./src/Day2/input.txt");
let rounds = data.toString().split("\r\n");

let totalScore = 0;
for (let i = 0; i < rounds.length; i++) {
    const opp = rounds[i][0];
    const res = rounds[i][2];

    let winScore = 0;
    let playScore = 0;

    if (res == "X") {
        playScore = 1;
        if (opp == "A") winScore = 3;
        if (opp == "B") winScore = 0;
        if (opp == "C") winScore = 6;
    }
    if (res == "Y") {
        playScore = 2;
        if (opp == "A") winScore = 6;
        if (opp == "B") winScore = 3;
        if (opp == "C") winScore = 0;
    }
    if (res == "Z") {
        playScore = 3;
        if (opp == "A") winScore = 0;
        if (opp == "B") winScore = 6;
        if (opp == "C") winScore = 3;
    }

    totalScore += playScore+winScore;
}

console.log(totalScore);
