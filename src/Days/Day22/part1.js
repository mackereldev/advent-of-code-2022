import { fileURLToPath } from "url";
import { dirname } from "path";
import { readFileSync } from "fs";

const data = readFileSync(`${dirname(fileURLToPath(import.meta.url))}/input.txt`);
const lines = data.toString().split("\r\n");

let map = new Array(lines.length-2);
let mapWidth = Math.max(...(lines.slice(0, lines.length-2).map(el => el.length)));
for (let i = 0; i < map.length; i++) {
    map[i] = new Array(mapWidth).fill(" ");
    for (let j = 0; j < lines[i].length; j++) {
        map[i][j] = lines[i][j];
    }
}

const instructions = lines[lines.length-1].match(/[a-zA-Z]+|[0-9]+/g);

let position = [map[0].findIndex((item) => item != " "), 0];
let direction = [1, 0];
for (let i = 0; i < instructions.length; i++) {
    if (i % 2 == 0) {
        for (let j = 0; j < parseInt(instructions[i]); j++) {
            let futurePos = [position[0] + direction[0], position[1] + direction[1]];
            
            if (futurePos[0] < 0 || futurePos[0] >= mapWidth || futurePos[1] < 0 || futurePos[1] >= map.length || ![".", "#"].includes(map[futurePos[1]][futurePos[0]])) {                
                if (direction[0] == 1 && direction[1] == 0) {
                    futurePos[0] = map[position[1]].findIndex((item) => item != " ");
                } else if (direction[0] == -1 && direction[1] == 0) {
                    futurePos[0] = map[position[1]].findLastIndex((item) => item != " ");
                } else if (direction[0] == 0 && direction[1] == 1) {
                    futurePos[1] = map.map((row) => {return row[position[0]]}).findIndex((item) => item != " ");
                } else if (direction[0] == 0 && direction[1] == -1) {
                    futurePos[1] = map.map((row) => {return row[position[0]]}).findLastIndex((item) => item != " ");
                }
            }
            
            if (map[futurePos[1]][futurePos[0]] == ".") {
                position = futurePos;
            } else if (map[futurePos[1]][futurePos[0]] == "#") {
                break;
            }
        }
    } else {
        if (instructions[i] == "R") {
            direction = [-direction[1], direction[0]];
        } else if (instructions[i] == "L") {
            direction = [direction[1], -direction[0]];
        }
    }
}

let dirMult;
if (direction[0] == 1 && direction[1] == 0) {
    dirMult = 0;
} else if (direction[0] == -1 && direction[1] == 0) {
    dirMult = 2;
} else if (direction[0] == 0 && direction[1] == 1) {
    dirMult = 1;
} else if (direction[0] == 0 && direction[1] == -1) {
    dirMult = 3;
}

console.log(1000 * (position[1] + 1) + 4 * (position[0] + 1) + dirMult);
